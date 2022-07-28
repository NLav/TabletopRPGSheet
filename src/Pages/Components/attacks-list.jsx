import React, { useState } from "react";
import AttackCollapse from "./attack-collapse";
import "../pages.css";

export default function AttackList(props) {

    return (props.arrayAtaques).length === 0
        ? <div>
            <label className="lbl-nenhum-ataque mt-2 text-center"> Nenhum ataque adicionado </label>
        </div>
        : <div>
            {
                props.arrayAtaques.map(ataque =>

                    <AttackCollapse
                        key={ataque.ataqueId}
                        setTrigger={props.setTrigger}
                        setAtaqueId={props.setAtaqueId}
                        setAtaqueEditId={props.setAtaqueEditId}
                        ataque={ataque}
                        arrayAtaques={props.arrayAtaques}
                    />
                )
            }
        </div>
}