import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import MovieList from "./MovieList/MovieList";
import Sessions from "./Sessions/Sessions";
import CurrentSession from "./CurrentSession/CurrentSession";
import "../assets/css/reset.css"
import "../assets/css/style.css"

export default function App() {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MovieList />} />
                <Route path="/sessoes/:movieID" element={<Sessions />}/>
                <Route path="/assentos/:sessionID" element={<CurrentSession />} />
            </Routes>
        </BrowserRouter>
    );
}