import { useNavigate, useParams } from "react-router-dom";

export default function EventoDetalhes({ eventos }) {

    const { eId } = useParams();
    const navigate = useNavigate();

    const voltar = () => (
        navigate("../evento")
    )

    return (
        <div>
            <h1>Informações sobre o evento</h1>
            <div className="informacoes">
                Titulo: <big>{eventos[eId - 1].titulo}</big>
                <p></p>
                Data: <strong>{eventos[eId - 1].data}</strong>
                <p></p>
                Local: <strong>{eventos[eId - 1].local}</strong>
                <p></p>
                Descrição: <strong>{eventos[eId - 1].descricao}</strong>
                <p></p>
                Status: <strong>{eventos[eId - 1].status}</strong>
            </div>
            <p></p>
            <button className="btn ghost" onClick={() => voltar()}>Voltar</button>
        </div>
    );
}