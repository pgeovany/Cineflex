import styled from "styled-components";

export default function Loading() {
    return (
        <Load>
            <img src="https://i.gifer.com/H0bj.gif" alt="Carregando"/>
            <h4>Carregando...</h4>
        </Load>
    );
}

const Load = styled.div`
    position: fixed;
    top: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: center;
    
    img {
        width: 80px;
        height: 80px
    }

    h4 {
        margin-top: 20px;
        font-size: 20px;
    }
`;