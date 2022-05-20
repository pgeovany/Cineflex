import { useState, useEffect } from "react";
import axios from  "axios";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";

export default function Sessions() {
    const {movieID} = useParams();
    const [sessions, setSessions] = useState([]);
    
    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieID}/showtimes`);
        promise.then(answer => {
            setSessions(answer.data.days);
        });
    }, [movieID])

    return(
        <Container>
            <p>Selecione o horário</p>
            {sessions.length !== 0? 
                sessions.map(session => <AvailableSessions key={session.id} date={session.date} day={session.weekday} times={session.showtimes}/>)
                :
                null
            }
        </Container>
    );
}

function AvailableSessions({date, day, times, id}) {
    return (
        <div>
            <h2>{day} - {date}</h2>
            <Times>
                {times.map(time => 
                    <Link key={time.id} to={`/assentos/${time.id}`}>
                        <Button key={time.id}>{time.name}</Button>
                    </Link>
                )}
            </Times>
        </div>
    );
}

//STYLES
const Container = styled.div`
    font-family: 'Roboto', sans-serif;
    margin-top: 66px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    color: #293845;

    p {
        text-align: center;
        margin-top: 50px;
        font-size: 24px;
    }

    >div {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        margin-left: 24px;
    }

    h2 {
        font-size: 20px;
        font-weight: 400;
    }
`;

const Button = styled.button`
    width: 84px;
    height: 44px;
    border: none;
    color: #ffffff;
    background-color:#E8833A;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    border-radius: 3px;
    margin-right: 8px;
`;

const Times = styled.div`
    display:flex;
    margin-top: 22px;
`;