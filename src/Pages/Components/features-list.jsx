import React, { useState } from "react";
import FeatureCollapse from "./feature-collapse";
import "../pages.css";

export default function FeaturesList(props) {

    return (props.arrayHabilidades).length === 0
        ? <div>
            <label className="lbl-nenhuma-habilidade mt-2 text-center"> Nenhuma habilidade adicionado </label>
        </div>
        : <div>
            {
                props.arrayHabilidades.map(habilidade =>

                    <FeatureCollapse
                        key={habilidade.habilidadeId}
                        setTrigger={props.setTrigger}
                        setHabilidadeId={props.setHabilidadeId}
                        setHabilidadeEditId={props.setHabilidadeEditId}
                        habilidade={habilidade}
                        arrayHabilidades={props.arrayHabilidades}
                    />
                )
            }
        </div>
}