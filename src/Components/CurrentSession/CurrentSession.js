import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../shared/Footer";
import styled from "styled-components";
import Loading from "../shared/Loading";
import "./style.css"

export default function CurrentSession() {

    const { sessionID } = useParams();
    const [currentSession, setCurrentSession] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCPF] = useState("");
    const navigate = useNavigate();

    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`);
        promise.then(answer => {
            setCurrentSession({...answer.data});
        }).catch(() => console.log("Erro ao carregar a lista de assentos!"));
    }, [sessionID]);


    function selectSeat(i, isAvailable, isSelected) {

        if(!isAvailable && !isSelected) {
            alert("Esse assento não está disponível!");
            return;
        }

        let newSeats = currentSession.seats.map((seat, index) => {
            if((seat.isAvailable && index === i) || (seat.isSelected && index === i)) {
                return {
                    ...seat,
                    isAvailable: !seat.isAvailable,
                    isSelected: !seat.isSelected
                }
            } 
            else {
                return {
                    ...seat,
                }
            }
        });
        setCurrentSession({
            ...currentSession,
            seats: [...newSeats]
        });
    }

    function buySeats(e) {
        e.preventDefault();
        const ids = [];
        const userSeats = [];

        currentSession.seats.map(seat => {
            if(seat.isSelected) {
                ids.push(seat.id);
                userSeats.push(seat.name);
                return true;
            }
            return false;   
        });

        if(ids.length === 0) {
            alert("Selecione pelo menos um assento!");
            return;
        }

        const order = {
            ids,
            name,
            cpf
        }
        const request = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", order);
        request.then(() => {
            navigate("/sucesso", {
                state: {
                    movie: currentSession.movie.title,
                    date: currentSession.day.date,
                    time: currentSession.name,
                    seats: userSeats,
                    name,
                    cpf
                }
            });
        }).catch(() => console.log("Erro ao reservar os assentos"));

    }

    return(
        <>
            <Container>
                <p>Selecione o(s) assento(s)</p>
                <SeatsList>
                    {currentSession.length !== 0 && currentSession.seats ?
                        currentSession.seats.map((seat, index) => 
                        <Seat 
                            index={index}
                            key={index}
                            id={seat.id}
                            number={seat.name}
                            isAvailable={seat.isAvailable}
                            isSelected={seat.isSelected}
                            selectSeat={selectSeat}
                        />) 
                       : 
                       null
                    }
                </SeatsList>
                {currentSession.seats ? 
                    <>
                        <Subtitles />
                        <Form submit={buySeats} name={name} setName={setName} cpf={cpf} setCPF={setCPF}/>
                    </>
                    :
                    <Loading />
                }
            </Container>
            { currentSession.length !== 0 ?
                <Footer
                    title={currentSession.movie.title}
                    url={currentSession.movie.posterURL}
                    day={currentSession.day.weekday}
                    time={currentSession.name}
                />    
                : 
                null
            }
        </>
    );
}

function Seat({index, id, number, isAvailable, isSelected, selectSeat}) {

    let background = "#FBE192";
    let border = "#F7C52B";

    if(isAvailable) {
        background = "#C3CFD9";
        border = "#808F9D";
    } else if(isSelected) {
        background = "#8DD7CF";
        border = "#45BDB0";
    }

    return(
        <IndividualSeat background={background} border={border} onClick={() => selectSeat(index, isAvailable, isSelected)}>
            {number < 10 ? `0${number}` : number}
        </IndividualSeat>
    );
}

function Form({submit, name, setName, cpf, setCPF}) {
    return (
        <UserInfo>
            <form onSubmit={submit}>

                <label htmlFor="name">Nome do comprador:</label>
                <Input required value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" id="name" placeholder="Digite seu nome..."></Input>

                <label htmlFor="cpf">CPF do comprador:</label>
                <Input required value={cpf} maxlength="11"
                    onChange={(e) => setCPF(e.target.value)}
                    type="number" id="cpf" placeholder="Digite seu cpf..."></Input>

                <div>
                    <Button type="submit">Reservar assento(s)</Button>
                </div>
            </form>
        </UserInfo>
    );
}

function Subtitles() {
    return(
        <TypeOfSeats>
            <div>
                <div className="subtitle selected"></div>
                <p>Selecionado</p>
            </div>
            <div>
                <div className="subtitle available"></div>
                <p>Disponível</p>
            </div>
            <div>
                <div className="subtitle ocupied"></div>
                <p>Indisponível</p>
            </div>
        </TypeOfSeats>
    );
}

//STYLES

const Container = styled.div`
    font-family: 'Roboto', sans-serif;
    margin-top: 66px;
    margin-bottom: calc(118px + 40px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    p {
        text-align: center;
        font-size: 24px;
        margin-top: 50px;
        color: #293845;
    }
`;

const SeatsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin-left: 20px;
    margin-top: 20px;
`;

const IndividualSeat = styled.div`
    height: 26px;
    width: 26px;
    background-color: ${props => props.background};
    border: 1px solid ${props => props.border};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    margin-right: 6px;
    margin-bottom: 18px;
`;

const TypeOfSeats = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 60%;

    p {
        font-size: 12px;
        margin-top: 0px;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const UserInfo = styled.div`
    margin-top: 40px;

    label, input {
        display: inline-block;
        margin-left: 5%;
    }

    label {
        font-size: 18px;
        color: #293845;
    }

    input {
        margin-top: 2px;
        margin-bottom: 10px;
    }

    div {
        display: flex;
        justify-content: center;
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

    &:hover {
        cursor: pointer;
    }
`;

const Input = styled.input`
    background-color: #FFFFFF;
    border: 1px solid #D4D4D4;
    border-radius: 3px;
    width: 90%;
    height: 51px;
    padding-left: 18px;
    font-size: 18px;

    ::placeholder {
        font-size: 18px;
        color: #AFAFAF;
    }
`;