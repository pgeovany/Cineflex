import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function OrderOverview() {

    const navigate = useNavigate();
    const location = useLocation();
    const info = location.state;

    function formatCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    return (
        <Container>
            <p>Pedido feito</p>
            <p>com sucesso!</p>
            <div>
                <h2>Filme e sessão</h2>
                <p>{info.movie}</p>
                <p>{info.date} - {info.time}</p>
            </div>
            <div>
                <h2>Ingressos</h2>
                {info.seats.map((seat, index) => <p key={index}>Assento {seat}</p>)}
            </div>
            <div>
                <h2>Comprador</h2>
                <p>Nome: {info.name}</p>
                <p>CPF: {formatCPF(info.cpf)}</p>
            </div>
            <Button onClick={() => navigate("/")}>Voltar para home</Button>
        </Container>
    );
}

const Container = styled.div`
    font-family: 'Roboto', sans-serif;
    margin-top: 96px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    color: #293845;

    p {
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        color: #247A6B;
    }

    >div {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        margin-left: 24px;

        p {
            font-size: 22px;
            text-align: left;
            color: #293845;
            font-weight: 400;
            margin-top: 2px;
        }
    }

    h2 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
    }
`;

const Button = styled.button`
    width: 224px;
    height: 42px;
    margin-top: 50px;
    border: none;
    color: #ffffff;
    background-color:#E8833A;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    border-radius: 3px;
    align-self: center;

    &:hover {
        cursor: pointer;
    }
`;