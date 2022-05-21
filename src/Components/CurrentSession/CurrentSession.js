import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../shared/Footer";
import styled from "styled-components";
import "./style.css"

export default function CurrentSession() {

    const { sessionID } = useParams();
    const [currentSession, setCurrentSession] = useState([]);

    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`);
        promise.then(answer => {
            setCurrentSession({...answer.data});
        });
    }, [sessionID]);

    if(currentSession.length !== 0) {
        console.log(currentSession);
    }

    return(
        <>
            <Container>
                <p>Selecione o(s) assento(s)</p>
                <SeatsList>
                    {!currentSession.length !== 0 && currentSession.seats ?
                        currentSession.seats.map((seat, index) => 
                        <Seat 
                            key={index}
                            id={seat.id}
                            number={seat.name}
                            isAvailable={seat.isAvailable}
                        />) 
                       : 
                       null
                    }
                </SeatsList>
                <Subtitles />
                <Form />
            </Container>
            { currentSession.length !== 0 ?
                <Footer
                    title={currentSession.movie.title}
                    url={currentSession.movie.posterURL}
                    day={currentSession.day.weekday}
                    time={currentSession.name}
                />    
                : null
            }
        </>
    );
}

function Seat({id, number, isAvailable}) {
    return(
        <IndividualSeat isAvailable={isAvailable} onClick={() => console.log(id)}>
            {number < 10 ? `0${number}` : number}
        </IndividualSeat>
    );
}

function Form() {
    return (
        <UserInfo>
            <form>
                <label for="name">Nome do comprador:</label>
                <Input type="text" id="name" placeholder="Digite seu nome..."></Input>
                <label for="name">CPF do comprador:</label>
                <Input type="number" placeholder="Digite seu CPF..."></Input>
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
    background-color: ${props => props.isAvailable ? "#C3CFD9" : "#FBE192"};
    border: 1px solid ${props => props.isAvailable ? "#C3CFD9" : "#F7C52B"};
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