import React, { useState } from "react";
import ItemCollapse from "./item-collapse";
import "../pages.css";

export default function ItemList(props) {

    return (props.arrayItens).length === 0
        ? <div>
            <label className="lbl-nenhum-item mt-2 text-center"> Nenhum item adicionado </label>
        </div>
        : <div>
            {
                props.arrayItens.map(item =>

                    <ItemCollapse
                        key={item.itemId}
                        setTrigger={props.setTrigger}
                        setItemId={props.setItemId}
                        setItemEditId={props.setItemEditId}
                        item={item}
                        arrayItems={props.arrayItems}
                    />
                )
            }
        </div>
}