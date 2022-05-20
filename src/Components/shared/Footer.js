import styled from "styled-components";

export default function Footer({title, url, day, time}) {
    return (
        <Container>
            <MoviePoster>
                <img src={url} alt={title}/>
            </MoviePoster>
            <MovieInfo>
                <h1>{title}</h1>
                {day && time ? <h1>{day} - {time}</h1> : null}
            </MovieInfo>
        </Container>
    );
}

const Container = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 118px;
    width: 100%;
    padding-left: 10px;
    background-color: #DFE6ED;
    border: 1px solid #9EADBA;
`;

const MoviePoster = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 90px;
    background-color: #ffffff;
    margin-right: 14px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;

    img {
        width: 84%;
        height: 88%;
    }
`;

const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 22px;
        color: #293845;
    }
`;