import React from "react";
import { useNavigate } from "react-router-dom";
import abertoImg from '../Imagens/Aberto.png'
import lotadoImg from '../Imagens/Lotado.png'

export default function CardEvento({ evento, onRemover }) {

  const navigate = useNavigate()


  
  // Navega até EventoDetalhes, mandando o id para mostrar as informações correspondente
  const info = () => {
    navigate('../evento/' + evento.id)
  }

  // Ao clicar no botão de editar, navega para a página de cadastro mandando o id do evento para poder edita-lo
  const edit = (eventoId) => {
    navigate('../cadastrar', { state: { eventoId } })
  }

  // Mudar para aberto, se estiver aberto, ou lotado caso não
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
          {/* Mostra a descricao do evento */}
          {evento.descricao}
          <br />
          <img src={badge} alt="" />
        </p>
      </div>
      <div className="botoes">
        <button className="btn btnEvento"  onClick={() => edit(evento.id)}>
          Editar
        </button>
        <button className="btn danger btnEvento" onClick={() => onRemover(evento.id)}>
          Remover
        </button>
      </div>
    </article>
  );
}