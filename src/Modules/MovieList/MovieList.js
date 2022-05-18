import { useState, useEffect } from "react";
import axios from  "axios";
import "./style.css"

export default function MovieList() {

    const[movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(answer => {
            setMovies([...answer.data]);
        })
    }, []);

    return (
        <div className="container">
            <p>Selecione o filme</p>
            <div className="movieList">
                {movies.map(movie => <Movie key={movie.id} image={movie.posterURL} title={movie.title}/>)}
            </div>
        </div>
    );
}

function Movie({image, title}) {
    return (
        <div className="movieBox">
            <img src={image} alt={title}/>
        </div>
    );
}