import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, type Perfume } from '../lib/api';
import { Loader2 } from 'lucide-react';

export default function ListingPerfumes() {
  const [searchParams] = useSearchParams();
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const essenciaFilter = searchParams.get('filter[essencia]');

  const getTitulo = () => {
    switch (essenciaFilter) {
      case 'feminino':
        return 'Perfumes Femininos';
      case 'masculino':
        return 'Perfumes Masculinos';
      case 'kits-presentes':
        return 'Kits & Presentes';
      default:
        return 'Todos os Perfumes';
    }
  };

  useEffect(() => {
    async function fetchPerfumes() {
      try {
        setLoading(true);
        setError(null);

        const data = await api.perfumes.list(
          essenciaFilter ? { essencia: essenciaFilter } : undefined
        );

        setPerfumes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar perfumes');
      } finally {
        setLoading(false);
      }
    }

    fetchPerfumes();
  }, [essenciaFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-gold hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 px-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl text-black mb-4">{getTitulo()}</h1>
          <p className="text-gray-600 tracking-wide">
            {perfumes.length} {perfumes.length === 1 ? 'perfume disponível' : 'perfumes disponíveis'}
          </p>
        </div>

        {perfumes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Nenhum perfume encontrado nesta categoria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perfumes.map((perfume) => (
              <a
                key={perfume.id}
                href={`/perfume/${perfume.slug}`}
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
                  {perfume.descricao_curta && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{perfume.descricao_curta}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
