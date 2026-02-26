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
                Titulo: <big>{eventos[eId - 1].titulo}</big>
                <p></p>
                Data: <strong>{eventos[eId - 1].data}</strong>
                <p></p>
                Local: <strong>{eventos[eId - 1].local}</strong>
                <p></p>
                Descrição: <strong>{eventos[eId - 1].descricao}</strong>
                <p></p>
                Status: <strong>{eventos[eId - 1].status}</strong>
                <p></p>
                Capacidade: <strong>{eventos[eId - 1].capacidadeTotal}</strong>
                <p></p>
                Vagas restantes: <strong>{eventos[eId - 1].vagas}</strong>
                <p></p>
                Mapa: <iframe src={eventos[eId - 1].mapaUrl} width="250" height="150" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <p></p>
                Fotos: <strong><img src={eventos[eId - 1].fotosTexto}></img></strong>
            </div>
            <p></p>
            <button className="btn ghost" onClick={() => voltar()}>Voltar</button>
        </div>
    );
}