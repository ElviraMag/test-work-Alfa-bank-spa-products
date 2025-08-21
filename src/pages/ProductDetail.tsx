import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => String(p.id) === id)
  );

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6">
        <h2 className="text-2xl font-bold text-gray-700">
          Процедура не найдена
        </h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
        >
          Вернуться к списку
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 sm:p-12">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-pink-600 hover:text-pink-700 transition"
      >
        ← Назад к списку
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-6 sm:p-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {product.title}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          {product.price && (
            <p className="text-2xl font-semibold text-pink-500 mb-6">
              {product.price} ₽
            </p>
          )}

          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
          >
            Вернуться к списку процедур
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
