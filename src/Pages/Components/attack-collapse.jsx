import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AttackCollapse(props) {

    const [ataqueCollapse, setAtaqueCollapse] = useState(true);

    var navigate = useNavigate();

    function IndexAtaqueId(prop) {
        for (var i = 0; i < props.arrayAtaques.length; i++) {
            if (props.arrayAtaques[i]["ataqueId"] === prop) {
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

    return ataqueCollapse
        ? <div className="row row-ataque">
            <div className="row">
                <div onClick={() => ToggleCollapse(ataqueCollapse, setAtaqueCollapse)} className="col-1 col-img-collapse-list p-0">
                    <img src="/trpg/Images/ic_collapse.png" style={{ transform: "rotate(90deg)" }} className="img-collapse" />
                </div>
                <div className="col-8">
                    <input value={props.ataque.ataqueNome} type="text" className="form-control form-ataque-list form-list-collapsed" placeholder="" disabled />
                </div>
                <div className="col-3 d-flex justify-content-end">
                    <button onClick={() => {
                        props.setAtaqueEditId(props.ataque.ataqueId);
                        props.setTrigger(true);
                    }} className="btn-ataque-list me-3"><img className="img-icon-acoes" src="/trpg/Images/ic_edit.png" alt="edit-icon" height={30} /></button>
                    <button onClick={() => {
                        props.arrayAtaques.splice([IndexAtaqueId(props.ataque.ataqueId)], 1);
                        navigate("#");
                    }} className="btn-ataque-list ms-3"><img className="img-icon-acoes" src="/trpg/Images/ic_delete.png" alt="delete-icon" height={30} /></button>
                </div>
            </div>
        </div>
        : <div className="row row-ataque">
            <div className="row">
                <div onClick={() => ToggleCollapse(ataqueCollapse, setAtaqueCollapse)} className="col-1 col-img-collapse-list p-0">
                    <img src="/trpg/Images/ic_collapse.png" style={{ transform: "rotate(180deg)" }} className="img-collapse" />
                </div>
                <div className="offset-8 col-3 d-flex justify-content-end">
                    <button onClick={() => {
                        props.setAtaqueEditId(props.ataque.ataqueId);
                        props.setTrigger(true);
                    }} className="btn-ataque-list me-3"><img className="img-icon-acoes" src="/trpg/Images/ic_edit.png" alt="edit-icon" height={30} /></button>
                    <button onClick={() => {
                        props.arrayAtaques.splice([IndexAtaqueId(props.ataque.ataqueId)], 1);
                        navigate("#");
                    }} className="btn-ataque-list ms-3"><img className="img-icon-acoes" src="/trpg/Images/ic_delete.png" alt="delete-icon" height={30} /></button>
                </div>
            </div>

            <div className="row row-ataque-valores">
                <div className="col-8">
                    <label>Nome</label>
                    <input value={props.ataque.ataqueNome} type="text" className="form-control form-ataque-list" placeholder="" disabled />
                </div>
                <div className="col-4">
                    <label>Teste</label>
                    <input value={props.ataque.ataqueTeste} type="text" className="form-control form-ataque-list" placeholder="" disabled />
                </div>
                <div className="col-3">
                    <label>Dano</label>
                    <input value={props.ataque.ataqueDano} type="text" className="form-control form-ataque-list" placeholder="" disabled />
                </div>
                <div className="col-3">
                    <label>Crítico</label>
                    <input value={props.ataque.ataqueCritico} type="text" className="form-control form-ataque-list" placeholder="" disabled />
                </div>
                <div className="col-3">
                    <label>Tipo</label>
                    <input value={props.ataque.ataqueTipo} type="text" className="form-control form-ataque-list" placeholder="" disabled />
                </div>
                <div className="col-3">
                    <label>Alcance</label>
                    <input value={props.ataque.ataqueAlcance} type="text" className="form-control form-ataque-list" placeholder="" disabled />
                </div>
                <div className="col-12">
                    <label>Descrição</label>
                    <textarea value={props.ataque.ataqueDescricao} type="text" className="form-control form-ataque-list" placeholder="" disabled />
                </div>
            </div>
        </div>
}