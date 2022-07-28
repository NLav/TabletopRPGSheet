import React, { useEffect, useState } from "react";
import "../pages.css";

export default function SkillsList(props) {
    var treinoValor = 0;

    function RollSkill(total) {

        props.setRolarDadosPopup(true);
        props.setDados(1);
        props.setFaces(20);

        if (total >= 0) {
            props.setModificadorSomar(total)
            props.setModificadorSubtrair(0)
        } else {
            props.setModificadorSomar(0)
            props.setModificadorSubtrair(total * -1)           
        }

        setTimeout(() => props.RollAnimate(props.setRollAnimation), 1);
    }

    return <table className="table table-bordered table-skills text-center mx-auto">
        <thead>
            <tr>
                <th scope="col" className="th-rolar-dado"></th>
                <th scope="col">Treino</th>
                <th scope="col">Nome</th>
                <th scope="col">Total</th>
                <th scope="col">1/2 do Nível</th>
                <th scope="col">Atributo</th>
                <th scope="col">Mod. do atributo</th>
                <th scope="col">Treino</th>
                <th scope="col">Outros</th>
                <th scope="col" className="th-penalidade"></th>
            </tr>
        </thead>
        <tbody>
            {
                props.arraySkills.map(skill => {

                    switch (parseInt(skill.nivelTotal)) {
                        case 1: if (skill.treinado) { treinoValor = 2; } else { treinoValor = 0; }
                            break;
                        case 2: case 3: if (skill.treinado) { treinoValor = 3; } else { treinoValor = 1; }
                            break;
                        case 4: case 5: if (skill.treinado) { treinoValor = 4; } else { treinoValor = 2; }
                            break;
                        case 6: if (skill.treinado) { treinoValor = 5; } else { treinoValor = 3; }
                            break;
                        case 7: if (skill.treinado) { treinoValor = 7; } else { treinoValor = 3; }
                            break;
                        case 8: case 9: if (skill.treinado) { treinoValor = 8; } else { treinoValor = 4; }
                            break;
                        case 10: case 11: if (skill.treinado) { treinoValor = 9; } else { treinoValor = 5; }
                            break;
                        case 12: case 13: if (skill.treinado) { treinoValor = 10; } else { treinoValor = 6; }
                            break;
                        case 14: if (skill.treinado) { treinoValor = 11; } else { treinoValor = 7; }
                            break;
                        case 15: if (skill.treinado) { treinoValor = 13; } else { treinoValor = 7; }
                            break;
                        case 16: case 17: if (skill.treinado) { treinoValor = 14; } else { treinoValor = 8; }
                            break;
                        case 18: case 19: if (skill.treinado) { treinoValor = 15; } else { treinoValor = 9; }
                            break;
                        case 20: if (skill.treinado) { treinoValor = 16; } else { treinoValor = 10; }
                            break;

                        default: if (skill.treinado) { treinoValor = 16; } else { treinoValor = 10; }
                            break;
                    }

                    {
                        var total = skill.nome === "Acrobacia ÷"
                            ? Math.round((props.nivel / 2) - 0.01) + skill.modAtributo + treinoValor + skill.outrosValor - props.armaduraPenalidade - props.escudoPenalidade
                            : skill.nome === "Furtividade ÷"
                                ? Math.round((props.nivel / 2) - 0.01) + skill.modAtributo + treinoValor + skill.outrosValor - props.armaduraPenalidade - props.escudoPenalidade
                                : skill.nome === "Ladinagem *÷"
                                    ? Math.round((props.nivel / 2) - 0.01) + skill.modAtributo + treinoValor + skill.outrosValor - props.armaduraPenalidade - props.escudoPenalidade
                                    : Math.round((props.nivel / 2) - 0.01) + skill.modAtributo + treinoValor + skill.outrosValor
                    }

                    return <tr key={skill.nome}>

                        <td scope="col" onClick={() => RollSkill(total)} className="td-pericias td-rolar-dado"><img className="img-rolar-dado" src="/trpg/Images/ic_roll-dice.png" height="12px" /></td>
                        <td scope="col" className="td-pericias td-treino-cb">{skill.treinoInput}</td>
                        <td scope="col" className="td-pericias">{skill.nome}</td>
                        <td scope="col" className="td-pericias">{total}</td>
                        <td scope="col" className="td-pericias">{Math.round((props.nivel / 2) - 0.01)}</td>
                        <td scope="col" className="td-pericias">{skill.atributo}</td>
                        <td scope="col" className="td-pericias">{skill.modAtributo}</td>
                        <td scope="col" className="td-pericias">{treinoValor}</td>
                        <td scope="col" className="td-pericias">{skill.outrosInput}</td>
                        {
                            skill.nome === "Acrobacia ÷"
                                ? <td scope="col" className="td-pericias td-penalidade">{"-" + (parseInt(props.armaduraPenalidade) + parseInt(props.escudoPenalidade))}</td>
                                : skill.nome === "Furtividade ÷"
                                    ? <td scope="col" className="td-pericias td-penalidade">{"-" + (parseInt(props.armaduraPenalidade) + parseInt(props.escudoPenalidade))}</td>
                                    : skill.nome === "Ladinagem *÷"
                                        ? <td scope="col" className="td-pericias td-penalidade">{"-" + (parseInt(props.armaduraPenalidade) + parseInt(props.escudoPenalidade))}</td>
                                        : <td scope="col" className="td-pericias td-penalidade"></td>
                        }
                    </tr>
                })
            }
        </tbody>
    </table>
}