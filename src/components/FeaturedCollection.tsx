import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, type Perfume } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export default function FeaturedCollection() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedPerfumes() {
      try {
        const { data, error } = await supabase
          .from('perfumes')
          .select('*')
          .limit(4);

        if (error) throw error;

        if (data && data.length > 0) {
          const shuffled = [...data].sort(() => Math.random() - 0.5);
          setPerfumes(shuffled.slice(0, 4));
        }
      } catch (error) {
        console.error('Erro ao carregar perfumes em destaque:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedPerfumes();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      </section>
    );
  }

  if (perfumes.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl text-black mb-4">Coleção em Destaque</h2>
          <p className="text-gray-600 tracking-wide">Nossos perfumes mais desejados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perfumes.map((perfume) => (
            <Link
              key={perfume.id}
              to={`/perfume/${perfume.slug}`}
              className="group cursor-pointer block"
            >
              <div className="relative bg-white aspect-square mb-4 overflow-hidden">
                <img
                  src={perfume.imagem_principal}
                  alt={perfume.nome}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>

              <div className="text-center space-y-1">
                <p className="text-xs tracking-widest text-gray-500 uppercase">{perfume.marca}</p>
                <h3 className="font-serif text-lg text-black">{perfume.nome}</h3>
                <p className="text-gold font-semibold tracking-wide">
                  R$ {perfume.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
