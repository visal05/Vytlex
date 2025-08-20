import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface OrderState {
  orders: Order[];
  userOrders: Order[];
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  userOrders: [],
  loading: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      state.userOrders.push(action.payload);
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
        order.updatedAt = new Date().toISOString();
      }
      const userOrder = state.userOrders.find(o => o.id === action.payload.id);
      if (userOrder) {
        userOrder.status = action.payload.status;
        userOrder.updatedAt = new Date().toISOString();
      }
    },
    setUserOrders: (state, action: PayloadAction<Order[]>) => {
      state.userOrders = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setOrders, addOrder, updateOrderStatus, setUserOrders, setLoading } = orderSlice.actions;
export default orderSlice.reducer;