import React, { useCallback, useEffect, useRef, useState } from "react";
import "../pages.css";

function useOutsideAlerter(ref, props) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                props.setTrigger(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default function AttackPopup(props) {

    const [message, setMessage] = useState("");
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, props);

    var ataqueId = 0;

    function IndexAtaqueId() {
        for (var i = 0; i < props.arrayAtaques.length; i++) {
            if (props.arrayAtaques[i]["ataqueId"] === props.ataqueEditId) {
                return i;
            }
        }
        return -1;
    }

    function IdAvailable() {
        for (var i = 0; i < props.arrayAtaques.length; i++) {
            if (props.arrayAtaques[i]["ataqueId"] === ataqueId) {
                return false;
            }
        }
        return true;
    }

    function PushAtaque() {

        ataqueId = Math.floor(Math.random() * 999);

        if (props.ataqueNome === "" || props.ataqueTeste === "" || props.ataqueDano === "" || props.ataqueCritico === "" || props.ataqueTipo === "" || props.ataqueAlcance === "") {
            setMessage("Preencha todos os campos!");
        } else if (props.ataqueEditId >= 0) {
            props.arrayAtaques.splice([IndexAtaqueId()], 1, {
                ataqueId: props.ataqueEditId,
                ataqueNome: props.ataqueNome,
                ataqueTeste: props.ataqueTeste,
                ataqueDano: props.ataqueDano,
                ataqueCritico: props.ataqueCritico,
                ataqueTipo: props.ataqueTipo,
                ataqueAlcance: props.ataqueAlcance,
                ataqueDescricao: props.ataqueDescricao
            })

            props.setAtaqueNome("");
            props.setAtaqueTeste("");
            props.setAtaqueDano("");
            props.setAtaqueCritico("");
            props.setAtaqueTipo("");
            props.setAtaqueAlcance("");
            props.setAtaqueDescricao("");

            props.setAtaqueEditId(-1);
            props.setTrigger(false);
            setMessage("");
        } else {
            if (IdAvailable()) {
                props.arrayAtaques.push({
                    ataqueId: ataqueId,
                    ataqueNome: props.ataqueNome,
                    ataqueTeste: props.ataqueTeste,
                    ataqueDano: props.ataqueDano,
                    ataqueCritico: props.ataqueCritico,
                    ataqueTipo: props.ataqueTipo,
                    ataqueAlcance: props.ataqueAlcance,
                    ataqueDescricao: props.ataqueDescricao
                });

                props.setAtaqueNome("");
                props.setAtaqueTeste("");
                props.setAtaqueDano("");
                props.setAtaqueCritico("");
                props.setAtaqueTipo("");
                props.setAtaqueAlcance("");
                props.setAtaqueDescricao("");

                props.setTrigger(false);
                setMessage("");
            } else {
                PushAtaque()
            }
        }
    }

    const ClosePopupEsc = useCallback((event) => {
        if (event.keyCode === 27) {
            props.setTrigger(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", ClosePopupEsc);

        return () => {
            document.removeEventListener("keydown", ClosePopupEsc);
        };
    }, [ClosePopupEsc]);

    return (props.trigger)
        ? props.ataqueEditId < 0
            ? <div className="row popup"> {/* AtaqueEditId < 0 -> -1, Adicionar */}
                <div ref={wrapperRef} className="row popup-inner-ataque">
                    <div className="col-8">
                        <label>Nome</label>
                        <input value={props.ataqueNome} onChange={e => { props.setAtaqueNome(e.target.value) }} type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-4">
                        <label>Teste</label>
                        <input value={props.ataqueTeste} onChange={e => { props.setAtaqueTeste(e.target.value) }} type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-3">
                        <label>Dano</label>
                        <input value={props.ataqueDano} onChange={e => { props.setAtaqueDano(e.target.value) }} type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-3">
                        <label>Crítico</label>
                        <input value={props.ataqueCritico} onChange={e => { props.setAtaqueCritico(e.target.value) }} type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-3">
                        <label>Tipo</label>
                        <input value={props.ataqueTipo} onChange={e => { props.setAtaqueTipo(e.target.value) }} type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-3">
                        <label>Alcance</label>
                        <input value={props.ataqueAlcance} onChange={e => { props.setAtaqueAlcance(e.target.value) }} type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-12">
                        <label>Descrição</label>
                        <textarea value={props.ataqueDescricao} onChange={e => { props.setAtaqueDescricao(e.target.value) }} type="text" className="form-control form-ataque form-ataque-descricao" placeholder="" rows="4" />
                    </div>

                    {
                        message !== "" ? <div className="alert alert-danger mt-2 text-center"> {message} </div> : null
                    }

                    <div className="row mt-2 mx-auto">
                        <div onClick={() => props.setTrigger(false)} className="col-6 text-end"><button className="btn btn-danger btn-add-attack">Cancelar</button></div>
                        <div onClick={PushAtaque} className="col-6 text-start"><button className="btn btn-success btn-add-attack">Adicionar</button></div>
                    </div>
                </div >
            </div>

            : <div className="row popup"> {/* AtaqueEditId >= 0 -> ID, Editar */}
                <div ref={wrapperRef} className="row popup-inner-ataque">
                    <div className="col-8">
                        {
                            props.setAtaqueNome(props.arrayAtaques[IndexAtaqueId()].ataqueNome)
                        }
                        <label>Nome</label>
                        <input defaultValue={props.arrayAtaques[IndexAtaqueId()].ataqueNome} onChange={e => {
                            props.setAtaqueNome(e.target.value);
                            props.arrayAtaques[IndexAtaqueId()].ataqueNome = e.target.value
                        }
                        } type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-4">
                        {
                            props.setAtaqueTeste(props.arrayAtaques[IndexAtaqueId()].ataqueTeste)
                        }
                        <label>Teste</label>
                        <input defaultValue={props.arrayAtaques[IndexAtaqueId()].ataqueTeste} onChange={e => {
                            props.setAtaqueTeste(e.target.value);
                            props.arrayAtaques[IndexAtaqueId()].ataqueTeste = e.target.value
                        }
                        } type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-3">
                        {
                            props.setAtaqueDano(props.arrayAtaques[IndexAtaqueId()].ataqueDano)
                        }
                        <label>Dano</label>
                        <input defaultValue={props.arrayAtaques[IndexAtaqueId()].ataqueDano} onChange={e => {
                            props.setAtaqueDano(e.target.value);
                            props.arrayAtaques[IndexAtaqueId()].ataqueDano = e.target.value
                        }
                        } type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-3">
                        {
                            props.setAtaqueCritico(props.arrayAtaques[IndexAtaqueId()].ataqueCritico)
                        }
                        <label>Crítico</label>
                        <input defaultValue={props.arrayAtaques[IndexAtaqueId()].ataqueCritico} onChange={e => {
                            props.setAtaqueCritico(e.target.value);
                            props.arrayAtaques[IndexAtaqueId()].ataqueCritico = e.target.value
                        }
                        } type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-3">
                        {
                            props.setAtaqueTipo(props.arrayAtaques[IndexAtaqueId()].ataqueTipo)
                        }
                        <label>Tipo</label>
                        <input defaultValue={props.arrayAtaques[IndexAtaqueId()].ataqueTipo} onChange={e => {
                            props.setAtaqueTipo(e.target.value);
                            props.arrayAtaques[IndexAtaqueId()].ataqueTipo = e.target.value
                        }
                        } type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-3">
                        {
                            props.setAtaqueAlcance(props.arrayAtaques[IndexAtaqueId()].ataqueAlcance)
                        }
                        <label>Alcance</label>
                        <input defaultValue={props.arrayAtaques[IndexAtaqueId()].ataqueAlcance} onChange={e => {
                            props.setAtaqueAlcance(e.target.value);
                            props.arrayAtaques[IndexAtaqueId()].ataqueAlcance = e.target.value
                        }
                        } type="text" className="form-control form-ataque" placeholder="" />
                    </div>
                    <div className="col-12">
                        {
                            props.setAtaqueDescricao(props.arrayAtaques[IndexAtaqueId()].ataqueDescricao)
                        }
                        <label>Descrição</label>
                        <textarea value={props.arrayAtaques[IndexAtaqueId()].ataqueDescricao} onChange={e => {
                            props.setAtaqueDescricao(e.target.value);
                            props.arrayAtaques[IndexAtaqueId()].ataqueDescricao = e.target.value
                        }
                        } type="text" className="form-control form-ataque form-ataque-descricao" placeholder="" rows="4" />
                    </div>

                    {
                        message !== "" ? <div className="alert alert-danger mt-2 text-center"> {message} </div> : null
                    }

                    <div className="row mt-2 mx-auto">
                        <div onClick={() => {
                            props.setTrigger(false);
                            props.setAtaqueEditId(-1);
                        }} className="col-6 text-end"><button className="btn btn-danger btn-add-attack">Cancelar</button></div>
                        <div onClick={PushAtaque} className="col-6 text-start"><button className="btn btn-success btn-add-attack">Adicionar</button></div>
                    </div>
                </div>
            </div>
        : null
}