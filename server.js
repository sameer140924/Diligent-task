const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const Product = require('./models/Product');

app.get('/api/health', (req, res) => res.json({status: 'ok'}));

app.get('/api/products', async (req, res) => {
  try {
    const q = req.query.q || '';
    const products = await Product.find({ title: new RegExp(q, 'i') }).limit(50);
    res.json(products);
  } catch (err) { res.status(500).json({error: err.message}); }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({error: 'Not found'});
    res.json(p);
  } catch (err) { res.status(500).json({error: err.message}); }
});

app.post('/api/cart/checkout', (req, res) => {
  // Mock checkout - in production integrate payment gateway.
  const { cart } = req.body;
  if (!cart) return res.status(400).json({error: 'No cart provided'});
  // Here you'd validate stock, create order, etc.
  res.json({ success: true, message: 'Mock checkout complete', orderId: Date.now() });
});

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || '';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Mongo');
    app.listen(PORT, () => console.log('Server running on', PORT));
  })
  .catch(err => {
    console.error('Mongo connection error', err.message);
    app.listen(PORT, () => console.log('Server running (no DB) on', PORT));
  });
