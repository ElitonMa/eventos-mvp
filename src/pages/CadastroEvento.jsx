import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function CadastroEvento({ onAdd, eventos }) {

  const location = useLocation()
  const { eventoId } = location.state || {}

  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!titulo || !data || !local || !descricao) {
      alert("Preencha todos os campos.");
      return;
    }

    if (eventoId !== undefined) {
      eventos[eventoId-1].titulo = titulo
      eventos[eventoId-1].data = data
      eventos[eventoId-1].local = local
      eventos[eventoId-1].descricao = descricao
      eventos[eventoId-1].status = status
    }

    else {
      onAdd({ titulo, data, local, descricao });
    }
    navigate("/evento");
    
  }

  function limparCampos() {
    const form = document.getElementById("formularioCadastro")
    const elementos = form.elements;

    // Limpar valores colocados
    setData("")
    setTitulo("")
    setLocal("")
    setDescricao("")

    // Limpar cada valor do formulário
    for (let i = 0; i < elementos.length; i++) {
      if (elementos[i].type === "text" || elementos[i].type === "date") {
        elementos[i].value = ""
      }
    }
  }

  

  return (
    <section className="stack">
      <h2>Cadastrar Evento</h2>

      <form className="form" id="formularioCadastro" onSubmit={handleSubmit}>
        <label>
          Título
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Demo do sistema" />
        </label>

        <label>
          Data
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </label>

        <label>
          Local
          <input type="input" value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Ex: Laboratório" />
        </label>

        <label>
          Descrição
          <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Testar se o sistema esta funcionando" />
        </label>

        <label>
          Status <br />
          Aberto
          <input value="aberto"  type="radio" name="status" onChange={(e) => setStatus(e.target.value)} />
          Lotado
          <input value="lotado"  type="radio" name="status" onChange={(e) => setStatus(e.target.value)} />
        </label>

        <div className="row">
          <button className="btn" type="submit">Salvar</button>
          <button className="btn ghost" type="button" onClick={() => navigate("/evento")}>
            Cancelar
          </button>
          <button className="btn ghost" type="button" onClick={() => limparCampos()}>
            Limpar formulário
          </button>
        </div>
      </form>

      <p className="muted">
        Macete: input controlado = valor vem do state e muda no onChange.
      </p>
    </section>
  );
}