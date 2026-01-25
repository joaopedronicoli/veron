import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, type Perfume } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { Loader2, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function PerfumeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchPerfume() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('perfumes')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!data) {
          setError('Perfume não encontrado');
          return;
        }

        setPerfume(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar perfume');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPerfume();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (error || !perfume) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Perfume não encontrado'}</p>
          <Link to="/perfumes" className="text-gold hover:underline">
            Voltar para perfumes
          </Link>
        </div>
      </div>
    );
  }

  const getEssenciaLabel = (essencia: string) => {
    switch (essencia) {
      case 'feminino':
        return 'Feminino';
      case 'masculino':
        return 'Masculino';
      case 'kits-presentes':
        return 'Kits & Presentes';
      default:
        return essencia;
    }
  };

  return (
    <section className="py-16 px-6 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/perfumes"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-50 overflow-hidden">
            <img
              src={perfume.imagem_principal}
              alt={perfume.nome}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div>
              <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">
                {perfume.marca}
              </p>
              <h1 className="font-serif text-5xl text-black mb-3">{perfume.nome}</h1>
              <p className="text-sm text-gray-600 uppercase tracking-wide">
                {getEssenciaLabel(perfume.essencia)}
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">{perfume.descricao_curta}</p>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-3xl font-serif text-gold mb-6">
                R$ {perfume.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>

              <button
                onClick={() => {
                  addItem({
                    id: perfume.id,
                    nome: perfume.nome,
                    marca: perfume.marca,
                    preco: perfume.preco,
                    imagem_principal: perfume.imagem_principal,
                    slug: perfume.slug,
                  });
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className="w-full bg-black hover:bg-gold text-white hover:text-black font-semibold py-4 px-8 tracking-wider transition-all duration-300 flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                {added ? 'ADICIONADO!' : 'ADICIONAR AO CARRINHO'}
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Autenticidade Garantida</span>
                <span className="text-gold">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Embalagem Premium</span>
                <span className="text-gold">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Entrega Rápida</span>
                <span className="text-gold">✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
