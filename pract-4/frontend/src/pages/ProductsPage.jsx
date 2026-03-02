import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './ProductsPage.scss';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert('Ошибка загрузки товаров');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <main className="main">
        <div className="container">
          <h1>Товары</h1>
          {loading ? (
            <div>Загрузка...</div>
          ) : (
            <div className="products-list">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p>Категория: {product.category}</p>
                  <p>Описание: {product.description}</p>
                  <p>Цена: {product.price} руб.</p>
                  <p>Наличие: {product.stock} шт.</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          © {new Date().getFullYear()} Магазин
        </div>
      </footer>
    </div>
  );
}