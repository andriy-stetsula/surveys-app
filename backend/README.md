# Surveys App

Backend (Node.js, Express, PostgreSQL) + mobile app (Expo).

## Backend

Потрібно: Node.js 18+ і PostgreSQL (наприклад, Neon).

```bash
cd backend
npm install
cp .env.example .env
```

Відкрий `backend/.env` і впиши свій `DATABASE_URL`:

```
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
```

Далі:

```bash
npm run migrate   # створює таблиці
npm run seed      # додає тестові опитування
npm run dev       # сервер на http://localhost:3000
```

### Endpoints

- `GET /surveys`: активні опитування з питаннями
- `POST /surveys/:id/responses`: відправити відповіді (заголовок `x-user-id`)
- `GET /surveys/:id/results`: агреговані результати

## Mobile

(буде додано)
