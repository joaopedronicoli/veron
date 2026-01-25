import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <section className="py-20 px-6 bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="font-serif text-9xl text-black mb-4">404</h1>
          <div className="w-24 h-px bg-gold mx-auto mb-6"></div>
          <h2 className="font-serif text-4xl text-black mb-4">Página Não Encontrada</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Desculpe, a página que você está procurando não existe ou foi movida.
            <br />
            Que tal descobrir nossa coleção exclusiva de perfumes?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-black hover:bg-gold text-white hover:text-black font-semibold py-4 px-8 tracking-wider transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            VOLTAR AO INÍCIO
          </Link>

          <Link
            to="/perfumes"
            className="inline-flex items-center gap-3 border-2 border-black hover:border-gold hover:bg-gold text-black font-semibold py-4 px-8 tracking-wider transition-all duration-300"
          >
            <Search className="w-5 h-5" />
            VER PERFUMES
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 italic">
            Veron Essence - Onde cada fragrância conta uma história única
          </p>
        </div>
      </div>
    </section>
  );
}
