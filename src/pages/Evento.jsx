import React, { useState } from "react";
import CardEvento from "../components/CardEvento";

export default function Evento({ eventos, onRemover, titulo }) {

  const [tituloBusca, setTituloBusca] = useState("");

  function removerEventos() {
    for (let i = 0 ; i < eventos.length ; i++) {
      onRemover(eventos[i].id)
    }
  }

  return (
    <section className="stack">
      <h2>Eventos</h2>

      <label> Buscar por titulo
        <input type="text" value={tituloBusca} onChange={(e) => setTituloBusca(e.target.value)}></input>
      </label>

      {eventos.length === 0 ? (
        <p className="muted">Nenhum evento cadastrado. Vá em “Cadastrar”.</p>
      ) : (
        <div className="grid">
          {eventos.map((e) => (
            <CardEvento key={e.id} evento={e} onRemover={onRemover} />
          ))
          }
        </div>
      )}

      <button className="btn ghost" onClick={() => removerEventos()}>Remover todos</button>
    </section>
  );
}