import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SheetsList(props) {

    let navigate = useNavigate();

    return <table className="table table-dark table-hover table-bordered mx-auto">
        <thead>
            <tr>
                <th scope="col">Código</th>
                <th scope="col">Personagem</th>
                <th scope="col">Jogador</th>
                <th scope="col">Campanha</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            {
                props.arraySheets.map(sheet =>
                    <tr key={sheet.id}>
                        <th onClick={() => navigate("/trpg/editarficha/" + sheet.id)} scope="col">{sheet.id}</th>
                        <th onClick={() => navigate("/trpg/editarficha/" + sheet.id)} scope="col">{sheet.personagem}</th>
                        <th onClick={() => navigate("/trpg/editarficha/" + sheet.id)} scope="col">{sheet.jogador}</th>
                        <th onClick={() => navigate("/trpg/editarficha/" + sheet.id)} scope="col">{sheet.campanha}</th>
                        <th scope="col" className="text-center">
                            <Link to={"/trpg/editarficha/" + sheet.id} className="me-3"><img className="img-icon-acoes" src="/trpg/Images/ic_edit.png" alt="edit-icon" height={20} /></Link>
                            <Link to="#" onClick={() => props.DeleteSheet(sheet.id)} className="ms-3"><img className="img-icon-acoes" src="/trpg/Images/ic_delete.png" alt="delete-icon" height={20} /></Link>
                        </th>
                    </tr>
                )
            }
        </tbody>
    </table>
}