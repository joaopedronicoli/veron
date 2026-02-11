import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomePage from './pages/HomePage';
import ListingPerfumes from './pages/ListingPerfumes';
import PerfumeDetail from './pages/PerfumeDetail';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import MinhaContaPage from './pages/MinhaContaPage';
import MeusPedidosPage from './pages/MeusPedidosPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function App() {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-white">
            <Header />
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/perfumes" element={<ListingPerfumes />} />
              <Route path="/perfume/:slug" element={<PerfumeDetail />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Rotas Protegidas - Cliente */}
              <Route
                path="/minha-conta"
                element={
                  <PrivateRoute>
                    <MinhaContaPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/meus-pedidos"
                element={
                  <PrivateRoute>
                    <MeusPedidosPage />
                  </PrivateRoute>
                }
              />

              {/* Rotas Protegidas - Admin */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/produtos"
                element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

