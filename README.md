# Aniket Dey — Portfolio (MERN, JavaScript only)

Premium full-stack developer portfolio for **Aniket Dey**.
Stack: **React 18 (JS) + Vite + Tailwind + Framer Motion + GSAP + Recharts + Axios + React Router DOM** on the frontend, **Node.js + Express + MongoDB (Mongoose) + JWT + Nodemailer + Multer** on the backend.

> This project is generated outside the Lovable sandbox. Run it locally — it does **not** run in the Lovable preview window.

---

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env     # then fill in MONGO_URI and email creds
npm run dev              # nodemon on http://localhost:5000
```

`.env` keys you must fill:

```
PORT=5000
MONGO_URI=             # paste your MongoDB Atlas connection string here
JWT_SECRET=changeme_super_secret
ADMIN_EMAIL=aniketdey2004@gmail.com
ADMIN_PASSWORD=Admin@12345
CONTACT_TO=aniketdey2004@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=              # your gmail
SMTP_PASS=              # gmail app password
CLIENT_ORIGIN=http://localhost:5173
LEETCODE_USERNAME=Aniketdey004
GITHUB_USERNAME=Aniketdey2004
```

On first boot the server:
- creates the admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD`
- seeds the `projects` collection with **DevLoop**, **Chatly**, **WanderLust**
- seeds the `experiences` collection with the **NRXEN IT Solutions** internship
- serves the bundled resume PDF at `GET /api/resume/download`

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev              # vite on http://localhost:5173
```

`VITE_API_BASE` defaults to `http://localhost:5000/api`. Override with `frontend/.env` if needed.

## 3. Admin

Visit `http://localhost:5173/login` and use the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env`.
The dashboard has four modules: Projects, Experiences, Blogs, Resume.

## 4. Public pages

`/`, `/activity`, `/experience`, `/skills`, `/projects`, `/projects/:id`, `/blogs`, `/contact`.

## 5. LeetCode / GitHub

The frontend never calls third-party APIs. The backend proxies:

- `GET /api/leetcode/profile`
- `GET /api/leetcode/calendar/:year`
- `GET /api/leetcode/contest-history`
- `GET /api/github/profile`
- `GET /api/github/contributions/:year`

GitHub contribution data is fetched via the public `github-contributions-api.jogruber.de` proxy (no auth required) so you don't need a GitHub token.
