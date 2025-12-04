'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ⚠️ SUA URL MOCKAPI
const API_URL = "https://693197d911a8738467cfa829.mockapi.io/computadores"; 

export default function NewComputer() {
  const router = useRouter();
  const [marca, setMarca] = useState("");
  const [velocidade, setVelocidade] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const pcData = {
      marca: marca,
      velocidade: parseFloat(velocidade)
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pcData),
      });

      if (response.ok) {
        alert("Computador cadastrado com sucesso!");
        router.push("/computadores/lista");
        router.refresh();
      } else {
        alert("Erro ao cadastrar.");
      }
    } catch (error) {
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">Novo Equipamento</h2>
          <p className="text-slate-500 mt-2">Preencha os dados técnicos abaixo</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Input Marca */}
          <div className="relative">
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Marca do Fabricante</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              </div>
              <input
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium"
                placeholder="Ex: Dell Inspiron"
                required
              />
            </div>
          </div>

          {/* Input Velocidade */}
          <div className="relative">
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Velocidade (GHz)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <input
                type="number"
                step="0.1"
                value={velocidade}
                onChange={(e) => setVelocidade(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium"
                placeholder="Ex: 3.6"
                required
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <Link 
              href="/computadores/lista" 
              className="w-1/3 flex justify-center items-center py-4 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`w-2/3 flex justify-center items-center py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all
                ${loading 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transform hover:-translate-y-1"
                }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Salvando...
                </span>
              ) : (
                "Salvar Cadastro"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}