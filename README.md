NOTE:

->LIVE-URl: http://earthquake-api-env.eba-mfmdpvr8.eu-north-1.elasticbeanstalk.com/
🚀 Server running on port 3000
📚 Swagger docs at http://localhost:3000/api-docs
-->The Postman collection: https://grey-shadow-25882.postman.co/workspace/My-Workspace~00fd07f9-09e2-4387-8bfe-9d287902266e/collection/23976594-cbb6af9a-bfee-4c70-bbd7-bce4cbdb85f4?action=share&creator=23976594
✅ Redis Connected
✅ MongoDB Connected: localhost

# 🌍 Earthquake API

A RESTful API for earthquake data with JWT authentication, Redis caching, pagination, and Swagger documentation.

## 🚀 Tech Stack

- **Runtime:** Node.js + Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + Passport.js
- **Cache:** Redis (ioredis)
- **Docs:** Swagger UI
- **Hosting:** Railway / Render

---

## ⚙️ Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd my-api
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Start Services

```bash
# Make sure MongoDB and Redis are running
mongod
redis-server

# Start the app
npm run dev
```

### 4. Seed Data from USGS

```bash
# 1. Register an admin user
POST /api/auth/register
{ "username": "admin", "email": "admin@test.com", "password": "secret123" }

# 2. Manually set role to "admin" in MongoDB, then login:
POST /api/auth/login

# 3. Use the token to seed:
POST /api/earthquakes/seed   (Bearer token required)
```

---

## 📚 API Endpoints

### Auth

| Method | Endpoint             | Access    | Description       |
| ------ | -------------------- | --------- | ----------------- |
| POST   | `/api/auth/register` | Public    | Register user     |
| POST   | `/api/auth/login`    | Public    | Login + get token |
| GET    | `/api/auth/me`       | Protected | Get current user  |

### Earthquakes

| Method | Endpoint                | Access | Description                 |
| ------ | ----------------------- | ------ | --------------------------- |
| GET    | `/api/earthquakes`      | Public | Get all (paginated, cached) |
| GET    | `/api/earthquakes/:id`  | Public | Get one                     |
| POST   | `/api/earthquakes`      | Admin  | Create                      |
| PUT    | `/api/earthquakes/:id`  | Admin  | Update                      |
| DELETE | `/api/earthquakes/:id`  | Admin  | Delete                      |
| POST   | `/api/earthquakes/seed` | Admin  | Seed from USGS              |

### Query Parameters (GET /api/earthquakes)

| Param     | Type    | Description              |
| --------- | ------- | ------------------------ |
| `page`    | number  | Page number (default: 1) |
| `limit`   | number  | Items per page (max: 20) |
| `minMag`  | number  | Minimum magnitude        |
| `maxMag`  | number  | Maximum magnitude        |
| `place`   | string  | Filter by place name     |
| `tsunami` | boolean | Filter tsunami events    |

---

## 📖 Documentation

- **Swagger UI:** `http://localhost:3000/api-docs`
- **Postman Collection:** [Add your Postman link here]
- **Live API:** [Add your cloud URL here]

---

## ☁️ Deployment (Railway)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Add environment variables in Railway dashboard
# Add MongoDB and Redis plugins in Railway
```

---

## 📦 Data Source

Data is seeded from the [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/fdsnws/event/1/) — 1000+ real earthquake records.
