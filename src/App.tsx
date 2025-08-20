import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from '@/components/ui/toaster';

// Layout Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Admin Pages
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<div>Products Management (Coming Soon)</div>} />
              <Route path="orders" element={<div>Orders Management (Coming Soon)</div>} />
              <Route path="users" element={<div>Users Management (Coming Soon)</div>} />
              <Route path="categories" element={<div>Categories Management (Coming Soon)</div>} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Main Routes */}
            <Route
              path="/*"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/categories" element={<div className="p-8"><h1>Categories (Coming Soon)</h1></div>} />
                      <Route path="/about" element={<div className="p-8"><h1>About (Coming Soon)</h1></div>} />
                      <Route path="/contact" element={<div className="p-8"><h1>Contact (Coming Soon)</h1></div>} />
                      <Route path="/profile" element={<div className="p-8"><h1>Profile (Coming Soon)</h1></div>} />
                      <Route path="/orders" element={<div className="p-8"><h1>Order History (Coming Soon)</h1></div>} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </Provider>
  );
};

export default App;