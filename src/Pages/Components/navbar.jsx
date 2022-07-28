import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth";
import "../pages.css";

export default function Navbar() {

    const { setLogged } = React.useContext(AuthContext);
    let navigate = useNavigate();

    return <nav id="navbar" className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <Link className="navbar-brand" to={"/trpg/home"}>
                <img className="me-2" src="/trpg/Images/logo-trpg.png" alt="" height="55" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                    <li className="nav-item">
                        <Link to={"/trpg/home"} className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/trpg/novaficha"} className="nav-link">Nova ficha</Link>
                    </li>
                    <li className="nav-item sair">
                        <a href="/trpg" onClick={() => {
                            localStorage.setItem("logged", "N");
                            setLogged(false);
                            navigate("/trpg");
                        }} className="nav-link" aria-current="page">Sair</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}