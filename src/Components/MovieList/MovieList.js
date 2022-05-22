import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from  "axios";
import styled from "styled-components";

export default function MovieList() {

    const[movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(answer => {
            setMovies([...answer.data]);
        }).catch(() => console.log("Erro ao carregar a lista de filmes!"));;
    }, []);

    return (
        <Container>
            <p>Selecione o filme</p>
            <ListOfMovies>
                {movies.length !== 0 ?
                    movies.map(movie => <Movie id={movie.id} image={movie.posterURL} title={movie.title} key={movie.id}/>)
                    :
                    "CARREGANDO A LISTA DE FILMES"
                }
            </ListOfMovies>
        </Container>
    );
}

function Movie({id, image, title}) {
    return (
        <Link to={`/sessoes/${id}`}>
            <MoviePoster>
                <img src={image} alt={title}/>
            </MoviePoster>
        </Link>
    );
}


//STYLES
const Container = styled.div`
    font-family: 'Roboto', sans-serif;
    margin-top: 66px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;

    p {
        margin-top: 50px;
        font-size: 24px;
    }
`;

const ListOfMovies = styled.div`
    margin: 36px 20px 0 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`;

const MoviePoster = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 146px;
    height: 210px;
    margin-bottom: 10px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;

    img {
        width: 90%;
        height: 92%;
    }

    img:hover{
        filter: brightness(110%);
    }

    &:hover {
        cursor: pointer;
    }
`;