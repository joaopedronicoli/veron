import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { api, setTokens, clearTokens, type User } from '../lib/api';

export type UserRole = 'ADMIN' | 'USER';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signInWithGoogle: (idToken: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'ADMIN';

    const loadUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setLoading(false);
                return;
            }
            const userData = await api.users.me();
            setUser(userData);
        } catch {
            clearTokens();
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const signIn = async (email: string, password: string) => {
        try {
            const result = await api.auth.login(email, password);
            setTokens(result.accessToken, result.refreshToken);
            setUser(result.user);
            return { error: null };
        } catch (err) {
            return { error: err instanceof Error ? err : new Error('Erro ao fazer login') };
        }
    };

    const signInWithGoogle = async (idToken: string) => {
        try {
            const result = await api.auth.google(idToken);
            setTokens(result.accessToken, result.refreshToken);
            setUser(result.user);
            return { error: null };
        } catch (err) {
            return { error: err instanceof Error ? err : new Error('Erro ao fazer login com Google') };
        }
    };

    const signOut = async () => {
        try {
            await api.auth.logout();
        } catch {
            // Ignore logout errors
        }
        clearTokens();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                isAdmin,
                signIn,
                signInWithGoogle,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
