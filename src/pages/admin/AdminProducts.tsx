import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Plus } from 'lucide-react';

export default function AdminProducts() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <Link
                to="/admin"
                className="text-gray-600 hover:text-gold text-sm flex items-center gap-1 mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Voltar para dashboard
            </Link>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-gold" />
                    </div>
                    <h1 className="text-2xl font-serif font-light text-gray-900">
                        Gerenciar Produtos
                    </h1>
                </div>

                <button
                    disabled
                    className="flex items-center gap-2 px-4 py-2 bg-gold text-white rounded-lg font-medium hover:bg-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus className="w-4 h-4" />
                    Novo Produto
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">CRUD de produtos em desenvolvimento</p>
                    <p className="text-sm text-gray-400">
                        Aqui será possível adicionar, editar e remover perfumes do catálogo
                    </p>
                </div>

                {/* 
          TODO: Implementar CRUD de produtos
          - Listagem com paginação
          - Filtros por categoria, marca, status
          - Modal de criação/edição
          - Upload de imagens
          - Campos: nome, slug, essência, descrição, preço, marca, imagens
        */}
            </div>
        </div>
    );
}
