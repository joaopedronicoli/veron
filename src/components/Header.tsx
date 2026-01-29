import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, LogOut, Settings, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal';
import CartDrawer from './CartDrawer';

const menuItems = [
  { label: 'INÍCIO', path: '/' },
  { label: 'FEMININO', path: '/perfumes?filter[essencia]=feminino' },
  { label: 'MASCULINO', path: '/perfumes?filter[essencia]=masculino' },
  { label: 'KITS & PRESENTES', path: '/perfumes?filter[essencia]=kits-presentes' },
  { label: 'SOBRE', path: '/sobre' },
  { label: 'CONTATO', path: '/contato' },
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { items, itemCount, updateQuantity, removeItem } = useCart();
  const { isAuthenticated, isAdmin, user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserClick = () => {
    if (isAuthenticated) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      navigate('/login');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1" />

            <Link to="/" className="text-center">
              <h1 className="font-serif text-4xl font-light tracking-wider text-black">
                VERON
              </h1>
              <p className="font-serif text-xs tracking-[0.3em] text-gray-600 mt-1">
                essence
              </p>
            </Link>

            <div className="flex-1 flex justify-end items-center gap-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hover:text-gold transition-colors duration-300"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="hover:text-gold transition-colors duration-300 relative"
                aria-label="Carrinho"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={handleUserClick}
                  className={`hover:text-gold transition-colors duration-300 ${isAuthenticated ? 'text-gold' : ''
                    }`}
                  aria-label="Conta"
                  disabled={loading}
                >
                  <User className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && isAuthenticated && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/minha-conta"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Minha Conta
                    </Link>

                    <Link
                      to="/meus-pedidos"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      Meus Pedidos
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gold hover:bg-gold/5 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Área Admin
                      </Link>
                    )}

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <nav className="mt-8">
            <ul className="flex justify-center items-center gap-12 text-sm tracking-wider">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="hover:text-gold transition-colors duration-300 font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </>
  );
}

