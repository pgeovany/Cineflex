import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import MovieList from "./MovieList/MovieList";
import "../assets/css/reset.css"

export default function App() {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MovieList />} />
            </Routes>
        </BrowserRouter>
    );
}