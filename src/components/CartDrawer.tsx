import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  nome: string;
  marca: string;
  preco: number;
  imagem_principal: string;
  slug: string;
  quantidade: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantidade: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="font-serif text-2xl">Seu Carrinho</h2>
          </div>
          <button
            onClick={onClose}
            className="hover:text-gold transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-6">Seu carrinho está vazio</p>
              <Link
                to="/perfumes"
                onClick={onClose}
                className="inline-block bg-black hover:bg-gold text-white hover:text-black font-semibold py-3 px-8 tracking-wider transition-all duration-300"
              >
                EXPLORAR PERFUMES
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-200">
                  <Link
                    to={`/perfume/${item.slug}`}
                    onClick={onClose}
                    className="w-24 h-24 bg-gray-100 flex-shrink-0 overflow-hidden"
                  >
                    <img
                      src={item.imagem_principal}
                      alt={item.nome}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <Link
                      to={`/perfume/${item.slug}`}
                      onClick={onClose}
                    >
                      <p className="text-xs tracking-widest text-gray-500 uppercase">
                        {item.marca}
                      </p>
                      <h3 className="font-serif text-lg text-black hover:text-gold transition-colors">
                        {item.nome}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantidade - 1)}
                          className="w-8 h-8 border border-gray-300 hover:border-gold flex items-center justify-center transition-colors"
                          disabled={item.quantidade <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantidade}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantidade + 1)}
                          className="w-8 h-8 border border-gray-300 hover:border-gold flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-gold font-semibold mt-2">
                      R$ {(item.preco * item.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Total:</span>
              <span className="font-serif text-2xl text-gold">
                R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <button
              className="w-full bg-black hover:bg-gold text-white hover:text-black font-semibold py-4 px-8 tracking-wider transition-all duration-300"
            >
              FINALIZAR COMPRA
            </button>

            <button
              onClick={onClose}
              className="w-full border-2 border-gray-300 hover:border-gold text-black font-semibold py-3 px-8 tracking-wider transition-all duration-300"
            >
              CONTINUAR COMPRANDO
            </button>
          </div>
        )}
      </div>
    </>
  );
}
