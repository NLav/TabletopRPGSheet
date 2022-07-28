import React from "react";

export default function ItemsTotalWeight(props) {

    var pesoTotal = 0;

    for (var i = 0; i < props.arrayItens.length; i++) {
        pesoTotal = pesoTotal + parseInt(props.arrayItens[i]["itemPeso"]);
    }

    return pesoTotal
}