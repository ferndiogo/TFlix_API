import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Utilizadores from "./pages/Utilizadores";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Index/>} />
                <Route path="/Utilizadores" element={<Utilizadores/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;