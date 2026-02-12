import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

import Home from "./pages/Home";
import Evento from "./pages/Evento";
import CadastroEvento from "./pages/CadastroEvento";
import EventoDetalhes from "./pages/EventoDetalhes";

export default function App() {
  const [eventos, setEventos] = useState([
    { id: 1, titulo: "Reunião do Projeto", data: "2026-02-12", local: "Sala 2", descricao: "Reunião para discutir mais a fundo sobre o projeto" },
    { id: 2, titulo: "Review da Sprint", data: "2026-02-13", local: "Auditório", descricao: "Revisão de o que aprendemos na Sprint" },
  ]);

  function adicionarEvento(novo) {
    const eventoComId = { id: Date.now(), ...novo };
    setEventos((lista) => [eventoComId, ...lista]);
  }

  function removerEvento(id) {
    setEventos((lista) => lista.filter((e) => e.id !== id));
  }

  const tamanho = (eventos.length >= 0) ? eventos.length-1 : null

  return (
    <div className="app">
      <Header />
      <Menu />
      

      <main className="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home total={eventos.length} ultTitulo={eventos[tamanho]?.titulo} />} />
          <Route path="/evento" element={<Evento eventos={eventos} onRemover={removerEvento} titulo={eventos.titulo} />} />
          <Route path="/cadastrar" element={<CadastroEvento onAdd={adicionarEvento} eventos={eventos}/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/evento/:eId" element={<EventoDetalhes eventos={eventos} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}