import { Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';

export default function MeusPedidosPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <Link
                to="/minha-conta"
                className="text-gray-600 hover:text-gold text-sm flex items-center gap-1 mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Voltar para minha conta
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-gold" />
                    </div>
                    <h1 className="text-2xl font-serif font-light text-gray-900">
                        Meus Pedidos
                    </h1>
                </div>

                <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Você ainda não tem pedidos</p>
                    <Link
                        to="/perfumes"
                        className="text-gold hover:text-gold-dark font-medium transition-colors"
                    >
                        Explorar perfumes
                    </Link>
                </div>

                {/* 
          TODO: Implementar listagem de pedidos
          - Buscar pedidos do usuário no Supabase
          - Exibir status: Pendente, Confirmado, Enviado, Entregue
          - Detalhes: data, itens, valor total
          - Link para detalhes do pedido
        */}
            </div>
        </div>
    );
}
