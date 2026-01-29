import { Link } from 'react-router-dom';
import { User, Package, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MinhaContaPage() {
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <Link
                to="/"
                className="text-gray-600 hover:text-gold text-sm flex items-center gap-1 mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Voltar para loja
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gold" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-serif font-light text-gray-900">
                            Minha Conta
                        </h1>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mb-8">
                    <Link
                        to="/meus-pedidos"
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gold hover:bg-gold/5 transition-colors"
                    >
                        <Package className="w-6 h-6 text-gold" />
                        <div>
                            <h3 className="font-medium text-gray-900">Meus Pedidos</h3>
                            <p className="text-sm text-gray-500">Acompanhe seus pedidos</p>
                        </div>
                    </Link>

                    {/* Placeholder para futuras features */}
                    {/* 
          <Link to="/meus-enderecos" className="...">
            <MapPin /> Meus Endereços
          </Link>
          <Link to="/meus-favoritos" className="...">
            <Heart /> Favoritos
          </Link>
          */}
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <button
                        onClick={handleSignOut}
                        className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                        Sair da conta
                    </button>
                </div>
            </div>
        </div>
    );
}
