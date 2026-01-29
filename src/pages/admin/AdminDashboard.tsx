import { Link } from 'react-router-dom';
import { Package, Users, ShoppingCart, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
    const { user } = useAuth();

    const menuItems = [
        {
            title: 'Cadastro de Produtos',
            description: 'Gerenciar catálogo de perfumes',
            icon: Package,
            path: '/admin/produtos',
            enabled: true,
        },
        {
            title: 'Pedidos',
            description: 'Gerenciar pedidos realizados',
            icon: ShoppingCart,
            path: '/admin/pedidos',
            enabled: false, // TODO: implementar
        },
        {
            title: 'Clientes',
            description: 'Gerenciar base de clientes',
            icon: Users,
            path: '/admin/clientes',
            enabled: false, // TODO: implementar
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                    <LayoutDashboard className="w-6 h-6 text-gold" />
                </div>
                <div>
                    <h1 className="text-2xl font-serif font-light text-gray-900">
                        Área Administrativa
                    </h1>
                    <p className="text-gray-600 text-sm">
                        Logado como {user?.email}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {menuItems.map((item) => (
                    <div key={item.path} className="relative">
                        {item.enabled ? (
                            <Link
                                to={item.path}
                                className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gold hover:shadow-md transition-all"
                            >
                                <item.icon className="w-8 h-8 text-gold mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </Link>
                        ) : (
                            <div className="block p-6 bg-gray-50 rounded-xl border border-gray-200 opacity-60 cursor-not-allowed">
                                <item.icon className="w-8 h-8 text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-gray-600 mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-400">{item.description}</p>
                                <span className="absolute top-3 right-3 text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded">
                                    Em breve
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
