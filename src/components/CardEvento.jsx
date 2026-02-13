import React from "react";
import {useNavigate } from "react-router-dom";
import abertoImg from '../Imagens/Aberto.png'
import lotadoImg from '../Imagens/Lotado.png'

export default function CardEvento({ evento, onRemover }) {

  const navigate = useNavigate()

  const info = () => {
    navigate('../evento/' + evento.id)
  }
  const edit = (eventoId) => {
    navigate('../cadastrar', {state : {eventoId}})
  }

  // Mudar de acordo com aberto ou lotado
  let badge
  evento.status === "Aberto" ? badge = abertoImg : badge = lotadoImg

  return (
    <article className="card" >
      <div onClick={info}>
        <h3>{evento.titulo}</h3>
        <p className="muted">
          {evento.data} • {evento.local}
          <br />
          <br></br>
          {evento.descricao}
          <br />
          <img src={badge} alt=""/>
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