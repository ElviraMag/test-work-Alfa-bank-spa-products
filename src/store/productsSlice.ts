import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number | string;
  title: string;
  description: string;
  image: string;
  price?: number;
  liked: boolean;
  created?: boolean;
}

interface ProductsState {
  products: Product[];
  filterFavoritesOnly: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  filterFavoritesOnly: false,
  loading: false,
  error: null,
};

// ✅ единый API для всех запросов
const API_URL = 'http://localhost:5000/products';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Ошибка загрузки продуктов');
    return (await res.json()) as Product[];
  }
);

export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async (product: Product) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Ошибка добавления продукта');
    return (await res.json()) as Product;
  }
);

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (id: number | string) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Ошибка удаления продукта');
    return id;
  }
);

export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async (product: Product) => {
    const res = await fetch(`${API_URL}/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Ошибка обновления продукта');
    return (await res.json()) as Product;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilterFavoritesOnly(state, action: PayloadAction<boolean>) {
      state.filterFavoritesOnly = action.payload;
    },
    toggleLike(state, action: PayloadAction<number | string>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) product.liked = !product.liked;
    },
    deleteProduct(state, action: PayloadAction<number | string>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка';
      })

      // add
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // delete
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      })

      // update
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export const { setFilterFavoritesOnly, toggleLike, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
