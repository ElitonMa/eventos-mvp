import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { Icon } from "@iconify/react";

export default function CadastroEvento({ onAdd, eventos }) {

  const location = useLocation()
  const { eId } = location.state || {}
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [capacidadeTotal, setCapacidadeTotal] = useState("")
  const [mapaUrl, setMapaUrl] = useState("");
  const [fotosTexto, setFotosTexto] = useState("");
  const eventoIndex = eventos.findIndex(e => e.id === Number(eId));

  function handleSubmit(e) {
    e.preventDefault();

    // Verifica se os campos estão em branco e se o id do evento for indefinido (evento não selecionado para editar)
    if ((!titulo || !data || !local || !descricao || !capacidadeTotal || !mapaUrl || !fotosTexto) && eId === undefined) {
      alert("Preencha todos os campos.");
      return;
    }

    // Verificação de editar o evento, caso esteja um evento selecionado
    if (eId !== undefined) {
      const form = document.getElementById("formularioCadastro")
      const elementos = form.elements

      // Percorre os elementos e verifica se eles estão em branco, caso estejam em branco ele apenas mantém o valor atual, caso não esteja, ele atualiza com o valor colocado no campo
      for (let i = 0; i < elementos.length; i++) {
        elementos[i].name === "titulo" && elementos[i].value !== "" ? eventos[eventoIndex].titulo = titulo : eventos[eventoIndex].titulo = eventos[eventoIndex].titulo
        elementos[i].name === "data" && elementos[i].value !== "" ? eventos[eventoIndex].data = data : eventos[eventoIndex].data = eventos[eventoIndex].data
        elementos[i].name === "local" && elementos[i].value !== "" ? eventos[eventoIndex].local = local : eventos[eventoIndex].local = eventos[eventoIndex].local
        elementos[i].name === "descricao" && elementos[i].value !== "" ? eventos[eventoIndex].descricao = descricao : eventos[eventoIndex].descricao = eventos[eventoIndex].descricao
        elementos[i].name === "capacidade" && elementos[i].value !== "" ? eventos[eventoIndex].capacidadeTotal = capacidadeTotal : eventos[eventoIndex].capacidadeTotal = eventos[eventoIndex].capacidadeTotal
        elementos[i].name === "mapa" && elementos[i].value !== "" ? eventos[eventoIndex].mapaUrl = mapaUrl : eventos[eventoIndex].mapaUrl = eventos[eventoIndex].mapaUrl
        elementos[i].name === "fotos" && elementos[i].value !== "" ? eventos[eventoIndex].fotos = fotosTexto : eventos[eventoIndex].fotos = eventos[eventoIndex].fotos
        if (elementos[i].name === "status" && elementos[i].checked === true) { eventos[eventoIndex].status = elementos[i].value }
      }
      eventos[eventoIndex].status = status
    }

    // Caso não tenha um evento selecionado
    else {
      const textArea = document.getElementById("fotosArea");

      // Separa as fotos em linhas e remove as linhas em branco
      const fotos = textArea.value.split(/\r?\n/).filter(url => url.trim() !== "");

      onAdd({ titulo, data, local, descricao, status, mapaUrl, fotosTexto, capacidadeTotal, vagas: capacidadeTotal, fotos });
    }

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
          <strong>Título </strong>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder={eId === undefined ? "Ex: Demo de sistemas" : eventos[eventoIndex].titulo} name="titulo" />
        </label>

        <label>
          <strong>Data</strong>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} name="data" />
        </label>

        <label>
          <strong>Local </strong>
          <input type="input" value={local} onChange={(e) => setLocal(e.target.value)} placeholder={eId === undefined ? "Ex: Laboratório" : eventos[eventoIndex].local} name="local" />
        </label>

        <label>
          <strong>Descrição </strong>
          <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder={eId === undefined ? "Ex: Testar se o sistema esta funcionando" : eventos[eventoIndex].descricao} name="descricao" />
        </label>

        <label id="status-label">
          <strong> Status </strong>
          <p></p>
          Aberto
          <p></p>
          <input value="Aberto" type="radio" name="status" onChange={(e) => setStatus(e.target.value)} className="radio-status" />
          <Icon icon="mynaui:door-open" inline fontSize={30}></Icon>
          <br />
          Lotado
          <p></p>
          <input value="Lotado" type="radio" name="status" onChange={(e) => setStatus(e.target.value)} className="radio-status" />
          <Icon icon="mynaui:door-closed-locked" inline fontSize={30}></Icon>
        </label>

        <label>
          <strong>Capacidade total </strong>
          <input type="number" min="0" value={capacidadeTotal} name="capacidade" onChange={(e) => setCapacidadeTotal(e.target.value)} placeholder={eId === undefined ? "10" : eventos[eventoIndex].capacidadeTotal} />
        </label>

        <label>
          <strong>Url do mapa </strong>
          <input type="text" value={mapaUrl} name="mapa" onChange={(e) => setMapaUrl(e.target.value)} placeholder={eId === undefined ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4474.925816263736!2d-52.645341755023836!3d-27.1011453570486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e4b44f71ad42f7%3A0x95575390588d7edd!2sSENAI%20Chapec%C3%B3!5e0!3m2!1spt-BR!2sbr!4v1772214399667!5m2!1spt-BR!2sbr" : eventos[eventoIndex].mapaUrl} />
        </label>

        <label>
          <strong>Fotos
            (Use links) </strong>
          <textarea type="number" value={fotosTexto} name="fotos" onChange={(e) => setFotosTexto(e.target.value)} className="areaText" id="fotosArea" placeholder={eId === undefined ? "https://picsum.photos/200" : eventos[eventoIndex].fotos} />
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