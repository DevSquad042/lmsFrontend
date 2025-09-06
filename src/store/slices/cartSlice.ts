import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  instructor: string;
  rating: number;
  lectures: number;
  level: string;
}

interface CartState {
  items: CartItem[];
  savedForLater: CartItem[];
}

const loadCart = (): CartState => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : { items: [], savedForLater: [] };
  } catch {
    return { items: [], savedForLater: [] };
  }
};

const saveCart = (state: CartState) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialState: CartState = loadCart();

export const buyNow = createAsyncThunk(
  'cart/buyNow',
  async (course: Omit<CartItem, 'quantity'>, { dispatch }) => {
    dispatch(cartSlice.actions.addToCart(course));
    return course.id;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push({ ...action.payload, quantity: 1 });
        saveCart(state);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        saveCart(state);
      }
    },
    moveToSaveForLater: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        state.items = state.items.filter((i) => i.id !== action.payload);
        state.savedForLater.push(item);
        saveCart(state);
      }
    },
    moveToCart: (state, action: PayloadAction<string>) => {
      const savedItem = state.savedForLater.find((i) => i.id === action.payload);
      if (savedItem) {
        state.savedForLater = state.savedForLater.filter((i) => i.id !== action.payload);
        state.items.push(savedItem);
        saveCart(state);
      }
    },
    removeFromSaveForLater: (state, action: PayloadAction<string>) => {
      state.savedForLater = state.savedForLater.filter((item) => item.id !== action.payload);
      saveCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.savedForLater = [];
      saveCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  moveToSaveForLater,
  moveToCart,
  removeFromSaveForLater,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;