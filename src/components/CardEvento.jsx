import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Badge } from "react-bootstrap";

export default function CardEvento({ evento, onRemover }) {

  const navigate = useNavigate()


  
  // Navega até EventoDetalhes, mandando o id para mostrar as informações correspondente
  const info = () => {
    navigate('../evento/' + evento.id)
  }

  // Ao clicar no botão de editar, navega para a página de cadastro mandando o id do evento para poder edita-lo
  const edit = (eId) => {
    navigate('../cadastrar', { state: { eId } })
  }
  
  // Mudar para aberto, se estiver aberto, ou lotado caso não

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
          <Icon icon="material-symbols:person" fontSize={20} inline={true}></Icon> {evento.vagas}
          <br />
          <Badge className={evento.status === "Aberto" ? "badge-bt-success" : "badge-bt-danger"}>{evento.status}</Badge>
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