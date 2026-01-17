import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './Context/CartContext';
import ProductList from './Pages/ProductList';
import ProductDetail from './Pages/ProductDetail';
import CartPage from './Pages/CartPage';
import EmailVerify from './Pages/EmailVerify';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';

const HomePage = () => (
  <Container className="text-center mt-5">
    <h1 className="display-4">Welcome to TechMarket!</h1>
    <p className="lead">The latest technological products are here.</p>
    <hr />
    <p>Start exploring the products now.</p>
  </Container>
);

function App() {
  return (
    <CartProvider>
      <MainLayout>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/category/:categoryId" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MainLayout>
    </CartProvider>
  );
}

export default App;