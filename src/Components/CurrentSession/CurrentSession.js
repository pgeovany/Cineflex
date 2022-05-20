import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../shared/Footer";
import axios from "axios";
//import styled from "styled-components";

export default function CurrentSession() {

    const { sessionID } = useParams();
    const [currentSession, setCurrentSession] = useState([]);

    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`);
        promise.then(answer => {
            setCurrentSession({...answer.data});
        });
    }, [sessionID]);

    return(
        <>
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
