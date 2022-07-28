import React from "react";
import "../pages.css";

export default function RollDiceContainer(props) {

    return <div className="row">

        {
            props.arrayDados.map(valor =>
                <div className={props.rollAnimation ? "div-dado roll-dice-animation-div" : "div-dado"} key={Math.random() * 99}>
                    <label className="lbl-dado">{valor}</label>
                </div>
            )
        }
    </div>
}