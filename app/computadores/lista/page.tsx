'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

// ⚠️ SUA URL (Mantive a mesma, mas verifique se mudou)
const API_URL = "https://693197d911a8738467cfa829.mockapi.io/computadores"; 

interface Computador {
  id: string;
  marca: string;
  velocidade: number;
}

export default function ListaComputadores() {
  const [computadores, setComputadores] = useState<Computador[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setComputadores(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function excluir(id: string) {
    if (confirm("Deseja realmente remover este equipamento do sistema?")) {
      const backup = [...computadores];
      setComputadores(prev => prev.filter(pc => pc.id !== id)); // Remove instantâneo visualmente
      
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      } catch (error) {
        alert("Erro ao excluir.");
        setComputadores(backup); // Devolve se der erro
      }
    }
  }

  // Loading com Spinner Azul
  if (loading) return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 font-medium">Acessando banco de dados...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Inventário de Máquinas</h1>
          <p className="text-slate-500 mt-1">Total de equipamentos: <span className="font-bold text-blue-600">{computadores.length}</span></p>
        </div>
        <Link 
          href="/computadores/new" 
          className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl font-bold flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Adicionar Novo
        </Link>
      </div>

      {computadores.length === 0 ? (
        <div className="text-center p-16 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="bg-slate-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">Nenhum computador encontrado</h3>
          <p className="text-slate-500 mt-2">Comece cadastrando o primeiro item do estoque.</p>
        </div>
      ) : (
        /* GRID DE CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {computadores.map((pc) => (
            <div key={pc.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-300 overflow-hidden flex flex-col">
              
              {/* Topo do Card (Azul Escuro) */}
              <div className="bg-slate-900 p-4 flex justify-between items-center">
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                   <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="text-xs font-mono text-slate-400 border border-slate-700 px-2 py-1 rounded">ID: {pc.id}</span>
              </div>

              {/* Corpo do Card */}
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold text-slate-800 mb-4 truncate">{pc.marca}</h3>
                
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  <div>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Velocidade</p>
                    <p className="text-lg font-bold text-slate-900">{pc.velocidade} <span className="text-sm font-normal text-slate-500">GHz</span></p>
                  </div>
                </div>
              </div>

              {/* Rodapé do Card */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => excluir(pc.id)}
                  className="text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 border border-red-200 hover:border-red-500"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}