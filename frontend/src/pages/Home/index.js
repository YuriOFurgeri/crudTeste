import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/");
    };
    
    return (
        <div className="container">
        <div className="row">
            <div className="col-12">
            <h1 className="text-center">Home</h1>
            <button className="btn btn-primary" onClick={handleClick}>
                Voltar
            </button>
            </div>
        </div>
        </div>
    );
    }

    export default Home;