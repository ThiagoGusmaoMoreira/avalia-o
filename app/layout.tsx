import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PC Master | Gestão de TI",
  description: "Gerenciador de Estoque de Alta Performance",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 min-h-screen flex flex-col font-sans`}>
        
        {/* MENU: Fundo Preto com Detalhes Azuis */}
        <nav className="bg-slate-950 text-white shadow-2xl sticky top-0 z-50 border-b border-blue-900/30">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2.5 rounded-lg shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                PC <span className="text-blue-500">Master</span>
              </span>
            </Link>

            {/* Links de Navegação */}
            <div className="flex gap-6 items-center">
              <Link 
                href="/computadores/lista" 
                className="text-slate-300 hover:text-white font-medium transition-colors hover:border-b-2 border-blue-500 py-1"
              >
                Inventário
              </Link>
              <Link 
                href="/computadores/new" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5"
              >
                + Novo PC
              </Link>
            </div>
          </div>
        </nav>

        {/* Conteúdo Principal */}
        <main className="flex-grow container mx-auto px-6 py-10 animate-fadeIn">
          {children}
        </main>

        {/* Rodapé */}
        <footer className="bg-slate-950 border-t border-slate-800 py-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} PC Master System. <br/> 
            <span className="text-slate-600 text-xs">Desenvolvido com Next.js e Tailwind CSS.</span>
          </p>
        </footer>
      </body>
    </html>
  );
}