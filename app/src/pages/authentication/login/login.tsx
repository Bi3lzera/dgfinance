import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { AuthenticationService } from '../../../services/authentication/authService';
import logo from '../../../assets/logo.png';

interface LoginProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export function Login({ setIsAuthenticated }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [loginFailed, setLoginFailed] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const credentials = { login: email, password: password };
        try {
            const authenticatedResponse = await AuthenticationService.login(credentials, rememberMe);
            if (authenticatedResponse.status === 200) {
                setIsAuthenticated(true);
                setLoginFailed(false);
            }
        } catch (error) {
            console.error(error);
            setLoginFailed(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center px-4 py-8 font-sans">

            {/* Logo Placeholder */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 tracking-wide">
                <img src={logo} alt="Logo" className="w-32 h-32" />
            </h1>

            {/* Main Card */}
            <main className="w-full max-w-[450px] bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 p-8">
                <div className="text-center mb-8">
                    <h2 className="text-[26px] font-bold text-gray-900 mb-2">Bem-vindo de volta</h2>
                    <p className="text-[15px] text-gray-500">
                        Acesse sua conta para gerenciar suas finanças hoje.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="nome@exemplo.com"
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-gray-900 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-900">Senha</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-gray-900"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {loginFailed && (
                        <div className="bg-[#fef2f2] border border-red-100 rounded-lg p-3.5 flex items-start gap-3 text-sm">
                            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-red-800 font-semibold mb-0.5">Falha no login</h3>
                                <p className="text-red-600 leading-relaxed">
                                    Parece que o e-mail ou a senha estão incorretos. Tente novamente.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Remember me & Forgot Password */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded cursor-pointer accent-blue-600"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                                Lembrar-me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-gray-900 hover:underline">
                                Esqueci minha senha
                            </a>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#111111] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                        >
                            Entrar
                        </button>

                        <button
                            type="button"
                            className="mt-3 w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                        >
                            Criar nova conta
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </form>

                {/* Divider */}
                <div className="mt-8 mb-6 relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-3 bg-white text-gray-500 tracking-wider">
                            OU CONTINUE COM
                        </span>
                    </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                        <FcGoogle className="h-5 w-5" />
                        <span>Google</span>
                    </button>
                    <button
                        type="button"
                        className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                        <FaApple className="h-5 w-5 text-black" />
                        <span>Apple</span>
                    </button>
                </div>

                {/* Help Box */}
                <div className="mt-8 bg-[#f9fafb] border border-gray-100 rounded-xl p-4 flex gap-3 text-sm text-gray-600">
                    <HelpCircle className="h-5 w-5 text-gray-700 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-gray-900 font-semibold mb-1">Dificuldade para entrar?</h3>
                        <p className="text-[13px] leading-relaxed">
                            Certifique-se de que o Caps Lock está desativado e que seu teclado está no idioma correto. Se o problema persistir, entre em contato com o suporte.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-12 text-center text-[13px] text-gray-500 w-full max-w-[450px]">
                <div className="flex justify-center items-center gap-6 mb-4">
                    <a href="#" className="hover:text-gray-800 transition-colors">Termos de Uso</a>
                    <a href="#" className="hover:text-gray-800 transition-colors">Política de Privacidade</a>
                    <a href="#" className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                        <HelpCircle className="h-3.5 w-3.5" />
                        Ajuda
                    </a>
                </div>
                <p>© 2026 Meu Dinheiro. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
