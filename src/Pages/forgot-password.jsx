import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./pages.css";

export default function ForgotPassword() {
    var ano = new Date().getFullYear();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const auth = getAuth();

    function SendEmail() {

        setMessage("");

        if (!email) {
            setMessage("Preencha o campo!");
        } else {
            sendPasswordResetEmail(auth, email)
                .then(firebaseUser => {
                    setMessage("sucesso");
                })
                .catch(error => {
                    if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                        setMessage("A senha deve possuir pelo menos 6 caracteres!");
                    } else if (error.message === "Firebase: Error (auth/invalid-email).") {
                        setMessage("E-mail inválido!");
                    } else if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                        setMessage("O e-mail já está em uso por outra conta!")
                    } else {
                        setMessage("Erro ao criar conta: " + error.message);
                    }
                })
        }
    }

    return <section className="d-flex align-items-center text-center form-container section-default" id="section-mudar-senha">

        <form className="form-sign">
            
            

            <h1 className="h3 mb-3 fw-normal">Recuperação de senha</h1>

            <div className="form-floating">
                <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput">Endereço de e-mail</label>
            </div>

            <button onClick={SendEmail} className="w-100 btn btn-lg btn-success" type="button">Enviar</button>

            <div className="link-voltar-login mt-2 text-start">
                <Link to={"/trpg"}>Voltar para a tela de login</Link>
            </div>

            {
                message === "sucesso"
                    ? <div className="alert alert-success mt-2"> E-mail enviado com sucesso </div>
                    : message === ""
                        ? null
                        : <div className="alert alert-danger mt-2"> {message} </div>
            }

            <Link to={"/trpg/cadastrar"} className="w-100 btn btn-lg btn-outline-primary mt-5">Criar conta</Link>

            <p className="mt-5 mb-3 text-muted">Desenvolvido por NR Desenvolvimento e Consultoria - {ano}</p>
        </form>
    </section>;
}