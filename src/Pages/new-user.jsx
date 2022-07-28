import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import firebase from "./Config/firebase";
import "./pages.css";

export default function NewUser() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const swalDialogNewUser = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger me-3"
        },
        buttonsStyling: false
    })

    const auth = getAuth();

    let navigate = useNavigate();

    function CreateUser() {

        setMessage("");

        if (!email || !password || !confirmPassword) {

            setMessage("Preencha todos os campos!");
            return
        
        } else if (password !== confirmPassword) {

            setMessage("As senhas não são iguais!");
            return

        } else {

            createUserWithEmailAndPassword(auth, email, password)
                .then(firebaseUser => {
                    swalDialogNewUser.fire({
                        icon: "success",
                        title: "Sucesso",
                        text: "Usuário cadastrado com sucesso!",
                        background: "#000",
                        color: "#FFF",
                      }).then(navigate("/trpg"));
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
                });
        }
    }

    return <section className="d-flex align-items-center text-center form-container section-default">

        <form className="form-sign">
            <img className="mb-4" src="/trpg/Images/ic-trpg-small.png" alt="Ícone TRPG" width="72" height="72" />
            <h1 className="h3 mb-3 fw-normal">Crie uma conta</h1>

            <div className="form-floating">
                <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="floatingEmail" placeholder="nome@exemplo.com" />
                <label htmlFor="floatingEmail" className="floating-label">Email</label>
            </div>
            <div className="form-floating">
                <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Senha" />
                <label htmlFor="floatingPassword" className="floating-label">Senha</label>
            </div>
            <div className="form-floating">
                <input onChange={e => setConfirmPassword(e.target.value)} type="password" className="form-control" id="floatingConfirmPassword" placeholder="Confirmar Senha" />
                <label htmlFor="floatingConfirmPassword" className="floating-label">Confirmar Senha</label>
            </div>
            
            <Link to={"/trpg"} className="btn btn-lg btn-danger btn-form-new-user">Cancelar</Link>
            <button onClick={CreateUser} className="btn btn-lg btn-success btn-form-new-user" type="button">Criar conta</button>

            {
                message !== "" ? <div className="alert alert-danger mt-2"> {message} </div> : null
            }

            <p className="mt-5 text-muted">© 2017-2021</p>
        </form>
    </section>
}