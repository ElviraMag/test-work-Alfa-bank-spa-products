import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProductAsync } from '../store/productsSlice';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import { v4 as uuidv4 } from 'uuid';
import { AppDispatch } from '../store/index';

interface FormData {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export const CreateProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [previewError, setPreviewError] = useState(false);

  const imageUrl = watch('imageUrl');

  const onSubmit = (data: FormData) => {
    const newProduct: Product = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      image: data.imageUrl,
      price: Number(data.price),
      liked: false,
      created: true,
    };
    dispatch(addProductAsync(newProduct));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6 sm:p-12 max-w-lg mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-pink-600 hover:text-pink-700 transition"
      >
        ← Назад к списку
      </button>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Создать процедуру
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6"
        noValidate
      >
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Название
          </label>
          <input
            id="title"
            {...register('title', { required: 'Обязательное поле' })}
            className={`w-full rounded-md border px-3 py-2 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-pink-400`}
          />
          {errors.title && (
            <p className="mt-1 text-red-600 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Описание
          </label>
          <textarea
            id="description"
            {...register('description', { required: 'Обязательное поле' })}
            className={`w-full rounded-md border px-3 py-2 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-pink-400`}
          />
          {errors.description && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="imageUrl" className="block font-medium mb-1">
            Ссылка на фото
          </label>
          <input
            id="imageUrl"
            {...register('imageUrl', { required: 'Обязательное поле' })}
            className={`w-full rounded-md border px-3 py-2 ${
              errors.imageUrl ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-pink-400`}
          />
          {errors.imageUrl && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.imageUrl.message}
            </p>
          )}

          {imageUrl && !previewError && (
            <img
              src={imageUrl}
              alt="Preview"
              onError={() => setPreviewError(true)}
              className="w-full h-48 object-cover rounded mt-2 border"
            />
          )}
          {previewError && (
            <p className="text-red-500 text-sm mt-1">
              Невозможно загрузить изображение
            </p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Стоимость (₽)
          </label>
          <input
            id="price"
            type="number"
            {...register('price', {
              required: 'Обязательное поле',
              min: { value: 1, message: 'Цена должна быть больше 0' },
            })}
            className={`w-full rounded-md border px-3 py-2 ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-pink-400`}
          />
          {errors.price && (
            <p className="mt-1 text-red-600 text-sm">{errors.price.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-pink-500 text-white py-2 px-4 rounded-lg shadow hover:bg-pink-600 transition"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};
