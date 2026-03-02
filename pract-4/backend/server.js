const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');
const app = express();
const port = 3000;

let products = [
  { id: nanoid(6), name: 'Ноутбук', category: 'Электроника', description: 'Игровой ноутбук', price: 50000, stock: 10 },
  { id: nanoid(6), name: 'Мышь', category: 'Электроника', description: 'Беспроводная мышь', price: 1500, stock: 25 },
  { id: nanoid(6), name: 'Клавиатура', category: 'Электроника', description: 'Механическая клавиатура', price: 5000, stock: 15 },
  { id: nanoid(6), name: 'Монитор', category: 'Электроника', description: '24 дюйма', price: 17000, stock: 9 },
  { id: nanoid(6), name: 'Наушники', category: 'Аудио', description: 'Беспроводные наушники', price: 6000, stock: 20 },
  { id: nanoid(6), name: 'Колонка', category: 'Аудио', description: 'Портативная колонка', price: 3500, stock: 12 },
  { id: nanoid(6), name: 'Телефон', category: 'Электроника', description: 'Смартфон', price: 30000, stock: 7 },
  { id: nanoid(6), name: 'Чехол', category: 'Аксессуары', description: 'Силиконовый чехол', price: 700, stock: 30 },
  { id: nanoid(6), name: 'Зарядка', category: 'Аксессуары', description: 'Беспроводная зарядка', price: 2500, stock: 30 },
  { id: nanoid(6), name: 'Планшет', category: 'Электроника', description: 'Планшет для рисования', price: 20000, stock: 5 }
];

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' }));

// маршруты для продуктов
app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});
app.post('/api/products', (req, res) => {
  const { name, category, description, price, stock } = req.body;
  const newProduct = { id: nanoid(6), name, category, description, price, stock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.patch('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  Object.assign(product, req.body);
  res.json(product);
});
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

app.listen(port, () => console.log(`Сервер запущен на http://localhost:${port}`));