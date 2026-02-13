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
    { id: 1, titulo: "Reunião do Projeto", data: "2026-02-12", local: "Sala 2", descricao: "Reunião para discutir mais a fundo sobre o projeto", status: "Lotado" },
    { id: 2, titulo: "Review da Sprint", data: "2026-02-13", local: "Auditório", descricao: "Revisão de o que aprendemos na Sprint de 05/02 ", status: "Aberto" },
    { id: 3, titulo: "Planning da Próxima Sprint", data: "2026-02-14", local: "Sala 1", descricao: "Planejamento das tarefas para a próxima sprint", status: "Aberto" },
    { id: 4, titulo: "Apresentação ao Cliente", data: "2026-02-15", local: "Sala de Conferência", descricao: "Apresentação dos resultados do projeto ao cliente", status: "Aberto" },
    { id: 5, titulo: "Workshop de React", data: "2026-02-16", local: "Lab de Informática", descricao: "Workshop sobre melhores práticas em React", status: "Aberto" },
    { id: 6, titulo: "1:1 com Gerente", data: "2026-02-17", local: "Escritório", descricao: "Reunião individual para discussão de desempenho", status: "Aberto" },
    { id: 7, titulo: "Alinhamento de Arquitetura", data: "2026-02-18", local: "Sala 3", descricao: "Discussão sobre a arquitetura e decisões técnicas", status: "Aberto" },
    { id: 8, titulo: "Retrospectiva da Sprint", data: "2026-02-19", local: "Auditório", descricao: "Análise do que funcionou bem e o que pode melhorar", status: "Aberto" },
    { id: 9, titulo: "Defesa do Projeto Final", data: "2026-02-20", local: "Auditório Principal", descricao: "Apresentação final do projeto com defesa técnica", status: "Aberto" },
  ]);

  function adicionarEvento(novo) {
    const eventoComId = { id: Date.now(), ...novo };
    setEventos((lista) => [eventoComId, ...lista]);
  }

  function removerEvento(id) {
    setEventos((lista) => lista.filter((e) => e.id !== id));
  }

  const tamanho = (eventos.length >= 0) ? eventos.length - 1 : null

  return (
    <div className="app">
      <Header />
      <Menu />

      <main className="conteudo-principal">
        <Routes>
          <Route path="/" element={<Home total={eventos.length} ultTitulo={eventos[tamanho]?.titulo} />} />
          <Route path="/evento" element={<Evento eventos={eventos} onRemover={removerEvento} titulo={eventos.titulo} />} />
          <Route path="/cadastrar" element={<CadastroEvento onAdd={adicionarEvento} eventos={eventos} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/evento/:eId" element={<EventoDetalhes eventos={eventos} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}