# 📚 Library Management API

API built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB** for managing a digital library system. This project allows you to create, retrieve, update, delete, and borrow books efficiently with built-in validation, availability management, and aggregation features.

---

## 🔧 Features

- ✅ Create, update, retrieve, and delete books
- ✅ Filter books by genre
- ✅ Sort books by any field (e.g., `createdAt`)
- ✅ Limit number of books returned
- ✅ Borrow books with real-time availability check
- ✅ Automatically mark books unavailable when no copies are left
- ✅ View borrowed book summaries with total quantities (via aggregation)
- ✅ Well-structured TypeScript project with models, controllers, and routes

---

## 🚀 Technologies Used

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose ODM)
- **Runtime**: Node.js
- **Deployment**: Vercel

---

## 📁 Project Structure
```
src/
├── server.ts
└── modules/
└── books/
  ├── books.model.ts
  ├── books.controller.ts
  ├── books.routes.ts
  ├── books.interface.ts
  ├── borrow.model.ts
  ├── borrow.controller.ts
  └── borrow.route.ts
```


---

## 🛠️ Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Setup Environment Variables
```
//Create a .env file in the root directory and add:

PORT=5000
DATABASE_URL=your_mongodb_connection_string
```
### 4. Start the Development Server
```
npx ts-node-dev src/server.ts
```
Server will run at: http://localhost:5000



# 📬 API Endpoints Overview
## 📖 Book Routes
Method	Endpoint	Description:
```
POST	/api/books	(Add a new book)
GET	/api/books	Get all books (filter/sort/limit)
GET	/api/books/:bookId	(Get single book by ID)
PATCH	/api/books/:bookId	(Update a book)
DELETE	/api/books/:bookId	(Delete a book)
```
Query Parameters Supported on GET /api/books:

```
filter (by genre)

sortBy (e.g., createdAt)

sort (asc or desc)

limit (number of books)
```

## 📦 Borrow Routes
Method	Endpoint	Description:
```
POST	/api/borrow	(Borrow a book)
GET	  /api/borrow	Get (summary of borrowed books)
```

## 🧪 Testing with Postman
```
You can use Postman to interact with these endpoints. Just ensure your local server is running on http://localhost:5000.
```
## 🌐 Deployment on Vercel
Step 1: Create vercel.json
```
{
  "version": 2,
  "builds": [{ "src": "src/server.ts", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "src/server.ts" }]
}
```
Step 2: Deploy
```
npm install -g vercel
vercel
```
