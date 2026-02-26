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
  const [capacidadeTotal, setCapacidadeTotal] = useState("")
  const [mapaUrl, setMapaUrl] = useState("");
  const [fotosTexto, setFotosTexto] = useState("");
  const [vagas, setVagas] = useState("");


  function handleSubmit(e) {
    e.preventDefault();

    // Verifica se os campos estão em branco e se o id do evento for indefinido (evento não selecionado para editar)
    if ((!titulo || !data || !local || !descricao || !capacidadeTotal || !mapaUrl || !fotosTexto) && eventoId === undefined) {
      alert("Preencha todos os campos.");
      return;
    }

    // Verificação de editar o evento, caso esteja um evento selecionado
    if (eventoId !== undefined) {
      const form = document.getElementById("formularioCadastro")
      const elementos = form.elements

      // Percorre os elementos e verifica se eles estão em branco, caso estejam em branco ele apenas mantém o valor atual, caso não esteja, ele atualiza com o valor colocado no campo
      for (let i = 0; i < elementos.length; i++) {
        elementos[i].name === "titulo" && elementos[i].value !== "" ? eventos[eventoId - 1].titulo = titulo : eventos[eventoId - 1].titulo = eventos[eventoId - 1].titulo
        elementos[i].name === "data" && elementos[i].value !== "" ? eventos[eventoId - 1].data = data : eventos[eventoId - 1].data = eventos[eventoId - 1].data
        elementos[i].name === "local" && elementos[i].value !== "" ? eventos[eventoId - 1].local = local : eventos[eventoId - 1].local = eventos[eventoId - 1].local
        elementos[i].name === "descricao" && elementos[i].value !== "" ? eventos[eventoId - 1].descricao = descricao : eventos[eventoId - 1].descricao = eventos[eventoId - 1].descricao
        if (elementos[i].name === "status" && elementos[i].checked === true) { eventos[eventoId - 1].status = elementos[i].value }
      }
      eventos[eventoId - 1].status = status
    }

    // Caso não tenha um evento selecionado
    else {
      onAdd({ titulo, data, local, descricao, status, mapaUrl, fotosTexto, capacidadeTotal, vagas });
      setVagas(capacidadeTotal)
    }

    const textArea = document.getElementById("fotosArea");
    const linhas = textArea.value.split(/\r?\n/);

    
    navigate("/evento");

  }

  // Função para limpar os campos do formulário
  function limparCampos() {
    const form = document.getElementById("formularioCadastro")
    const elementos = form.elements;
    
    // Limpar valores colocados
    setData("")
    setTitulo("")
    setLocal("")
    setDescricao("")
    setFotosTexto("")
    setCapacidadeTotal("")
    setMapaUrl("")
    
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
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Demo do sistema" name="titulo" />
        </label>

        <label>
          Data
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} name="data" />
        </label>

        <label>
          Local
          <input type="input" value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Ex: Laboratório" name="local" />
        </label>

        <label>
          Descrição
          <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Testar se o sistema esta funcionando" name="descricao" />
        </label>

        <label>
          Status <br />
          Aberto
          <input value="Aberto" type="radio" name="status" onChange={(e) => setStatus(e.target.value)} />
          Lotado
          <input value="Lotado" type="radio" name="status" onChange={(e) => setStatus(e.target.value)} />
        </label>

        <label>
          Capacidade total
          <input type="number" min="0" value={capacidadeTotal} name="capacidade" onChange={(e) => setCapacidadeTotal(e.target.value)}/>
        </label>
        
        <label>
          Url mapa
          <input type="text" value={mapaUrl} name="mapa" onChange={(e) => setMapaUrl(e.target.value)}/>
        </label>
        
        <label>
          Fotos
          <textarea type="number" value={fotosTexto} name="fotos" onChange={(e) => setFotosTexto(e.target.value)} className="areaText" id="fotosArea"/>
        </label>

        <div className="row">
          <button className="btn" type="submit">Salvar</button>
          <button className="btn ghost" type="button" onClick={() => navigate("/evento")}>
            Cancelar
          </button>
          <button className="btn danger" type="button" onClick={() => limparCampos()}>
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