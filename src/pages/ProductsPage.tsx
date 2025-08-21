import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  fetchProducts,
  deleteProductAsync,
  updateProductAsync,
  setFilterFavoritesOnly,
} from '../store/productsSlice';
import { useNavigate } from 'react-router-dom';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { products, filterFavoritesOnly, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: number | string) => {
    dispatch(deleteProductAsync(id));
  };

  const handleLike = (id: number | string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      dispatch(updateProductAsync({ ...product, liked: !product.liked }));
    }
  };

  const handleFilterChange = () => {
    dispatch(setFilterFavoritesOnly(!filterFavoritesOnly));
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFavorite = !filterFavoritesOnly || product.liked;
    return matchesSearch && matchesFavorite;
  });

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) return <p className="text-center">Загрузка...</p>;
  if (error) return <p className="text-center text-red-500">Ошибка: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Поиск услуг..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filterFavoritesOnly}
            onChange={handleFilterChange}
            className="form-checkbox h-5 w-5 text-pink-600"
          />
          <span>Только избранное</span>
        </label>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/create')}
          className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
        >
          + Добавить продукт
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            Услуги не найдены
          </p>
        ) : (
          paginatedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className="bg-white rounded-lg shadow-md cursor-pointer flex flex-col hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm flex-grow line-clamp-3">
                  {product.description}
                </p>
                <p className="text-pink-500 font-bold mt-2">
                  {product.price} ₽
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(product.id);
                    }}
                    aria-label="like"
                    className={`text-2xl transition ${
                      product.liked
                        ? 'text-pink-500'
                        : 'text-gray-300 hover:text-pink-400'
                    }`}
                  >
                    ♥
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(product.id);
                    }}
                    aria-label="delete"
                    className="text-gray-400 hover:text-red-600 text-xl"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50 bg-pink-500 text-white hover:bg-pink-600"
          >
            ◀ Назад
          </button>

          <span>
            Страница {currentPage} из {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50 bg-pink-500 text-white hover:bg-pink-600"
          >
            Вперед ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
