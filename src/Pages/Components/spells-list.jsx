import React, { useState } from "react";
import SpellCollapse from "./spell-collapse";
import "../pages.css";

export default function SpellsList(props) {

    return (props.arrayMagias).length === 0
        ? <div>
            <label className="lbl-nenhuma-magia mt-2 text-center"> Nenhuma magia adicionado </label>
        </div>
        : <div>
            {
                props.arrayMagias.map(magia =>

                    <SpellCollapse
                        key={magia.magiaId}
                        setTrigger={props.setTrigger}
                        setMagiaId={props.setMagiaId}
                        setMagiaEditId={props.setMagiaEditId}
                        magia={magia}
                        arrayMagias={props.arrayMagias}
                    />
                )
            }
        </div>
}