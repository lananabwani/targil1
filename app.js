const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Tablet", price: 600 },
];

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

app.use(express.static(path.join(__dirname, "assets")));

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send("מוצר לא נמצא");
  }
  res.json(product);
});

app.get("/users", (req, res) => {
  const age = req.query.age;
  if (age) {
    const ageUsers = users.filter((user) => user.age > parseInt(age));
    return res.json(ageUsers);
  }
  res.json(users);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
