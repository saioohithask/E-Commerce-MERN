#  MERN E-Commerce Website

A Full Stack E-Commerce Website developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

---

##  Features

- User Registration
- User Login with JWT Authentication
- Secure Password Hashing using bcrypt
- Product Listing
- Shopping Cart
- Increase / Decrease Product Quantity
- Remove Products from Cart
- Checkout Page
- Order History
- Responsive User Interface

---

##  Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

##  Project Structure

```
E-Commerce
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

---

##  Installation

### Clone Repository

```bash
git clone https://github.com/saioohithask/E-Commerce-MERN.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

##  Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

##  Author

**Sai Oohitha**

GitHub:
https://github.com/saioohithask