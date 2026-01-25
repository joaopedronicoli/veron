import { useState } from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
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
  const { items, itemCount, updateQuantity, removeItem } = useCart();

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
              <button
                className="hover:text-gold transition-colors duration-300"
                aria-label="Conta"
              >
                <User className="w-5 h-5" />
              </button>
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
