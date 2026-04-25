// ── LocalStorage DB (reemplaza el backend Express) ────────────────
const LS_KEY = 'mision-superpoder-db';

const DB_DEFAULT = {
  agent: { id: 1, name: 'Agente', total_xp: 0 },
  tasks: [],
  daily_log: [],
  xp_history: [],
  _next_task_id: 1,
  _next_log_id: 1,
  _next_xp_id: 1,
};

function lsLoad() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* corrupt */ }
  return JSON.parse(JSON.stringify(DB_DEFAULT));
}

function lsSave(db) {
  localStorage.setItem(LS_KEY, JSON.stringify(db));
}

function nowStr() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

// API sincrónica que imita el servidor Express
const DB = {
  getAgent() { return lsLoad().agent; },

  updateAgent(fields) {
    const db = lsLoad();
    Object.assign(db.agent, fields);
    lsSave(db);
    return db.agent;
  },

  getTasks({ status, element } = {}) {
    let tasks = lsLoad().tasks;
    if (status) tasks = tasks.filter(t => t.status === status);
    if (element) tasks = tasks.filter(t => t.element === element);
    return tasks.slice().reverse();
  },

  createTask({ title, description = '', element = 'fuego', xp_value = 10, due_date = null }) {
    const db = lsLoad();
    const task = {
      id: db._next_task_id++, title, description, element,
      xp_value, status: 'pending', due_date, completed_at: null, created_at: nowStr(),
    };
    db.tasks.push(task);
    lsSave(db);
    return task;
  },

  updateTask(id, fields) {
    const db = lsLoad();
    const idx = db.tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    const task = db.tasks[idx];
    const wasCompleted = task.status === 'completed';
    const nowCompleted = fields.status === 'completed';
    Object.assign(task, fields);
    if (!wasCompleted && nowCompleted) {
      task.completed_at = nowStr();
      db.agent.total_xp += task.xp_value;
      db.xp_history.push({ id: db._next_xp_id++, source: `Misión: ${task.title}`, amount: task.xp_value, created_at: nowStr() });
    }
    if (wasCompleted && fields.status && fields.status !== 'completed') {
      task.completed_at = null;
      db.agent.total_xp = Math.max(0, db.agent.total_xp - task.xp_value);
    }
    lsSave(db);
    return task;
  },

  deleteTask(id) {
    const db = lsLoad();
    const idx = db.tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    const task = db.tasks[idx];
    if (task.status === 'completed') db.agent.total_xp = Math.max(0, db.agent.total_xp - task.xp_value);
    db.tasks.splice(idx, 1);
    lsSave(db);
    return true;
  },

  getLog(date) {
    const db = lsLoad();
    if (date) return db.daily_log.find(l => l.log_date === date) || null;
    return db.daily_log.slice().sort((a, b) => b.log_date.localeCompare(a.log_date)).slice(0, 90);
  },

  upsertLog({ log_date, polyvagal_state = 'buho', active_element = 'fuego', notes = '' }) {
    const db = lsLoad();
    let log = db.daily_log.find(l => l.log_date === log_date);
    if (log) {
      Object.assign(log, { polyvagal_state, active_element, notes });
    } else {
      log = { id: db._next_log_id++, log_date, polyvagal_state, active_element, notes, created_at: nowStr() };
      db.daily_log.push(log);
    }
    lsSave(db);
    return log;
  },

  getStats() {
    const db = lsLoad();
    const tasks = db.tasks;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const elements = ['fuego', 'agua', 'tierra', 'aire'];
    const byElement = elements.map(el => ({
      element: el,
      total: tasks.filter(t => t.element === el).length,
      done: tasks.filter(t => t.element === el && t.status === 'completed').length,
    }));
    return { total: tasks.length, completed, pending: tasks.length - completed, byElement, agent: db.agent };
  },
};

// ── State ──────────────────────────────────────────────────────────
const state = {
  agent: { name: 'Agente', total_xp: 0 },
  tasks: [],
  dailyLog: null,
  activeFilter: 'all',
  activeElement: 'fuego',
  activeAnimal: 'buho',
  calYear: new Date().getFullYear(),
  calMonth: new Date().getMonth(),
  logCache: {},
};

const today = () => new Date().toISOString().slice(0, 10);

// ── Toast ──────────────────────────────────────────────────────────
function toast(msg, type = '') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ── XP / Level ─────────────────────────────────────────────────────
const LEVELS = [
  [0,    'Aprendiz'],
  [50,   'Explorador'],
  [150,  'Guerrero'],
  [300,  'Héroe'],
  [500,  'Campeón'],
  [800,  'Leyenda'],
  [1200, 'Superpoder'],
];

function getLevel(xp) {
  let level = 1;
  let name = LEVELS[0][1];
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i][0]) { level = i + 1; name = LEVELS[i][1]; }
    else break;
  }
  const next = LEVELS[level] ? LEVELS[level][0] : LEVELS[LEVELS.length - 1][0] + 500;
  const prev = LEVELS[level - 1][0];
  const pct = Math.min(100, Math.round(((xp - prev) / (next - prev)) * 100));
  return { level, name, pct };
}

function updateXpUI(xp) {
  const { level, name, pct } = getLevel(xp);
  document.getElementById('nav-xp-label').textContent = `⬡ ${xp} XP — ${name}`;
  document.getElementById('nav-xp-bar').style.width = pct + '%';
  document.getElementById('stat-xp').textContent = xp;
  document.getElementById('stat-level').textContent = level;
}

// ── Load agent ────────────────────────────────────────────────────
function loadAgent() {
  const agent = DB.getAgent();
  state.agent = agent;
  document.getElementById('agent-input').value = agent.name !== 'Agente' ? agent.name : '';
  updateXpUI(agent.total_xp);
}

// ── Save agent ────────────────────────────────────────────────────
document.getElementById('save-agent').addEventListener('click', () => {
  const name = document.getElementById('agent-input').value.trim();
  if (!name) { toast('Escribe tu nombre de agente', 'error'); return; }
  const agent = DB.updateAgent({ name });
  state.agent = agent;
  toast(`Agente ${name} registrado`, 'success');
});

// ── Element selector ──────────────────────────────────────────────
document.getElementById('element-selector').addEventListener('click', (e) => {
  const chip = e.target.closest('.el-chip');
  if (!chip) return;
  const el = chip.dataset.el;
  state.activeElement = el;
  document.querySelectorAll('.el-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  saveDailyLog({ active_element: el });
});

// ── Polyvagal cards ───────────────────────────────────────────────
document.querySelectorAll('.animal-card').forEach(card => {
  card.addEventListener('click', () => {
    const animal = card.dataset.animal;
    state.activeAnimal = animal;
    document.querySelectorAll('.animal-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    saveDailyLog({ polyvagal_state: animal });
    toast(`Estado: ${animal.charAt(0).toUpperCase() + animal.slice(1)} registrado`);
  });
});

// ── Daily notes ───────────────────────────────────────────────────
document.getElementById('today-date-label').textContent = today();

document.getElementById('save-daily').addEventListener('click', () => {
  const notes = document.getElementById('daily-notes-input').value;
  saveDailyLog({ notes });
  toast('Estado del día guardado', 'success');
});

function saveDailyLog(patch) {
  const payload = {
    log_date: today(),
    polyvagal_state: state.activeAnimal,
    active_element: state.activeElement,
    notes: document.getElementById('daily-notes-input').value,
    ...patch,
  };
  const log = DB.upsertLog(payload);
  state.dailyLog = log;
  state.logCache[today()] = log;
}

function loadDailyLog() {
  const log = DB.getLog(today());
  if (log) {
    state.dailyLog = log;
    state.activeAnimal = log.polyvagal_state;
    state.activeElement = log.active_element;
    document.getElementById('daily-notes-input').value = log.notes || '';
    document.querySelectorAll('.animal-card').forEach(c => {
      c.classList.toggle('active', c.dataset.animal === log.polyvagal_state);
    });
    document.querySelectorAll('.el-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.el === log.active_element);
    });
  }
}

// ── Energy selector ───────────────────────────────────────────────
let activeEnergy = 'alta';
document.getElementById('energy-selector').addEventListener('click', (e) => {
  const btn = e.target.closest('.energy-btn');
  if (!btn) return;
  activeEnergy = btn.dataset.energy;
  document.querySelectorAll('.energy-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
});

// ── Due date min = now ────────────────────────────────────────────
function setDueDateMin() {
  const input = document.getElementById('task-due');
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  input.min = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}
setDueDateMin();
document.getElementById('task-due').addEventListener('focus', setDueDateMin);

// ── Tasks ─────────────────────────────────────────────────────────
const XP_SLIDER = document.getElementById('task-xp');
const XP_LABEL  = document.getElementById('task-xp-label');
XP_SLIDER.addEventListener('input', () => { XP_LABEL.textContent = XP_SLIDER.value + ' XP'; });

document.getElementById('add-task-btn').addEventListener('click', () => {
  const title = document.getElementById('task-title').value.trim();
  if (!title) { toast('El título es obligatorio', 'error'); return; }

  const dueRaw = document.getElementById('task-due').value;
  if (dueRaw && new Date(dueRaw) <= new Date()) {
    toast('La fecha límite debe ser posterior al momento actual', 'error');
    return;
  }

  const task = DB.createTask({
    title,
    description: document.getElementById('task-desc').value,
    element: activeEnergy,
    xp_value: parseInt(XP_SLIDER.value),
    due_date: dueRaw || null,
  });
  state.tasks.unshift(task);
  renderTasks();
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value  = '';
  document.getElementById('task-due').value   = '';
  XP_SLIDER.value = 10;
  XP_LABEL.textContent = '10 XP';
  toast('Misión creada', 'success');
  loadStats();
});

function loadTasks() {
  state.tasks = DB.getTasks();
  renderTasks();
}

const ENERGY_LABELS = { alta: '🚀 ALTA', media: '〜 MEDIA', baja: '🌙 BAJA' };

function getFilteredTasks() {
  const f = state.activeFilter;
  if (f === 'all') return state.tasks;
  if (['pending', 'completed'].includes(f)) return state.tasks.filter(t => t.status === f);
  return state.tasks.filter(t => t.element === f);
}

function formatDueDate(due) {
  if (!due) return '';
  const d = new Date(due);
  if (isNaN(d)) return due;
  const pad = n => String(n).padStart(2, '0');
  return `${d.getDate()}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function isDueOverdue(due) {
  return due ? new Date(due) < new Date() : false;
}

function renderTasks() {
  const list  = document.getElementById('tasks-list');
  const tasks = getFilteredTasks();
  if (!tasks.length) {
    list.innerHTML = '<div class="tasks-empty">No hay misiones en esta categoría</div>';
    return;
  }
  list.innerHTML = tasks.map(t => {
    const overdue = t.status !== 'completed' && isDueOverdue(t.due_date);
    return `
    <div class="task-item ${t.status}" data-id="${t.id}">
      <div class="task-check ${t.status === 'completed' ? 'done' : ''}" data-toggle="${t.id}"></div>
      <div class="task-body">
        <div class="task-title">${escHtml(t.title)}</div>
        <div class="task-meta">
          <span class="task-el ${t.element}">${ENERGY_LABELS[t.element] || t.element.toUpperCase()}</span>
          <span class="task-xp">⬡ ${t.xp_value} XP</span>
          ${t.due_date ? `<span class="task-date" style="${overdue ? 'color:#ff5555;' : ''}">📅 ${formatDueDate(t.due_date)}${overdue ? ' ⚠' : ''}</span>` : ''}
          ${t.completed_at ? `<span class="task-date">✓ ${t.completed_at.slice(0,10)}</span>` : ''}
        </div>
        ${t.description ? `<div style="font-size:.75rem;color:var(--text-dim);margin-top:.3rem;">${escHtml(t.description)}</div>` : ''}
      </div>
      <div class="task-actions">
        <button class="icon-btn" data-delete="${t.id}" title="Eliminar">✕</button>
      </div>
    </div>`;
  }).join('');
}

document.getElementById('tasks-list').addEventListener('click', (e) => {
  const toggleId = e.target.dataset.toggle;
  const deleteId = e.target.dataset.delete;

  if (toggleId) {
    const task = state.tasks.find(t => t.id == toggleId);
    if (!task) return;
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const updated = DB.updateTask(parseInt(toggleId), { status: newStatus, xp_value: task.xp_value });
    if (!updated) return;
    const idx = state.tasks.findIndex(t => t.id == toggleId);
    state.tasks[idx] = updated;
    renderTasks();
    if (newStatus === 'completed') toast(`+${task.xp_value} XP — ¡Misión completada!`, 'xp');
    loadStats();
  }

  if (deleteId) {
    if (!confirm('¿Eliminar esta misión?')) return;
    DB.deleteTask(parseInt(deleteId));
    state.tasks = state.tasks.filter(t => t.id != deleteId);
    renderTasks();
    loadStats();
  }
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    state.activeFilter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks();
  });
});

// ── Stats ─────────────────────────────────────────────────────────
function loadStats() {
  const s = DB.getStats();
  document.getElementById('stat-total').textContent = s.total;
  document.getElementById('stat-done').textContent  = s.completed;
  updateXpUI(s.agent.total_xp);
  state.agent.total_xp = s.agent.total_xp;
}

// ── Calendar ──────────────────────────────────────────────────────
const DAY_NAMES   = ['LUN','MAR','MIÉ','JUE','VIE','SÁB','DOM'];
const MONTH_NAMES = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];

function renderCalendar() {
  const { calYear: y, calMonth: m } = state;
  document.getElementById('cal-month-label').textContent = `${MONTH_NAMES[m]} ${y}`;

  const grid = document.getElementById('cal-grid');
  grid.innerHTML = DAY_NAMES.map(d => `<div class="cal-day-name">${d}</div>`).join('');

  const firstDay   = new Date(y, m, 1);
  let startDow     = firstDay.getDay();
  startDow         = startDow === 0 ? 6 : startDow - 1;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const daysInPrev  = new Date(y, m, 0).getDate();
  const todayStr    = today();

  const logs = DB.getLog();
  const logsMap = {};
  logs.forEach(l => { logsMap[l.log_date] = l; });

  const tasksMap = {};
  state.tasks.filter(t => t.status === 'completed' && t.completed_at).forEach(t => {
    const d = t.completed_at.slice(0, 10);
    if (!tasksMap[d]) tasksMap[d] = [];
    tasksMap[d].push(t);
  });

  let cells = '';
  for (let i = 0; i < startDow; i++) {
    const d = daysInPrev - startDow + i + 1;
    cells += `<div class="cal-day other-month"><div class="cal-day-num">${d}</div></div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isToday = dateStr === todayStr;
    const log      = logsMap[dateStr];
    const dayTasks = tasksMap[dateStr] || [];

    let dots = '';
    dayTasks.slice(0, 5).forEach(t => {
      dots += `<div class="cal-dot ${t.element}" title="${t.title}"></div>`;
    });
    if (log) {
      dots += `<div class="cal-state-dot ${log.polyvagal_state}" title="Estado: ${log.polyvagal_state}"></div>`;
    }

    cells += `<div class="cal-day ${isToday ? 'today' : ''}">
      <div class="cal-day-num">${d}</div>
      <div class="cal-day-dots">${dots}</div>
    </div>`;
  }
  const total     = startDow + daysInMonth;
  const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let i = 1; i <= remaining; i++) {
    cells += `<div class="cal-day other-month"><div class="cal-day-num">${i}</div></div>`;
  }

  grid.innerHTML += cells;
}

document.getElementById('cal-prev').addEventListener('click', () => {
  state.calMonth--;
  if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
  renderCalendar();
});
document.getElementById('cal-next').addEventListener('click', () => {
  state.calMonth++;
  if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
  renderCalendar();
});

// ── Navigation ────────────────────────────────────────────────────
document.querySelectorAll('.nav-links button').forEach(btn => {
  btn.addEventListener('click', () => {
    const sec = btn.dataset.section;
    document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(sec).classList.add('active');
    if (sec === 'calendario') renderCalendar();
  });
});

// ── Utils ─────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Init ──────────────────────────────────────────────────────────
function init() {
  loadAgent();
  loadTasks();
  loadDailyLog();
  loadStats();
}

init();
