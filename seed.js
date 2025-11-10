// Run: node seed.js  (after filling .env)
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();
const MONGO = process.env.MONGO_URI;
const sample = [
  { title: 'Classic White T-Shirt', description: 'Soft cotton tee', price: 199, images: [], category: 'Apparel' },
  { title: 'Running Sneakers', description: 'Comfortable running shoes', price: 3499, images: [], category: 'Footwear' },
  { title: 'Ceramic Mug', description: '350ml coffee mug', price: 499, images: [], category: 'Home' },
  { title: 'Wireless Headphones', description: 'Noise-cancelling over-ear', price: 8999, images: [], category: 'Electronics' }
];
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(sample);
    console.log('Seeded products');
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
