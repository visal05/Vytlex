import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  loading: boolean;
  selectedCategory: string;
  sortBy: string;
  searchQuery: string;
}

const initialState: ProductState = {
  products: [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      price: 29.99,
      image: 'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg',
      description: 'Comfortable premium cotton t-shirt perfect for everyday wear.',
      category: 'clothes',
      stock: 50,
      rating: 4.5,
      reviews: []
    },
    {
      id: '2',
      name: 'Ceramic Coffee Cup',
      price: 15.99,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      description: 'Beautiful ceramic coffee cup with modern design.',
      category: 'cups',
      stock: 30,
      rating: 4.3,
      reviews: []
    },
    {
      id: '3',
      name: 'Organic Spice Blend',
      price: 12.99,
      image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg',
      description: 'Premium organic spice blend for authentic flavors.',
      category: 'spices',
      stock: 25,
      rating: 4.7,
      reviews: []
    },
    {
      id: '4',
      name: 'Elegant Summer Dress',
      price: 79.99,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      description: 'Beautiful summer dress perfect for special occasions.',
      category: 'dresses',
      stock: 20,
      rating: 4.6,
      reviews: []
    },
    {
      id: '5',
      name: 'Classic Polo Shirt',
      price: 39.99,
      image: 'https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg',
      description: 'Timeless polo shirt with comfortable fit.',
      category: 'clothes',
      stock: 40,
      rating: 4.4,
      reviews: []
    },
    {
      id: '6',
      name: 'Insulated Travel Mug',
      price: 24.99,
      image: 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg',
      description: 'Keep your drinks hot or cold with this insulated travel mug.',
      category: 'cups',
      stock: 35,
      rating: 4.5,
      reviews: []
    }
  ],
  filteredProducts: [],
  categories: ['clothes', 'cups', 'spices', 'dresses'],
  loading: false,
  selectedCategory: 'all',
  sortBy: 'name',
  searchQuery: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState: {
    ...initialState,
    filteredProducts: initialState.products,
  },
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    filterProducts: (state) => {
      let filtered = [...state.products];

      // Filter by category
      if (state.selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === state.selectedCategory);
      }

      // Filter by search query
      if (state.searchQuery) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }

      // Sort products
      switch (state.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default:
          filtered.sort((a, b) => a.name.localeCompare(b.name));
      }

      state.filteredProducts = filtered;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setSelectedCategory,
  setSortBy,
  setSearchQuery,
  filterProducts,
} = productSlice.actions;

export default productSlice.reducer;