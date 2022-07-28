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

export default function ItemPopup(props) {

    const [message, setMessage] = useState("");
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, props);

    var itemId = 0;

    function IndexItemId() {
        for (var i = 0; i < props.arrayItens.length; i++) {
            if (props.arrayItens[i]["itemId"] === props.itemEditId) {
                return i;
            }
        }
        return -1;
    }

    function IdAvailable() {
        for (var i = 0; i < props.arrayItens.length; i++) {
            if (props.arrayItens[i]["itemId"] === itemId) {
                return false;
            }
        }
        return true;
    }

    function PushItem() {

        itemId = Math.floor(Math.random() * 999);

        if (props.itemNome === "" || props.itemPeso === "") {
            setMessage("Preencha todos os campos!");
        } else if (props.itemEditId >= 0) {
            props.arrayItens.splice([IndexItemId()], 1, {
                itemId: props.itemEditId,
                itemNome: props.itemNome,
                itemPeso: props.itemPeso,
                itemValor: props.itemValor

            })

            props.setItemNome("");
            props.setItemPeso(0);
            props.setItemValor(0);

            props.setItemEditId(-1);
            props.setTrigger(false);
            setMessage("");
        } else {
            if (IdAvailable()) {
                props.arrayItens.push({
                    itemId: itemId,
                    itemNome: props.itemNome,
                    itemPeso: props.itemPeso,
                    itemValor: props.itemValor
                });

                props.setItemNome("");
                props.setItemPeso(0);
                props.setItemValor(0);

                props.setTrigger(false);
                setMessage("");
            } else {
                PushItem()
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
        ? props.itemEditId < 0
            ? <div className="row popup"> {/* ItemEditId < 0 -> -1, Adicionar */}
                <div ref={wrapperRef} className="row popup-inner-item">
                    <div className="col-8">
                        <label>Nome</label>
                        <input value={props.itemNome} onChange={e => { props.setItemNome(e.target.value) }} type="text" className="form-control form-item" placeholder="" />
                    </div>
                    <div className="col-2">
                        <label>Peso</label>
                        <input value={props.itemPeso} onChange={e => { props.setItemPeso(e.target.value) }} type="number" className="form-control form-item" placeholder="" />
                    </div>
                    <div className="col-2">
                        <label>Valor</label>
                        <input value={props.itemValor} onChange={e => { props.setItemValor(e.target.value) }} type="number" className="form-control form-item" placeholder="" />
                    </div>

                    {
                        message !== "" ? <div className="alert alert-danger mt-2 text-center"> {message} </div> : null
                    }

                    <div className="row mt-2 mx-auto">
                        <div onClick={() => props.setTrigger(false)} className="col-6 text-end"><button className="btn btn-danger btn-add-attack">Cancelar</button></div>
                        <div onClick={PushItem} className="col-6 text-start"><button className="btn btn-success btn-add-attack">Adicionar</button></div>
                    </div>
                </div>
            </div>

            : <div className="row popup"> {/* ItemEditId >= 0 -> ID, Editar */}
                <div ref={wrapperRef} className="row popup-inner-item">
                    <div className="col-8">
                        {
                            props.setItemNome(props.arrayItens[IndexItemId()].itemNome)
                        }
                        <label>Nome</label>
                        <input defaultValue={props.arrayItens[IndexItemId()].itemNome} onChange={e => {
                            props.setItemNome(e.target.value);
                            props.arrayItens[IndexItemId()].itemNome = e.target.value
                        }
                        } type="text" className="form-control form-item" placeholder="" />
                    </div>
                    <div className="col-2">
                        {
                            props.setItemPeso(props.arrayItens[IndexItemId()].itemPeso)
                        }
                        <label>Peso</label>
                        <input defaultValue={props.arrayItens[IndexItemId()].itemPeso} onChange={e => {
                            props.setItemPeso(e.target.value);
                            props.arrayItens[IndexItemId()].itemPeso = e.target.value
                        }
                        } type="number" className="form-control form-item" placeholder="" />
                    </div>
                    <div className="col-2">
                        {
                            props.setItemValor(props.arrayItens[IndexItemId()].itemValor)
                        }
                        <label>Valor</label>
                        <input defaultValue={props.arrayItens[IndexItemId()].itemValor} onChange={e => {
                            props.setItemValor(e.target.value);
                            props.arrayItens[IndexItemId()].itemValor = e.target.value
                        }
                        } type="number" className="form-control form-item" placeholder="" />
                    </div>

                    {
                        message !== "" ? <div className="alert alert-danger mt-2 text-center"> {message} </div> : null
                    }

                    <div className="row mt-2 mx-auto">
                        <div onClick={() => {
                            props.setTrigger(false);
                            props.setItemEditId(-1);
                        }} className="col-6 text-end"><button className="btn btn-danger btn-add-attack">Cancelar</button></div>
                        <div onClick={PushItem} className="col-6 text-start"><button className="btn btn-success btn-add-attack">Adicionar</button></div>
                    </div>
                </div>
            </div>
        : null
}