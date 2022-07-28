import React, { useState, useEffect } from "react";
import SheetsList from "./Components/sheets-list";
import Navbar from "./Components/navbar";
import db from "./Config/firebase";
import Swal from "sweetalert2"
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { UserContext } from "./Context/user";
import "./pages.css";

export default function Home() {
    let filterSheets = [];

    const [sheets, setSheets] = useState([]);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");
    const [deleted, setDeleted] = useState("");
    const { userId } = React.useContext(UserContext);

    const swalDialogDeleteSheet = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger me-3"
        },
        buttonsStyling: false
    })

    function DeleteSheet(id) {
        deleteDoc(doc(db, "fichas", id)).then(() => {
            setDeleted(id);
        });
    }

    function DialogDeleteSheet(id) {
        swalDialogDeleteSheet.fire({
            title: "Tem certeza?",
            text: "O cliente " + id + " será deletado. Essa ação não poderá ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, delete!",
            cancelButtonText: "Não, cancele!",
            reverseButtons: true,
            background: "#000",
            color: "#FFF",
        }).then((result) => {
            if (result.isConfirmed) {
                swalDialogDeleteSheet.fire({
                    title: "Deletado!",
                    text: "O cliente " + id + " foi deletado.",
                    icon: "success",
                    background: "#000",
                    color: "#FFF",
                })
                DeleteSheet(id);
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalDialogDeleteSheet.fire({
                    title: "Cancelado!",
                    text: "A ação foi cancelada, o cliente " + id + " não foi deletado!",
                    icon: "error",
                    background: "#000",
                    color: "#FFF"
                })
            }
        })

    }

    useEffect(() => {
        getDocs(query(collection(db, "fichas"))).then(sheets => {
            sheets.docs.map(sheet => {
                if (userId === "VeFsNvzM0FaYmlEJP3JGwLZC03D2") {
                    filterSheets.push({
                        id: sheet.id,
                        personagem: sheet.data().personagem,
                        jogador: sheet.data().jogador,
                        campanha: sheet.data().campanha,
                    });
                } else if (sheet.data().userId === userId && sheet.data().personagem.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
                    filterSheets.push({
                        id: sheet.id,
                        personagem: sheet.data().personagem,
                        jogador: sheet.data().jogador,
                        campanha: sheet.data().campanha,
                    });
                }
            })
            if (filterSheets.length === 0) {
                setMessage("Nenhuma ficha cadastrada!")
            } else {
                setMessage("");
            }
            setSheets(filterSheets);
        })
    }, [search, deleted])

    return <section className="section-default" id="section-home">
        <Navbar />
        <div className="container-fluid div-home">
            <div className="row">
                <h1>Fichas</h1>
            </div>
            <div className="row mb-3">
                <div className="col-3 col-new-sheet">
                    <Link to={"/trpg/novaficha"} className="w-100 btn btn-success">Nova ficha</Link>
                </div>
                <div className="col-9">
                    <input onChange={e => setSearch(e.target.value)} type="search" className="w-75 form-control ms-auto" placeholder="Pesquisar por personagem" />
                </div>
            </div>
            <div className="text-center">
                <SheetsList arraySheets={sheets} DeleteSheet={DialogDeleteSheet} />
                {
                    message !== "" ? <div className="alert alert-primary text-center mt-2"> {message} </div> : null
                }
            </div>
        </div>


    </section>
}