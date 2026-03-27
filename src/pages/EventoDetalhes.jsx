import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function EventoDetalhes({ eventos }) {

    // Recebe o id do evento através dos parametros
    const { eId } = useParams();
    const navigate = useNavigate();
    const [evento, setEvento] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/eventos/${eId}`)
          .then(res => res.json())
          .then(data => {
            setEvento(data);
          })
          .catch(err => console.error("Erro:", err));
      }, [eId]);

    const voltar = () => (
        navigate("../evento")
    )

    if (!evento) return <p>Carregando...</p>;

    return (
        <div>
            <h1>Informações sobre o evento</h1>
            <div className="informacoes">
                {/* Mostra o titulo, data, local, descrição e status do evento selecionado */}
                Titulo: <big>{evento.titulo}</big><p></p>
                Data: <strong>{evento.data}</strong><p></p>
                Local: <strong>{evento.local}</strong><p></p>
                Descrição: <strong>{evento.descricao}</strong><p></p>
                Status: <strong>{evento.status ? "Aberto" : "Lotado"}</strong><p></p>
                Capacidade: <strong>{evento.capacidade_total}</strong><p></p>
                Vagas restantes: <strong>{evento.vagas_restantes}</strong><p></p>
                Mapa: <br />
                {/* eslint-disable-next-line */}
                <iframe src={evento.mapa_url} width="615" height="350" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <p></p>
                Fotos:
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {evento.fotos?.map((url, index) => (
                    <img key={index} src={url} alt={`Foto ${index + 1}`} width="200"
                    onError={(e) => e.target.style.display = "none"} />
                ))}
                </div>  
            </div>
            <p></p>
            <button className="btn ghost" onClick={() => voltar()}>Voltar</button>
        </div>
    );
}