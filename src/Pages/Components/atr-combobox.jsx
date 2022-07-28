import React from "react";
import "../pages.css";

export default function AtrCombobox(props) {
    return <select onChange={props.setValue} className="combobox-atr" name="atr" value={
        props.defaultValue === "for"
            ?  "for"
            : props.defaultValue === "des"
                ?  "des"
                : props.defaultValue === "con"
                    ?  "con"
                    : props.defaultValue === "int"
                        ?  "int"
                        : props.defaultValue === "sab"
                            ?  "sab"
                            : props.defaultValue === "car"
                                ?  "car"
                                : console.log("erroAtr", props.defaultValue)
    }>
        <option value="for">FOR</option>
        <option value="des">DES</option>
        <option value="con">CON</option>
        <option value="int">INT</option>
        <option value="sab">SAB</option>
        <option value="car">CAR</option>
    </select >
}