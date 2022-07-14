import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Utilizadores from "./pages/Utilizadores";
import Sobre from "./pages/Sobre";
import Filmes from "./pages/Filmes";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Index/>} />
                <Route path="/Utilizadores" element={<Utilizadores/>} />
                <Route path="/Sobre" element={<Sobre/>} />
                <Route path="/Filmes" element={<Filmes/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;