const express = require('express');
const app = express();
const port = 3000;

// товары
let products = [
  { id: 1, name: 'Ноутбук', price: 50000 },
  { id: 2, name: 'Мышь', price: 1500 },
  { id: 3, name: 'Клавиатура', price: 3000 }
];

// Middleware для парсинга JSON
app.use(express.json());

// главная страница
app.get('/', (req, res) => {
  res.send(`
    <h1>Главная страница магазина</h1>
    <p>Перейди к <a href="/products">списку товаров</a></p>
  `);
});

// получить все товары
app.get('/products', (req, res) => {
  res.json(products);
});

// получить товар по id 
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Товар не найден'});
  }
  res.json(product);
});

//создать новый товар
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  
  // проверка
  if (!name || !price) {
    return res.status(400).json({ message: 'Название и цена обязательны'});
  }
  
  const newProduct = {
    id: Date.now(), // простой способ генерации id
    name,
    price
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// обновление товара
app.patch('/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: 'Товар не найден' });
  }
  
  const { name, price } = req.body;
  
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  
  res.json(product);
});

// удаление товара
app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id == req.params.id);
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Товар не найден' });
  }
  
  products.splice(productIndex, 1);
  res.json({ message: 'Товар удален' });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});