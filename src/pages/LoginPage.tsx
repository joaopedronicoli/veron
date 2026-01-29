import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { signIn, signInWithGoogle } = useAuth();

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErro('');

        try {
            const { error } = await signIn(email, senha);

            if (error) {
                throw error;
            }

            // Redirect based on role (admin goes to /admin, user goes to previous page or home)
            // Note: isAdmin will be false here on first render, but auth state change will trigger re-render
            // The actual redirect happens after auth state updates
            setTimeout(() => {
                // Small delay to allow auth state to update
                navigate(from, { replace: true });
            }, 100);

        } catch (err) {
            setErro(err instanceof Error ? err.message : 'Erro ao fazer login.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setErro('');

        try {
            const { error } = await signInWithGoogle();

            if (error) {
                throw error;
            }
            // Supabase will redirect to Google, then back to the app
        } catch (err) {
            setErro(err instanceof Error ? err.message : 'Erro ao fazer login com Google.');
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <Link
                        to="/"
                        className="text-gray-600 hover:text-gold text-sm flex items-center gap-1 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Voltar
                    </Link>
                </div>

                {erro && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                        <p className="font-medium">{erro}</p>
                    </div>
                )}

                <div className="flex flex-col items-center text-center mb-8">
                    <h1 className="font-serif text-3xl font-light tracking-wider text-black">
                        VERON
                    </h1>
                    <p className="font-serif text-xs tracking-[0.3em] text-gray-600 mt-1">
                        essence
                    </p>
                    <h2 className="text-lg font-medium text-gray-800 mt-6">
                        Acesse sua conta
                    </h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                            placeholder="seu@email.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full p-3 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                            placeholder="Sua senha"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 text-sm rounded-md text-white font-semibold transition-colors duration-300 flex items-center justify-center disabled:cursor-not-allowed bg-gold hover:bg-gold-dark disabled:bg-gold/50"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Entrar'}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 flex-shrink text-sm text-gray-500">OU</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="px-6 py-2.5 rounded-md bg-white text-sm text-gray-800 font-medium shadow-sm hover:bg-gray-50 border border-gray-300 flex items-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Entrar com o Google
                    </button>
                </div>
            </div>
        </div>
    );
}
