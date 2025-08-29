import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductsPage } from './pages/ProductsPage';
import { CreateProduct } from './pages/CreateProduct';
import ProductDetail from './pages/ProductDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
