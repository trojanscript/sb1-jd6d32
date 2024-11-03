import express from 'express';
import db from '../db';

const app = express();
app.use(express.json());

// Products API
app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const { name, description, price, stock } = req.body;
  const result = db
    .prepare('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)')
    .run(name, description, price, stock);
  res.json({ id: result.lastInsertRowid });
});

app.put('/api/products/:id', (req, res) => {
  const { name, description, price, stock } = req.body;
  db.prepare(
    'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?'
  ).run(name, description, price, stock, req.params.id);
  res.json({ success: true });
});

app.patch('/api/products/:id', (req, res) => {
  const { paid } = req.body;
  db.prepare('UPDATE products SET paid = ? WHERE id = ?').run(paid ? 1 : 0, req.params.id);
  res.json({ success: true });
});

app.delete('/api/products/:id', (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Customers API
app.get('/api/customers', (req, res) => {
  const customers = db.prepare('SELECT * FROM customers ORDER BY created_at DESC').all();
  res.json(customers);
});

app.post('/api/customers', (req, res) => {
  const { first_name, last_name, email, phone, member_number, booking_date, login_date } = req.body;
  const result = db
    .prepare(
      'INSERT INTO customers (first_name, last_name, email, phone, member_number, booking_date, login_date) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
    .run(first_name, last_name, email, phone, member_number, booking_date, login_date);
  res.json({ id: result.lastInsertRowid });
});

app.put('/api/customers/:id', (req, res) => {
  const { first_name, last_name, email, phone, member_number, booking_date, login_date } = req.body;
  db.prepare(
    'UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone = ?, member_number = ?, booking_date = ?, login_date = ? WHERE id = ?'
  ).run(first_name, last_name, email, phone, member_number, booking_date, login_date, req.params.id);
  res.json({ success: true });
});

app.patch('/api/customers/:id', (req, res) => {
  const { paid } = req.body;
  db.prepare('UPDATE customers SET paid = ? WHERE id = ?').run(paid ? 1 : 0, req.params.id);
  res.json({ success: true });
});

app.delete('/api/customers/:id', (req, res) => {
  db.prepare('DELETE FROM customers WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.listen(3001, () => {
  console.log('API server running on port 3001');
});