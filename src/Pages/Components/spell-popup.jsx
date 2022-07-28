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

export default function SpellPopup(props) {

    const [message, setMessage] = useState("");
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, props);

    var magiaId = 0;

    function IndexMagiaId() {
        for (var i = 0; i < props.arrayMagias.length; i++) {
            if (props.arrayMagias[i]["magiaId"] === props.magiaEditId) {
                return i;
            }
        }
        return -1;
    }

    function IdAvailable() {
        for (var i = 0; i < props.arrayMagias.length; i++) {
            if (props.arrayMagias[i]["magiaId"] === magiaId) {
                return false;
            }
        }
        return true;
    }

    function PushMagia() {

        magiaId = Math.floor(Math.random() * 999);

        if (props.magiaNome === "" || props.magiaEscola === "" || props.magiaExecucao === "" || props.magiaAlcance === "" || props.magiaAlvo === "" || props.magiaDuracao === "") {
            setMessage("Preencha todos os campos!");
        } else if (props.magiaEditId >= 0) {
            props.arrayMagias.splice([IndexMagiaId()], 1, {
                magiaId: props.magiaEditId,
                magiaNome: props.magiaNome,
                magiaEscola: props.magiaEscola,
                magiaExecucao: props.magiaExecucao,
                magiaAlcance: props.magiaAlcance,
                magiaAlvo: props.magiaAlvo,
                magiaDuracao: props.magiaDuracao,
                magiaResistencia: props.magiaResistencia,
                magiaDescricao: props.magiaDescricao
            })

            props.setMagiaNome("");
            props.setMagiaEscola("");
            props.setMagiaExecucao("");
            props.setMagiaAlcance("");
            props.setMagiaAlvo("");
            props.setMagiaDuracao("");
            props.setMagiaResistencia("");
            props.setMagiaDescricao("");

            props.setMagiaEditId(-1);
            props.setTrigger(false);
            setMessage("");
        } else {
            if (IdAvailable()) {
                props.arrayMagias.push({
                    magiaId: magiaId,
                    magiaNome: props.magiaNome,
                    magiaEscola: props.magiaEscola,
                    magiaExecucao: props.magiaExecucao,
                    magiaAlcance: props.magiaAlcance,
                    magiaAlvo: props.magiaAlvo,
                    magiaDuracao: props.magiaDuracao,
                    magiaResistencia: props.magiaResistencia,
                    magiaDescricao: props.magiaDescricao
                });

                props.setMagiaNome("");
                props.setMagiaEscola("");
                props.setMagiaExecucao("");
                props.setMagiaAlcance("");
                props.setMagiaAlvo("");
                props.setMagiaDuracao("");
                props.setMagiaResistencia("");
                props.setMagiaDescricao("");

                props.setTrigger(false);
                setMessage("");
            } else {
                PushMagia()
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
        ? props.magiaEditId < 0
            ? <div className="row popup"> {/* MagiaEditId < 0 -> -1, Adicionar */}
                <div ref={wrapperRef} className="row popup-inner-magia">
                    <div className="col-6"> {/* Nome */}
                        <label>Nome</label>
                        <input value={props.magiaNome} onChange={e => { props.setMagiaNome(e.target.value) }} type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-6"> {/* Escola */}
                        <label>Escola</label>
                        <input value={props.magiaEscola} onChange={e => { props.setMagiaEscola(e.target.value) }} type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-2"> {/* Execução */}
                        <label>Execução</label>
                        <input value={props.magiaExecucao} onChange={e => { props.setMagiaExecucao(e.target.value) }} type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-2"> {/* Alcance */}
                        <label>Alcance</label>
                        <input value={props.magiaAlcance} onChange={e => { props.setMagiaAlcance(e.target.value) }} type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-3"> {/* Alvo */}
                        <label>Alvo</label>
                        <input value={props.magiaAlvo} onChange={e => { props.setMagiaAlvo(e.target.value) }} type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-2"> {/* Duração */}
                        <label>Duração</label>
                        <input value={props.magiaDuracao} onChange={e => { props.setMagiaDuracao(e.target.value) }} type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-3"> {/* Resistência */}
                        <label>Resistência</label>
                        <input value={props.magiaResistencia} onChange={e => { props.setMagiaResistencia(e.target.value) }} type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-12"> {/* Descrição */}
                        <label>Descrição</label>
                        <textarea value={props.magiaDescricao} onChange={e => { props.setMagiaDescricao(e.target.value) }} type="text" className="form-control form-magia form-magia-descricao" placeholder="" rows="4" />
                    </div>

                    {
                        message !== "" ? <div className="alert alert-danger mt-2 text-center"> {message} </div> : null
                    }

                    <div className="row mt-2 mx-auto">
                        <div onClick={() => props.setTrigger(false)} className="col-6 text-end"><button className="btn btn-danger btn-add-attack">Cancelar</button></div>
                        <div onClick={PushMagia} className="col-6 text-start"><button className="btn btn-success btn-add-attack">Adicionar</button></div>
                    </div>
                </div >
            </div>

            : <div className="row popup"> {/* MagiaEditId >= 0 -> ID, Editar */}
                <div ref={wrapperRef} className="row popup-inner-magia">
                    <div className="col-6"> {/* Nome */}
                        {
                            props.setMagiaNome(props.arrayMagias[IndexMagiaId()].magiaNome)
                        }
                        <label>Nome</label>
                        <input defaultValue={props.arrayMagias[IndexMagiaId()].magiaNome} onChange={e => {
                            props.setMagiaNome(e.target.value);
                            props.arrayMagias[IndexMagiaId()].magiaNome = e.target.value
                        }
                        } type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-6"> {/* Escola */}
                        {
                            props.setMagiaEscola(props.arrayMagias[IndexMagiaId()].magiaEscola)
                        }
                        <label>Escola</label>
                        <input defaultValue={props.arrayMagias[IndexMagiaId()].magiaEscola} onChange={e => {
                            props.setMagiaEscola(e.target.value);
                            props.arrayMagias[IndexMagiaId()].magiaEscola = e.target.value
                        }
                        } type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-2"> {/* Execução */}
                        {
                            props.setMagiaExecucao(props.arrayMagias[IndexMagiaId()].magiaExecucao)
                        }
                        <label>Execucao</label>
                        <input defaultValue={props.arrayMagias[IndexMagiaId()].magiaExecucao} onChange={e => {
                            props.setMagiaExecucao(e.target.value);
                            props.arrayMagias[IndexMagiaId()].magiaExecucao = e.target.value
                        }
                        } type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-2"> {/* Alcance */}
                        {
                            props.setMagiaAlvo(props.arrayMagias[IndexMagiaId()].magiaAlvo)
                        }
                        <label>Alvo</label>
                        <input defaultValue={props.arrayMagias[IndexMagiaId()].magiaAlvo} onChange={e => {
                            props.setMagiaAlvo(e.target.value);
                            props.arrayMagias[IndexMagiaId()].magiaAlvo = e.target.value
                        }
                        } type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-3"> {/* Alvo */}
                        {
                            props.setMagiaDuracao(props.arrayMagias[IndexMagiaId()].magiaDuracao)
                        }
                        <label>Duração</label>
                        <input defaultValue={props.arrayMagias[IndexMagiaId()].magiaDuracao} onChange={e => {
                            props.setMagiaDuracao(e.target.value);
                            props.arrayMagias[IndexMagiaId()].magiaDuracao = e.target.value
                        }
                        } type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-3"> {/* Duração */}
                        {
                            props.setMagiaAlcance(props.arrayMagias[IndexMagiaId()].magiaAlcance)
                        }
                        <label>Alcance</label>
                        <input defaultValue={props.arrayMagias[IndexMagiaId()].magiaAlcance} onChange={e => {
                            props.setMagiaAlcance(e.target.value);
                            props.arrayMagias[IndexMagiaId()].magiaAlcance = e.target.value
                        }
                        } type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-2"> {/* Resistência */}
                        {
                            props.setMagiaResistencia(props.arrayMagias[IndexMagiaId()].magiaResistencia)
                        }
                        <label>Resistência</label>
                        <input defaultValue={props.arrayMagias[IndexMagiaId()].magiaResistencia} onChange={e => {
                            props.setMagiaResistencia(e.target.value);
                            props.arrayMagias[IndexMagiaId()].magiaResistencia = e.target.value
                        }
                        } type="text" className="form-control form-magia" placeholder="" />
                    </div>
                    <div className="col-12"> {/* Descrição */}
                        {
                            props.setMagiaDescricao(props.arrayMagias[IndexMagiaId()].magiaDescricao)
                        }
                        <label>Descrição</label>
                        <textarea value={props.arrayMagias[IndexMagiaId()].magiaDescricao} onChange={e => {
                            props.setMagiaDescricao(e.target.value);
                            props.arrayMagias[IndexMagiaId()].magiaDescricao = e.target.value
                        }
                        } type="text" className="form-control form-magia form-magia-descricao" placeholder="" rows="4" />
                    </div>

                    {
                        message !== "" ? <div className="alert alert-danger mt-2 text-center"> {message} </div> : null
                    }

                    <div className="row mt-2 mx-auto">
                        <div onClick={() => {
                            props.setTrigger(false);
                            props.setMagiaEditId(-1);
                        }} className="col-6 text-end"><button className="btn btn-danger btn-add-attack">Cancelar</button></div>
                        <div onClick={PushMagia} className="col-6 text-start"><button className="btn btn-success btn-add-attack">Adicionar</button></div>
                    </div>
                </div>
            </div>
        : null
}