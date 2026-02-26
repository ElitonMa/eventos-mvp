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
    { id: 1, titulo: "Reunião do Projeto", data: "2026-02-12", local: "Sala 2", descricao: "Reunião para discutir mais a fundo sobre o projeto", status: "Lotado", capacidadeTotal: 10, vagas: 10, mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14206.581685792531!2d-52.64834560324943!3d-27.104473999061913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e4b44f71ad42f7%3A0x95575390588d7edd!2sSENAI%20Chapec%C3%B3!5e0!3m2!1spt-BR!2sbr!4v1772133380727!5m2!1spt-BR!2sbr", fotosTexto: "https://riotron.com.br/wp-content/uploads/2017/06/negocio_vulneravel.jpg"},
    { id: 2, titulo: "Review da Sprint", data: "2026-02-13", local: "Auditório", descricao: "Revisão de o que aprendemos na Sprint de 05/02 ", status: "Aberto", capacidadeTotal: 16, vagas:0, mapaUrl:"https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1055.9239585638175!2d-52.60846438809633!3d-27.10304726754328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smaps!5e0!3m2!1spt-BR!2sbr!4v1772133641906!5m2!1spt-BR!2sbr", fotosTexto: "https://www.visual-paradigm.com/servlet/editor-content/scrum/what-is-sprint-in-scrum/sites/7/2018/12/scrum-sprint.png" },
  ]);

  function adicionarEvento(novo) {
    const eventoComId = { id: Date.now(), ...novo };
    setEventos((lista) => [eventoComId, ...lista]);
  }

  function removerEvento(id) {
    setEventos((lista) => lista.filter((e) => e.id !== id));
  }

  // Recebe o tamanho dos eventos, sendo nulo caso não tenha tamanho
  const tamanho = (eventos.length >= 0) ? eventos.length - 1 : null

  return (
    <div className="app">
      <Header />
      <Menu />

      <main className="conteudo-principal">
        <Routes>
          {/* Envia para a página home o último evento registrado */}
          <Route path="/" element={<Home total={eventos.length} ultTitulo={eventos[tamanho]?.titulo} />} />
          <Route path="/evento" element={<Evento eventos={eventos} onRemover={removerEvento} titulo={eventos.titulo} />} />
          <Route path="/cadastrar" element={<CadastroEvento onAdd={adicionarEvento} eventos={eventos} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* Rota de detalhe para os eventos */}
          <Route path="/evento/:eId" element={<EventoDetalhes eventos={eventos} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}