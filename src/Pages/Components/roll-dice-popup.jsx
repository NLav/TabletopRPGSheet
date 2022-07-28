import React, { useCallback, useEffect, useRef, useState } from "react";
import RollDiceContainer from "./roll-dice-container";
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

export default function RollDiceContainerPopup(props) {

    const [facesAux, setFacesAux] = useState(0);
    const [dadosAux, setDadosAux] = useState(0);
    const [dadosTotal, setDadosTotal] = useState(0);
    const [modificadorSomarAux, setModificadorSomarAux] = useState(0);
    const [modificadorSubtrairAux, setModificadorSubtrairAux] = useState(0);
    const [arrayDados, setArrayDados] = useState([]);
    const wrapperRef = useRef(null);

    var dadosTotalVar = 0;
    var arrayDadosVar = [];
    var modificadoresAux = props.modificadorSomar - props.modificadorSubtrair;

    useOutsideAlerter(wrapperRef, props);

    const ClosePopupEsc = useCallback((event) => {
        if (event.keyCode === 27) {
            props.setTrigger(false);
        }
    }, []);

    function ToggleButton(trigger, setTrigger) {
        trigger
            ? setTrigger(false)
            : setTrigger(true)
    }

    function RollAnimate(setAnimation) {
        setAnimation(true);

        ToggleButton(props.rolarTrigger, props.setRolarTrigger);

        setTimeout(() => { ToggleButton(props.rolarTrigger, props.setRolarTrigger); setAnimation(false) }, 2000);
    }

    useEffect(() => {
        document.addEventListener("keydown", ClosePopupEsc);
        
        for (let i = 0; i < props.dados; i++) {
            
            arrayDadosVar.push((Math.floor(Math.random() * props.faces) + 1));
            dadosTotalVar = dadosTotalVar + arrayDadosVar[i];
            
            setArrayDados(arrayDadosVar);
        }
        
        setDadosTotal(dadosTotalVar + modificadoresAux);
        setFacesAux(props.faces);
        setDadosAux(props.dados);
        
        props.modificadorSomar === 0
        ? setModificadorSomarAux("")
        : props.modificadorSomar === "0"
        ? setModificadorSomarAux("")
        : props.modificadorSomar === ""
        ? setModificadorSomarAux("")
        : setModificadorSomarAux(" + " + props.modificadorSomar)
        props.modificadorSubtrair === 0
        ? setModificadorSubtrairAux("")
        : props.modificadorSubtrair === "0"
        ? setModificadorSubtrairAux("")
        : props.modificadorSubtrair === ""
        ? setModificadorSubtrairAux("")
        : setModificadorSubtrairAux(" - " + props.modificadorSubtrair)
        
        return () => {

            document.removeEventListener("keydown", ClosePopupEsc);
        };
    }, [ClosePopupEsc, props.rolarTrigger]);

    return (props.trigger)
        ? <div className="row popup">
            <div ref={wrapperRef} className="row popup-inner-rolar-dados">
                <h1>Rolagem de dados</h1>
                <div className="row row-rolar-dados">
                    <div className="col-6 col-grupo-rolar-dados">
                        <label>Dados</label>
                        <div className="row">
                            <div className="col-6">
                                <label>Quantidade</label>
                                <input defaultValue={props.dados} onChange={e => props.setDados(e.target.value)} type="number" className="form-control form-ataque-list" placeholder="" />
                            </div>
                            <div className="col-6">
                                <label>Faces</label>
                                <input defaultValue={props.faces} onChange={e => props.setFaces(e.target.value)} type="number" className="form-control form-ataque-list" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-grupo-rolar-dados">
                        <label>Modificadores</label>
                        <div className="row">
                            <div className="col-6">
                                <label>Somar</label>
                                <input defaultValue={props.modificadorSomar} onChange={e => props.setModificadorSomar(e.target.value)} type="number" className="form-control form-ataque-list" placeholder="" />
                            </div>
                            <div className="col-6">
                                <label>Subtrair</label>
                                <input defaultValue={props.modificadorSubtrair} onChange={e => props.setModificadorSubtrair(e.target.value)} type="number" className="form-control form-ataque-list" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <label className={props.rollAnimation ? "roll-dice-animation-label" : ""}>{dadosAux + "d" + facesAux + modificadorSomarAux + modificadorSubtrairAux + " = " + dadosTotal}</label>
                    </div>

                    <RollDiceContainer
                        arrayDados={arrayDados}
                        rollAnimation={props.rollAnimation}
                    />

                    <div className="row mx-auto mt-2 mb-3 px-0">
                        <div className="col-6 ps-0">
                            <button onClick={() => props.setTrigger(false)} className="btn btn-danger btn-rolar-dado">Cancelar</button>
                        </div>
                        <div className="col-6 pe-0">
                            <button onClick={() => { setDadosTotal(0); RollAnimate(props.setRollAnimation) }} className="btn btn-success btn-rolar-dado">Rolar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        : null
}