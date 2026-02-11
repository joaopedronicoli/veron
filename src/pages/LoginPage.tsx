import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { signIn, signUp, signInWithGoogle } = useAuth();

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErro('');

        if (isRegister && senha !== confirmarSenha) {
            setErro('As senhas não coincidem.');
            setLoading(false);
            return;
        }

        if (isRegister && senha.length < 6) {
            setErro('A senha deve ter pelo menos 6 caracteres.');
            setLoading(false);
            return;
        }

        try {
            const { error } = isRegister
                ? await signUp(email, senha, nome || undefined)
                : await signIn(email, senha);

            if (error) {
                throw error;
            }

            navigate(from, { replace: true });
        } catch (err) {
            setErro(err instanceof Error ? err.message : isRegister ? 'Erro ao criar conta.' : 'Erro ao fazer login.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (response: CredentialResponse) => {
        if (!response.credential) {
            setErro('Erro ao obter credencial do Google.');
            return;
        }

        setLoading(true);
        setErro('');

        try {
            const { error } = await signInWithGoogle(response.credential);

            if (error) {
                throw error;
            }

            navigate(from, { replace: true });
        } catch (err) {
            setErro(err instanceof Error ? err.message : 'Erro ao fazer login com Google.');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsRegister(!isRegister);
        setErro('');
        setNome('');
        setSenha('');
        setConfirmarSenha('');
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
                        {isRegister ? 'Criar sua conta' : 'Acesse sua conta'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {isRegister && (
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Nome completo
                            </label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full p-3 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                                placeholder="Seu nome"
                                disabled={loading}
                            />
                        </div>
                    )}

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
                            placeholder={isRegister ? 'Mínimo 6 caracteres' : 'Sua senha'}
                            required
                            disabled={loading}
                        />
                    </div>

                    {isRegister && (
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Confirmar senha
                            </label>
                            <input
                                type="password"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                className="w-full p-3 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition"
                                placeholder="Repita a senha"
                                required
                                disabled={loading}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 text-sm rounded-md text-white font-semibold transition-colors duration-300 flex items-center justify-center disabled:cursor-not-allowed bg-gold hover:bg-gold-dark disabled:bg-gold/50"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : isRegister ? 'Criar conta' : 'Entrar'}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 flex-shrink text-sm text-gray-500">OU</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setErro('Erro ao fazer login com Google.')}
                        theme="outline"
                        size="large"
                        text="signin_with"
                        shape="rectangular"
                    />
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={toggleMode}
                        className="text-sm text-gray-600 hover:text-gold transition-colors"
                    >
                        {isRegister
                            ? 'Já tem uma conta? Faça login'
                            : 'Não tem conta? Cadastre-se'}
                    </button>
                </div>
            </div>
        </div>
    );
}
