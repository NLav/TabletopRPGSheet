import React, { useCallback, useEffect, useState, useRef } from "react";
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

export default function FeaturePopup(props) {

    const [message, setMessage] = useState("");
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, props);

    var habilidadeId = 0;

    function IndexHabilidadeId() {
        for (var i = 0; i < props.arrayHabilidades.length; i++) {
            if (props.arrayHabilidades[i]["habilidadeId"] === props.habilidadeEditId) {
                return i;
            }
        }
        return -1;
    }

    function IdAvailable() {
        for (var i = 0; i < props.arrayHabilidades.length; i++) {
            if (props.arrayHabilidades[i]["habilidadeId"] === habilidadeId) {
                return false;
            }
        }
        return true;
    }

    function PushHabilidade() {

        habilidadeId = Math.floor(Math.random() * 999);

        if (props.habilidadeNome === "" || props.habilidadeDescricao === "") {
            setMessage("Preencha todos os campos!");
        } else if (props.habilidadeEditId >= 0) {
            props.arrayHabilidades.splice([IndexHabilidadeId()], 1, {
                habilidadeId: props.habilidadeEditId,
                habilidadeNome: props.habilidadeNome,
                habilidadeDescricao: props.habilidadeDescricao

            })

            props.setHabilidadeNome("");
            props.setHabilidadeDescricao("");

            props.setHabilidadeEditId(-1);
            props.setTrigger(false);
            setMessage("");
        } else {
            if (IdAvailable()) {
                props.arrayHabilidades.push({
                    habilidadeId: habilidadeId,
                    habilidadeNome: props.habilidadeNome,
                    habilidadeDescricao: props.habilidadeDescricao
                });

                props.setHabilidadeNome("");
                props.setHabilidadeDescricao("");

                props.setTrigger(false);
                setMessage("");
            } else {
                PushHabilidade()
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
        ? props.habilidadeEditId < 0
            ? <div className="row popup"> {/* HabilidadeEditId < 0 -> -1, Adicionar */}
                <div ref={wrapperRef} className="row popup-inner-habilidade">
                    <div className="row mx-auto">
                        <label>Nome</label>
                        <input value={props.habilidadeNome} onChange={e => { props.setHabilidadeNome(e.target.value) }} type="text" className="form-control form-habilidade" placeholder="" />
                    </div>
                    <div className="row mx-auto">
                        <label>Descricao</label>
                        <textarea value={props.habilidadeDescricao} onChange={e => { props.setHabilidadeDescricao(e.target.value) }} type="number" className="form-control form-habilidade form-habilidade-descricao" placeholder="" rows="8" />
                    </div>

                    {
                        message !== "" ? <div className="alert alert-danger mt-2 text-center"> {message} </div> : null
                    }

                    <div className="row mt-2 mx-auto">
                        <div onClick={() => props.setTrigger(false)} className="col-6 text-end"><button className="btn btn-danger btn-add-attack">Cancelar</button></div>
                        <div onClick={PushHabilidade} className="col-6 text-start"><button className="btn btn-success btn-add-attack">Adicionar</button></div>
                    </div>
                </div>
            </div>

            : <div className="row popup"> {/* HabilidadeEditId >= 0 -> ID, Editar */}
                <div ref={wrapperRef} className="row popup-inner-habilidade">
                    <div className="row mx-auto">
                        {
                            props.setHabilidadeNome(props.arrayHabilidades[IndexHabilidadeId()].habilidadeNome)
                        }
                        <label>Nome</label>
                        <input defaultValue={props.arrayHabilidades[IndexHabilidadeId()].habilidadeNome} onChange={e => {
                            props.setHabilidadeNome(e.target.value);
                            props.arrayHabilidades[IndexHabilidadeId()].habilidadeNome = e.target.value
                        }
                        } type="text" className="form-control form-habilidade" placeholder="" />
                    </div>
                    <div className="row mx-auto">
                        {
                            props.setHabilidadeDescricao(props.arrayHabilidades[IndexHabilidadeId()].habilidadeDescricao)
                        }
                        <label>Descricao</label>
                        <textarea defaultValue={props.arrayHabilidades[IndexHabilidadeId()].habilidadeDescricao} onChange={e => {
                            props.setHabilidadeDescricao(e.target.value);
                            props.arrayHabilidades[IndexHabilidadeId()].habilidadeDescricao = e.target.value
                        }
                        } type="number" className="form-control form-habilidade" placeholder="" />
                    </div>

                    {
                        message !== "" ? <div className="alert alert-danger mt-2 text-center"> {message} </div> : null
                    }

                    <div className="row mt-2 mx-auto">
                        <div onClick={() => {
                            props.setTrigger(false);
                            props.setHabilidadeEditId(-1);
                        }} className="col-6 text-end"><button className="btn btn-danger btn-add-attack">Cancelar</button></div>
                        <div onClick={PushHabilidade} className="col-6 text-start"><button className="btn btn-success btn-add-attack">Adicionar</button></div>
                    </div>
                </div>
            </div>
        : null
}