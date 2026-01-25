import { useState, useEffect } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { supabase, type Perfume } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const searchPerfumes = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('perfumes')
          .select('*')
          .or(`nome.ilike.%${query}%,marca.ilike.%${query}%,descricao_curta.ilike.%${query}%`)
          .limit(6);

        if (error) throw error;
        setResults(data || []);
      } catch (error) {
        console.error('Erro ao buscar perfumes:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchPerfumes, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center pt-20 px-6">
      <div className="bg-white w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar perfumes por nome, marca..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="flex-1 text-lg outline-none"
            />
            <button
              onClick={onClose}
              className="hover:text-gold transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {query.trim().length > 0 && query.trim().length < 2 && (
            <p className="text-sm text-gray-500">Digite pelo menos 2 caracteres para buscar</p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
              </p>
              {results.map((perfume) => (
                <Link
                  key={perfume.id}
                  to={`/perfume/${perfume.slug}`}
                  onClick={onClose}
                  className="flex gap-4 p-4 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-20 h-20 bg-gray-100 flex-shrink-0 overflow-hidden">
                    <img
                      src={perfume.imagem_principal}
                      alt={perfume.nome}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs tracking-widest text-gray-500 uppercase mb-1">
                      {perfume.marca}
                    </p>
                    <h3 className="font-serif text-lg text-black group-hover:text-gold transition-colors">
                      {perfume.nome}
                    </h3>
                    <p className="text-gold font-semibold mt-1">
                      R$ {perfume.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.trim().length >= 2 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum perfume encontrado para "{query}"</p>
              <Link
                to="/perfumes"
                onClick={onClose}
                className="text-gold hover:underline mt-4 inline-block"
              >
                Ver todos os perfumes
              </Link>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Digite algo para buscar perfumes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
