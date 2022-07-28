import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./Context/auth";
import { UserContext } from "./Context/user";
import "./Config/firebase";
import "./pages.css";

export default function Login() {
    var ano = new Date().getFullYear();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setLogged } = React.useContext(AuthContext);
    const { setUserId } = React.useContext(UserContext);

    const auth = getAuth();

    let navigate = useNavigate();

    function ValidateLogin() {
        if (!email || !password) {
            setError("S");
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    localStorage.setItem("logged", "S");
                    setError("N");
                    setLogged(true);
                    navigate("/trpg/home");
                })
                .catch(() => {
                    localStorage.setItem("logged", "N");
                    localStorage.setItem("userId", "N");
                    setError("S");
                    setLogged(false);
                    setUserId("N");
                });

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;

                    localStorage.setItem("userId", uid);
                    setUserId(uid);
                }
            });

        }
    }

    return <section className="d-flex align-items-center text-center form-container section-default">

        <form className="form-sign">
            <img className="mb-4" src="/trpg/Images/ic-trpg-small.png" alt="Ícone TRPG" width="72" height="72" />
            <h1 className="h3 mb-3 fw-normal">Acesse sua conta</h1>

            <div className="form-floating">
                <input onChange={e => setEmail(e.target.value)} type="text" className="form-control" id="floatingInput" placeholder="nome@exemplo.com" />
                <label htmlFor="floatingInput" className="floating-label">Email</label>
            </div>
            <div className="form-floating">
                <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Senha" />
                <label htmlFor="floatingPassword" className="floating-label">Senha</label>
            </div>

            <button onClick={ValidateLogin} className="w-100 btn btn-lg btn-success" type="button">Acessar</button>

            <div className="mt-2 text-start">
                <Link to={"/trpg/esquecisenha"}>Esqueci minha senha</Link>
            </div>

            {
                error === "S" ? <div className="alert alert-danger mt-2">E-mail ou Senha inválidos</div> : null
            }

            <Link to={"/trpg/cadastrar"} className="w-100 btn btn-lg btn-outline-primary mt-4">Criar conta</Link>
            <p className="mt-5 text-muted">© 2021-{ano}</p>
        </form>
    </section>
}