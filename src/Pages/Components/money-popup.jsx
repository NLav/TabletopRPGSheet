import React, { useCallback, useEffect, useState, useRef } from "react";

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

export default function MoneyPopup(props) {
    const [message, setMessage] = useState("");
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, props);

    function VerifyMoney() {

        if (props.dinheiroValor === "") {
            setMessage("Preecha todos os campos!");
        } else {
            props.setTrigger(false);
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
        ? <div className="row popup">
            <div ref={wrapperRef} className="row popup-inner-dinheiro">
                <div className="offset-3 col-6">
                    <label className="lbl-dinheiro-popup">Valor</label>
                    <input value={props.dinheiroValor} onChange={e => { props.setDinheiroValor(e.target.value) }} type="text" className="form-control form-item" placeholder="" />
                </div>
                {
                    message !== "" ? <div className="alert alert-danger mt-2 text-center"> {message} </div> : null
                }

                <div className="row mt-2 mx-auto">
                    <div className="col-6 text-end">
                        <button onClick={() => props.setTrigger(false)} className="btn btn-danger btn-add-attack">Cancelar</button>
                    </div>
                    <div className="col-6 text-start">
                        <button onClick={VerifyMoney} className="btn btn-success btn-add-attack">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
        : null
}