// scripts/update-vectara.mjs
// Descarga el README de Vectara HHEM, parsea la tabla markdown
// y genera src/data/vectara.json con las tasas de alucinación.
//
// Uso: npm run update-vectara

import fs from 'node:fs/promises';
import path from 'node:path';

const URL =
  'https://raw.githubusercontent.com/vectara/hallucination-leaderboard/main/README.md';

// Modelos que queremos mostrar en Oniros. Mapeo: clave de Vectara → metadata.
// Para cambiar el ranking, edita solo este objeto.
const TRACKED = {
  'anthropic/claude-opus-4-6': {
    id: 'claude',
    name: 'CLAUDE OPUS 4.6',
    company: 'Anthropic',
  },
  'openai/gpt-5.2-high-2025-12-11': {
    id: 'gpt5',
    name: 'GPT-5.2',
    company: 'OpenAI',
  },
  'google/gemini-3-pro-preview': {
    id: 'gemini',
    name: 'GEMINI 3 PRO',
    company: 'Google',
  },
  'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8': {
    id: 'llama',
    name: 'LLAMA 4 MAVERICK',
    company: 'Meta',
  },
  'xai-org/grok-4-fast-reasoning': {
    id: 'grok',
    name: 'GROK-4 FAST',
    company: 'xAI',
  },
  'deepseek-ai/DeepSeek-V3.2': {
    id: 'deepseek',
    name: 'DEEPSEEK V3.2',
    company: 'DeepSeek',
  },
  'mistralai/mistral-large-2411': {
    id: 'mistral',
    name: 'MISTRAL LARGE',
    company: 'Mistral AI',
  },
};

async function main() {
  console.log('→ Descargando leaderboard de Vectara...');
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`HTTP ${res.status} al leer Vectara`);
  const md = await res.text();

  // Buscar la cabecera de la tabla y parsear las filas
  const lines = md.split('\n');
  const headerIdx = lines.findIndex((l) => /^\|\s*Model\s*\|/i.test(l));
  if (headerIdx === -1) throw new Error('No encuentro la tabla en el README');

  const rows = [];
  for (let i = headerIdx + 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('|')) break;
    const cells = line
      .split('|')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    if (cells.length < 2) continue;
    const model = cells[0];
    const rateStr = cells[1];
    const pct = parseFloat(rateStr.replace('%', '').trim());
    if (!isNaN(pct)) rows.push({ model, officialRate: pct });
  }
  console.log(`  Filas parseadas: ${rows.length}`);

  // Mapear modelos tracked
  const results = [];
  for (const [vectaraKey, meta] of Object.entries(TRACKED)) {
    const row = rows.find((r) => r.model === vectaraKey);
    if (row) {
      results.push({ ...meta, officialRate: row.officialRate });
      console.log(`  ✓ ${meta.name.padEnd(22)} → ${row.officialRate}%`);
    } else {
      console.warn(`  ✗ No encontrado: ${vectaraKey}`);
      results.push({ ...meta, officialRate: null });
    }
  }

  const out = {
    source: 'Vectara HHEM Hallucination Leaderboard',
    sourceUrl: 'https://github.com/vectara/hallucination-leaderboard',
    updatedAt: new Date().toISOString(),
    models: results,
  };

  const outPath = path.resolve('src', 'data', 'vectara.json');
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(out, null, 2) + '\n');
  console.log(`\n✅ Escrito: ${outPath}`);
}

main().catch((e) => {
  console.error('❌', e.message);
  process.exit(1);
});
