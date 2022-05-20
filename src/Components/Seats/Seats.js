import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import axios from "axios";
//import styled from "styled-components";

export default function Seats() {

    const { sessionID } = useParams();
    const [seats, setSeats] = useState([]);

    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`);
        promise.then(answer => {
            setSeats({...answer.data});
        });
    }, [sessionID]);

    return(
        <>
            { seats.length !== 0 ?
                <Footer
                    title={seats.movie.title}
                    url={seats.movie.posterURL}
                    day={seats.day.weekday}
                    time={seats.name}
                />    
                : null
            }
        </>
    );
}
