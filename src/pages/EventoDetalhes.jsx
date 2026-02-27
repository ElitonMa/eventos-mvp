import { useNavigate, useParams } from "react-router-dom";

export default function EventoDetalhes({ eventos }) {

    // Recebe o id do evento através dos parametros
    const { eId } = useParams();
    const navigate = useNavigate();

    const voltar = () => (
        navigate("../evento")
    )
    
    return (
        <div>
            <h1>Informações sobre o evento</h1>
            <div className="informacoes">
                {/* Mostra o titulo, data, local, descrição e status do evento selecionado */}
                Titulo: <big>{eventos.find(e => e.id === Number(eId)).titulo}</big>
                <p></p>
                Data: <strong>{eventos.find(e => e.id === Number(eId)).data}</strong>
                <p></p>
                Local: <strong>{eventos.find(e => e.id === Number(eId)).local}</strong>
                <p></p>
                Descrição: <strong>{eventos.find(e => e.id === Number(eId)).descricao}</strong>
                <p></p>
                Status: <strong>{eventos.find(e => e.id === Number(eId)).status}</strong>
                <p></p>
                Capacidade: <strong>{eventos.find(e => e.id === Number(eId)).capacidadeTotal}</strong>
                <p></p>
                Vagas restantes: <strong>{eventos.find(e => e.id === Number(eId)).vagas}</strong>
                <p></p>
                {/* eslint-disable-next-line */}
                Mapa: <br /><iframe src={eventos.find(e => e.id === Number(eId)).mapaUrl} width="615" height="350" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" ></iframe>
                <p></p>
                Fotos:
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {eventos.find(e => e.id === Number(eId)).fotos?.map((url, index) => (
                    <img
                    key={index}
                    src={url}
                    alt={`Foto ${index + 1}`}
                    width="200"
                    onError={(e) => e.target.style.display = "none"} 
                    />
                ))}
                </div>  
            </div>
            <p></p>
            <button className="btn ghost" onClick={() => voltar()}>Voltar</button>
        </div>
    );
}