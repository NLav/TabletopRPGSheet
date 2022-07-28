import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeatureCollapse(props) {

    const [habilidadeCollapse, setHabilidadeCollapse] = useState(true);

    var navigate = useNavigate();

    function IndexHabilidadeId(prop) {
        for (var i = 0; i < props.arrayHabilidades.length; i++) {
            if (props.arrayHabilidades[i]["habilidadeId"] === prop) {
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

    return habilidadeCollapse
        ? <div className="row row-habilidade">
            <div className="row">
                <div onClick={() => ToggleCollapse(habilidadeCollapse, setHabilidadeCollapse)} className="col-1 col-img-collapse-list p-0">
                    <img src="/trpg/Images/ic_collapse.png" style={{ transform: "rotate(90deg)" }} className="img-collapse" />
                </div>
                <div className="col-8">
                    <input value={props.habilidade.habilidadeNome} type="text" className="form-control form-habilidade-list form-list-collapsed" placeholder="" disabled />
                </div>
                <div className="col-3 d-flex justify-content-end">
                    <button onClick={() => {
                        props.setHabilidadeEditId(props.habilidade.habilidadeId);
                        props.setTrigger(true);
                    }} className="btn-habilidade-list me-3"><img className="img-icon-acoes" src="/trpg/Images/ic_edit.png" alt="edit-icon" height={30} /></button>
                    <button onClick={() => {
                        props.arrayHabilidades.splice([IndexHabilidadeId(props.habilidade.habilidadeId)], 1);
                        navigate("#");
                    }} className="btn-habilidade-list ms-3"><img className="img-icon-acoes" src="/trpg/Images/ic_delete.png" alt="delete-icon" height={30} /></button>
                </div>
            </div>
        </div>
        : <div className="row row-habilidade">
            <div className="row">
                <div onClick={() => ToggleCollapse(habilidadeCollapse, setHabilidadeCollapse)} className="col-1 col-img-collapse-list p-0">
                    <img src="/trpg/Images/ic_collapse.png" style={{ transform: "rotate(180deg)" }} className="img-collapse" />
                </div>
                <div className="offset-8 col-3 d-flex justify-content-end">
                    <button onClick={() => {
                        props.setHabilidadeEditId(props.habilidade.habilidadeId);
                        props.setTrigger(true);
                    }} className="btn-habilidade-list me-3"><img className="img-icon-acoes" src="/trpg/Images/ic_edit.png" alt="edit-icon" height={30} /></button>
                    <button onClick={() => {
                        props.arrayHabilidades.splice([IndexHabilidadeId(props.habilidade.habilidadeId)], 1);
                        navigate("#");
                    }} className="btn-habilidade-list ms-3"><img className="img-icon-acoes" src="/trpg/Images/ic_delete.png" alt="delete-icon" height={30} /></button>
                </div>
            </div>

            <div className="col-12"> {/* Nome */}
                <label>Nome</label>
                <input value={props.habilidade.habilidadeNome} type="text" className="form-control form-habilidade-list" placeholder="" disabled />
            </div>
            <div className="col-12"> {/* Descrição */}
                <label>Descrição</label>
                <textarea value={props.habilidade.habilidadeDescricao} type="text" className="form-control form-habilidade-list" placeholder="" disabled />
            </div>
        </div>
}