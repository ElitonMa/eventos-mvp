import React from "react";
import {useNavigate } from "react-router-dom";

export default function CardEvento({ evento, onRemover }) {

  const navigate = useNavigate()

  const info = () => {
    navigate('../evento/' + evento.id)
  }
  const edit = (eventoId) => {
    navigate('../cadastrar', {state : {eventoId}})
  }
  

  return (
    <article className="card" >
      <div onClick={info}>
        <h3>{evento.titulo}</h3>
        <p className="muted">
          {evento.data} • {evento.local}
          
          <br></br>
          {evento.descricao}
        </p>
      </div>

      <button className="btn danger" onClick={() => onRemover(evento.id)}>
        Remover
      </button>
      <button className="btn" onClick={() => edit(evento.id)}>
        Editar
      </button>
    </article>
  );
}