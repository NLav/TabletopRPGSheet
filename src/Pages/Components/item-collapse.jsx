import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ItemCollapse(props) {

    const [itemCollapse, setItemCollapse] = useState(false);

    var navigate = useNavigate();

    function IndexItemId(prop) {
        for (var i = 0; i < props.arrayItens.length; i++) {
            if (props.arrayItens[i]["itemId"] === prop) {
                return i;
            }
        }
        return -1;
    }

    function ToggleCollapse(collapse, setCollapse) {
        collapse
            ? setCollapse(false)
            : setCollapse(true)
    }

    return itemCollapse
        ? <div className="row row-item">
            <div className="row">
                <div onClick={() => ToggleCollapse(itemCollapse, setItemCollapse)} className="col-1 col-img-collapse-list p-0">
                    <img src="/trpg/Images/ic_collapse.png" style={{ transform: "rotate(90deg)" }} className="img-collapse" />
                </div>
                <div className="col-8">
                    <input value={props.item.itemNome} type="text" className="form-control form-item-list form-list-collapsed" placeholder="" disabled />
                </div>
                <div className="col-3 d-flex justify-content-end">
                    <button onClick={() => {
                        props.setItemEditId(props.item.itemId);
                        props.setTrigger(true);
                    }} className="btn-item-list me-3"><img className="img-icon-acoes" src="/trpg/Images/ic_edit.png" alt="edit-icon" height={30} /></button>
                    <button onClick={() => {
                        props.arrayItens.splice([IndexItemId(props.item.itemId)], 1);
                        navigate("#");
                    }} className="btn-item-list ms-3"><img className="img-icon-acoes" src="/trpg/Images/ic_delete.png" alt="delete-icon" height={30} /></button>
                </div>
            </div>
        </div>
        : <div className="row row-item">
            <div className="row">
                <div onClick={() => ToggleCollapse(itemCollapse, setItemCollapse)} className="col-1 col-img-collapse-list p-0">
                    <img src="/trpg/Images/ic_collapse.png" style={{ transform: "rotate(180deg)" }} className="img-collapse" />
                </div>
                <div className="offset-8 col-3 d-flex justify-content-end">
                    <button onClick={() => {
                        props.setItemEditId(props.item.itemId);
                        props.setTrigger(true);
                    }} className="btn-item-list me-3"><img className="img-icon-acoes" src="/trpg/Images/ic_edit.png" alt="edit-icon" height={30} /></button>
                    <button onClick={() => {
                        props.arrayItens.splice([IndexItemId(props.item.itemId)], 1);
                        navigate("#");
                    }} className="btn-item-list ms-3"><img className="img-icon-acoes" src="/trpg/Images/ic_delete.png" alt="delete-icon" height={30} /></button>
                </div>
            </div>
            <div className="col-8">
                <label>Item</label>
                <input value={props.item.itemNome} type="text" className="form-control form-item-list" placeholder="" disabled />
            </div>
            <div className="col-2">
                <label>Peso</label>
                <input value={props.item.itemPeso} type="number" className="form-control form-item-list" placeholder="" disabled />
            </div>
            <div className="col-2">
                <label>Valor</label>
                <input value={props.item.itemValor} type="number" className="form-control form-item-list" placeholder="" disabled />
            </div>
        </div>
}