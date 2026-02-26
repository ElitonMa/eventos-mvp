import { useState } from "react";
import CardEvento from "../components/CardEvento";

export default function Evento({ eventos, onRemover, titulo }) {

  // Percorre o array dos eventos e remove cada um
  function removerEventos() {
    for (let i = 0; i < eventos.length; i++) {
      onRemover(eventos[i].id)
    }
  }

  // Variaveis para os filtros
  const [filtroTitulo, setFiltroTitulo] = useState("")
  const [filtroLocal, setFiltroLocal] = useState("")

  // Recebe o filtro e mapeia apenas os eventos correspondente ao filtro
  const eventosFiltrados = eventos.filter((e) => e.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
    e.local.toLowerCase().includes(filtroLocal.toLowerCase()))

  return (
    <section className="stack">
      <h2>Eventos</h2>

      <div className="filtros-posicao">
        {/* Buscar por titulo */}
        <label> Buscar por titulo
          <input type="text" value={filtroTitulo} onChange={(e) => setFiltroTitulo(e.target.value)}></input>
        </label>

        <label> Filtrar por local
          <input type="text" value={filtroLocal} onChange={(e) => setFiltroLocal(e.target.value)} />
        </label>
      </div>

      {eventos.length === 0 ? (
        <p className="muted">Nenhum evento cadastrado. Vá em “Cadastrar”.</p>
      ) : (
        <div className="grid">
          {/* Mapeamento dos eventos filtrados */}
          {eventosFiltrados.map((e) => (
            <CardEvento key={e.id} evento={e} onRemover={onRemover} />
          ))
          }
        </div>
      )}

      {/* Botão para remover todos os eventos  */}
      <button className="btn danger" onClick={() => removerEventos()}>Remover todos</button>
    </section>
  );
}