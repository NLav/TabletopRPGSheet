import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SpellCollapse(props) {

    const [magiaCollapse, setMagiaCollapse] = useState(true);

    var navigate = useNavigate();

    function IndexMagiaId(prop) {
        for (var i = 0; i < props.arrayMagias.length; i++) {
            if (props.arrayMagias[i]["magiaId"] === prop) {
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

    return magiaCollapse
        ? <div className="row row-magia">
            <div className="row">
                <div onClick={() => ToggleCollapse(magiaCollapse, setMagiaCollapse)} className="col-1 col-img-collapse-list p-0">
                    <img src="/trpg/Images/ic_collapse.png" style={{ transform: "rotate(90deg)" }} className="img-collapse" />
                </div>
                <div className="col-8">
                    <input value={props.magia.magiaNome} type="text" className="form-control form-magia-list form-list-collapsed" placeholder="" disabled />
                </div>
                <div className="col-3 d-flex justify-content-end">
                    <button onClick={() => {
                        props.setMagiaEditId(props.magia.magiaId);
                        props.setTrigger(true);
                    }} className="btn-magia-list me-3"><img className="img-icon-acoes" src="/trpg/Images/ic_edit.png" alt="edit-icon" height={30} /></button>
                    <button onClick={() => {
                        props.arrayMagias.splice([IndexMagiaId(props.magia.magiaId)], 1);
                        navigate("#");
                    }} className="btn-magia-list ms-3"><img className="img-icon-acoes" src="/trpg/Images/ic_delete.png" alt="delete-icon" height={30} /></button>
                </div>
            </div>
        </div>
        : <div className="row row-magia">
            <div className="row">
                <div onClick={() => ToggleCollapse(magiaCollapse, setMagiaCollapse)} className="col-1 col-img-collapse-list p-0">
                    <img src="/trpg/Images/ic_collapse.png" style={{ transform: "rotate(180deg)" }} className="img-collapse" />
                </div>
                <div className="offset-8 col-3 d-flex justify-content-end">
                    <button onClick={() => {
                        props.setMagiaEditId(props.magia.magiaId);
                        props.setTrigger(true);
                    }} className="btn-magia-list me-3"><img className="img-icon-acoes" src="/trpg/Images/ic_edit.png" alt="edit-icon" height={30} /></button>
                    <button onClick={() => {
                        props.arrayMagias.splice([IndexMagiaId(props.magia.magiaId)], 1);
                        navigate("#");
                    }} className="btn-magia-list ms-3"><img className="img-icon-acoes" src="/trpg/Images/ic_delete.png" alt="delete-icon" height={30} /></button>
                </div>
            </div>

            <div className="col-6"> {/* Nome */}
                <label>Nome</label>
                <input value={props.magia.magiaNome} type="text" className="form-control form-magia-list" placeholder="" disabled />
            </div>
            <div className="col-6"> {/* Escola */}
                <label>Escola</label>
                <input value={props.magia.magiaEscola} type="text" className="form-control form-magia-list" placeholder="" disabled />
            </div>
            <div className="col-4"> {/* Execução */}
                <label>Execução</label>
                <input value={props.magia.magiaExecucao} type="text" className="form-control form-magia-list" placeholder="" disabled />
            </div>
            <div className="col-4"> {/* Alcance */}
                <label>Alcance</label>
                <input value={props.magia.magiaAlcance} type="text" className="form-control form-magia-list" placeholder="" disabled />
            </div>
            <div className="col-4"> {/* Alvo */}
                <label>Alvo</label>
                <input value={props.magia.magiaAlvo} type="text" className="form-control form-magia-list" placeholder="" disabled />
            </div>
            <div className="col-6"> {/* Duração */}
                <label>Duração</label>
                <input value={props.magia.magiaDuracao} type="text" className="form-control form-magia-list" placeholder="" disabled />
            </div>
            <div className="col-6"> {/* Resistência */}
                <label>Resistência</label>
                <input value={props.magia.magiaResistencia} type="text" className="form-control form-magia-list" placeholder="" disabled />
            </div>
            <div className="col-12"> {/* Descrição */}
                <label>Descrição</label>
                <textarea value={props.magia.magiaDescricao} type="text" className="form-control form-magia-list" placeholder="" disabled />
            </div>
        </div>
}