import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
import NewUser from "./Pages/new-user";
import Home from "./Pages/home";
import Sheet from "./Pages/sheet";
import { AuthContext } from "./Pages/Context/auth";
import ForgotPassword from "./Pages/forgot-password";

export default function App() {

    const { logged } = useContext(AuthContext);

    return <BrowserRouter>
        <Routes>
            <Route exact path="/trpg" element={<Login />} />
            <Route exact path="/trpg/cadastrar" element={<NewUser />} />
            <Route exact path="/trpg/esquecisenha" element={<ForgotPassword />} />
            <Route exact path="/trpg/home" element={logged ? <Home /> : <Login />} />
            <Route exact path="/trpg/novaficha" element={logged ? <Sheet /> : <Login />} />
            <Route exact path="/trpg/editarficha/:id" element={logged ? <Sheet /> : <Login />} />
        </Routes>
    </BrowserRouter>
};