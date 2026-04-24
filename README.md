# ONIROS · El Alucinómetro

> Less hallucination, more truth.

Ranking de fiabilidad de modelos de lenguaje. Datos oficiales (Vectara HHEM) vs. percepción de la comunidad (Reddit + reportes propios).

**Un proyecto de Hefaia.**

---

## 🚀 Arrancar en local

Ya tienes Node instalado. Desde la terminal en esta carpeta:

```bash
npm install
npm run dev
```

Abre http://localhost:5173 en el navegador.
Para parar: Ctrl+C en la terminal.

---

## 📤 Subir a GitHub

### 1. Crea un repo vacío
Ve a https://github.com/new
- Nombre: `oniros`
- NO marques nada (ni README, ni .gitignore, ni license)
- Click "Create repository"

### 2. En la terminal (dentro de esta carpeta):
```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/raul-filero/oniros.git
git push -u origin main
```

Si te pide login, usa un Personal Access Token (NO la contraseña):
github.com → Settings → Developer settings → Personal access tokens → Generate new token (classic) → marca "repo" → Generate.

---

## ☁️ Cloudflare Pages

1. Cloudflare → Workers y Pages → Create → Pages → Connect to Git
2. Repo: `oniros`
3. Build: preset Vite, build command `npm run build`, output `dist`
4. Deploy

En 2 min online en `oniros.pages.dev`. Luego Custom domains → tu dominio.

---

## 🔜 Siguientes pasos

1. Supabase para BD → reportes reales
2. Script Python que lee Vectara HHEM (cron via GitHub Actions)
3. Integrar con Muletia y MeMuletia

Stack: React 18 + Vite + lucide-react.
