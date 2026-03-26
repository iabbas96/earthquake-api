NOTE:
Live Application: http://earthquake-api-env1.eba-mfmdpvr8.eu-north-1.elasticbeanstalk.com/api/earthquakes

postman documentation: https://grey-shadow-25882.postman.co/workspace/My-Workspace~00fd07f9-09e2-4387-8bfe-9d287902266e/collection/23976594-30d16e84-27aa-4197-9b43-b03a33a3b792?action=share&source=copy-link&creator=23976594

## Setup and Installation

# 1. Environment Variables

Create a `.env` file in the root directory and add the following:

````env
PORT=3000
MONGO_URI=mongodb://localhost:27017/earthquakedb
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d
REDIS_URL=redis://localhost:6379
NODE_ENV=development
API Documentation: elasticbeanstalk.com




"Note: The API is hosted on AWS Elastic Beanstalk using the default environment URL. For the purpose of this project and to remain within the AWS Free Tier, it is served over HTTP. In a production environment, a custom domain with an SSL/TLS certificate would be used to secure authentication tokens."


->LIVE-URl: http://earthquake-api-env1.eba-mfmdpvr8.eu-north-1.elasticbeanstalk.com/
->Server running on port 3000
->Swagger docs at http://localhost:3000/api-docs
->The Postman collection: https://grey-shadow-25882.postman.co/workspace/My-Workspace~00fd07f9-09e2-4387-8bfe-9d287902266e/collection/23976594-cbb6af9a-bfee-4c70-bbd7-bce4cbdb85f4?action=share&creator=23976594
->Redis Connected
-> MongoDB Connected: localhost

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
````

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

Live Application: http://earthquake-api-env1.eba-mfmdpvr8.eu-north-1.elasticbeanstalk.com/
GET 20 EARTHQUAKES: http://earthquake-api-env1.eba-mfmdpvr8.eu-north-1.elasticbeanstalk.com/api/earthquakes

API Documentation: elasticbeanstalk.com

# 🌍 Earthquake API

A production-ready RESTful API for earthquake data built with Node.js, Express, MongoDB, and Redis. Deployed on AWS Elastic Beanstalk.

## 🔗 Live Links

- **Live API:** http://earthquake-api-env1.eba-mfmdpvr8.eu-north-1.elasticbeanstalk.com
- **Swagger Docs:** http://earthquake-api-env1.eba-mfmdpvr8.eu-north-1.elasticbeanstalk.com/api-docs
- **Postman Collection:** [Add your Postman link here]

---

## 🚀 Tech Stack

| Technology                | Purpose           |
| ------------------------- | ----------------- |
| **Node.js**               | Runtime           |
| **Express.js**            | Web framework     |
| **MongoDB**               | Database          |
| **Mongoose**              | ODM               |
| **Redis (Upstash)**       | Caching           |
| **JWT**                   | Authentication    |
| **Passport.js**           | OAuth strategy    |
| **Swagger UI**            | API Documentation |
| **AWS Elastic Beanstalk** | Cloud Hosting     |

---

## ✅ Features

- ✅ User authentication (Register/Login)
- ✅ JWT Token (OAuth)
- ✅ Full CRUD on earthquake data
- ✅ Public GET endpoint (no auth required)
- ✅ Pagination (max 20 items per page)
- ✅ Redis caching
- ✅ Swagger documentation
- ✅ Postman documentation
- ✅ 1000+ earthquake records from USGS
- ✅ Cloud hosted on AWS

---

## 📚 API Endpoints

### 🔐 Authentication

| Method | Endpoint             | Access    | Description           |
| ------ | -------------------- | --------- | --------------------- |
| POST   | `/api/auth/register` | Public    | Register new user     |
| POST   | `/api/auth/login`    | Public    | Login + get JWT token |
| GET    | `/api/auth/me`       | Protected | Get current user      |

### 🌍 Earthquakes

| Method | Endpoint                | Access     | Description                  |
| ------ | ----------------------- | ---------- | ---------------------------- |
| GET    | `/api/earthquakes`      | **Public** | Get all (paginated + cached) |
| GET    | `/api/earthquakes/:id`  | **Public** | Get single earthquake        |
| POST   | `/api/earthquakes`      | Admin      | Create earthquake            |
| PUT    | `/api/earthquakes/:id`  | Admin      | Update earthquake            |
| DELETE | `/api/earthquakes/:id`  | Admin      | Delete earthquake            |
| POST   | `/api/earthquakes/seed` | Admin      | Seed 1000+ from USGS         |

---

## 📄 Query Parameters (GET /api/earthquakes)

| Parameter | Type    | Description              | Example             |
| --------- | ------- | ------------------------ | ------------------- |
| `page`    | number  | Page number (default: 1) | `?page=2`           |
| `limit`   | number  | Items per page (max: 20) | `?limit=10`         |
| `minMag`  | number  | Minimum magnitude        | `?minMag=5`         |
| `maxMag`  | number  | Maximum magnitude        | `?maxMag=7`         |
| `place`   | string  | Filter by place name     | `?place=California` |
| `tsunami` | boolean | Filter tsunami events    | `?tsunami=true`     |

---

## 🔒 Authentication

This API uses **JWT Bearer Token** authentication.

### Register

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secret123"
}
```

### Use Token

```bash
Authorization: Bearer <your_token_here>
```

---

## 📦 Data Source

Data is sourced from the **USGS Earthquake Hazards Program**:

- 1000+ real earthquake records
- Updated in real-time from USGS API
- Includes magnitude, location, depth, tsunami data

---

## ⚙️ Local Setup

### Prerequisites

- Node.js 18+
- MongoDB
- Redis

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/earthquake-api.git
cd earthquake-api

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your values

# Start development server
npm run dev
```

### Environment Variables

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/earthquakedb
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
REDIS_URL=redis://localhost:6379
NODE_ENV=development
```

---

## 🌐 Deployment

This API is deployed on **AWS Elastic Beanstalk** with:

- **MongoDB Atlas** for cloud database
- **Upstash Redis** for cloud caching

---

## 📖 Documentation

- **Swagger UI:** http://earthquake-api-env1.eba-mfmdpvr8.eu-north-1.elasticbeanstalk.com/api-docs
- **Postman Collection:** [Add your Postman link here]

---

## 👨‍💻 Author

Built with ❤️ for Qwasar Project
