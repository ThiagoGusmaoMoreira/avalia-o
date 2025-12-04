import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      
      {/* Ícone Hero */}
      <div className="mb-8 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white p-6 rounded-full shadow-xl">
          <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
      </div>

      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 tracking-tight">
        Controle de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Hardware</span>
      </h1>
      
      <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
        Gerencie seu parque tecnológico com eficiência. Cadastre máquinas, monitore velocidades e organize seu inventário em um só lugar.
      </p>
      
      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-5 w-full max-w-md mx-auto">
        <Link 
          href="/computadores/lista" 
          className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl font-bold flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
          Ver Inventário
        </Link>
        <Link 
          href="/computadores/new" 
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-xl hover:shadow-blue-500/40 font-bold flex items-center justify-center gap-2 transform hover:-translate-y-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Novo Cadastro
        </Link>
      </div>
    </div>
  );
}