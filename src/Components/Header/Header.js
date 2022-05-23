import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Header() {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Logo>
            {location.pathname !== "/" && location.pathname !== "/sucesso"? 
                <ion-icon onClick={() => navigate(-1)} name="arrow-back-sharp"></ion-icon>
                :
                null
            }
            <h1 onClick={()=> navigate("/")}>CINEFLEX</h1>
        </Logo>
    );
}


//STYLES
const Logo = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    background-color: #C3CFD9;
    color: #E8833A;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 68px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;

    ion-icon {
        position: fixed;
        left: 5%;
    }
`

