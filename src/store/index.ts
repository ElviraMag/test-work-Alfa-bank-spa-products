import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import productsReducer from './productsSlice';

import img1 from '../assets/images/product 1.avif';
import img2 from '../assets/images/product 2.avif';
import img3 from '../assets/images/product 3.avif';
import img4 from '../assets/images/product 4.avif';
import img5 from '../assets/images/product 5.avif';
import img6 from '../assets/images/product 6.avif';
import img7 from '../assets/images/product 7.avif';
import img8 from '../assets/images/product 8.avif';
import img9 from '../assets/images/product 9.avif';
import img10 from '../assets/images/product 10.avif';
import img11 from '../assets/images/product 11.avif';
import img12 from '../assets/images/product 12.avif';

interface ProductsState {
  products: Product[];
  filterFavoritesOnly: boolean;
}

const initialState: ProductsState = {
  products: [
    {
      id: '1',
      title: 'Расслабляющий массаж',
      description: 'Погрузитесь в мир полного расслабления с нашим массажем.',
      image: img1,
      liked: false,
      price: 2500,
    },
    {
      id: '2',
      title: 'СПА уход за лицом',
      description: 'Омолаживающие процедуры для сияющей кожи.',
      image: img2,
      liked: false,
      price: 3000,
    },
    {
      id: '3',
      title: 'Педикюр',
      description: 'Профессиональный уход за ногтями и кожей стоп.',
      image: img3,
      liked: false,
      price: 1500,
    },
    {
      id: '4',
      title: 'Маникюр',
      description: 'Стильный и аккуратный уход за ногтями.',
      image: img4,
      liked: false,
      price: 1800,
    },
    {
      id: '5',
      title: 'Паровые ванны',
      description:
        'Очищение и расслабление в паровых банях с эфирными маслами.',
      image: img5,
      liked: false,
      price: 5500,
    },
    {
      id: '6',
      title: 'Ароматерапия',
      description:
        'Лечение и расслабление с помощью эфирных масел и приятных ароматов.',
      image: img6,
      liked: false,
      price: 3500,
    },
    {
      id: '7',
      title: 'Обёртывание тела',
      description: 'Процедура для улучшения тонуса кожи и борьбы с целлюлитом.',
      image: img7,
      liked: false,
      price: 4000,
    },
    {
      id: '8',
      title: 'Фитнес массаж',
      description: 'Восстановление после тренировок.',
      image: img8,
      liked: false,
      price: 3800,
    },
    {
      id: '9',
      title: 'Йога терапия',
      description: 'Дыхательные практики и растяжка.',
      image: img9,
      liked: false,
      price: 1500,
    },
    {
      id: '10',
      title: 'Глубокое очищение кожи',
      description: 'Процедура для удаления загрязнений и улучшения цвета лица.',
      image: img10,
      liked: false,
      price: 3000,
    },
    {
      id: '11',
      title: 'Антицеллюлитный массаж',
      description:
        'Эффективная техника для борьбы с целлюлитом и улучшения тонуса кожи.',
      image: img11,
      liked: false,
      price: 2400,
    },
    {
      id: '12',
      title: 'СПА педикюр с парафином',
      description: 'Питательная процедура для мягкости и здоровья кожи ног.',
      image: img12,
      liked: false,
      price: 3600,
    },
  ],
  filterFavoritesOnly: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) product.liked = !product.liked;
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    setFilterFavoritesOnly(state, action: PayloadAction<boolean>) {
      state.filterFavoritesOnly = action.payload;
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const idx = state.products.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.products[idx] = action.payload;
    },
  },
});

export const {
  toggleLike,
  deleteProduct,
  addProduct,
  setFilterFavoritesOnly,
  updateProduct,
} = productsSlice.actions;

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
