import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Utilizadores from "./pages/Utilizadores";
import Sobre from "./pages/Sobre";
import Filmes from "./pages/Filmes";
import Series from "./pages/Series";
import Alugueres from "./pages/Alugueres";
import Exemplos from "./pages/Exemplos/App";
import Subscricao from "./pages/Subscricao";

function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Index/>} />
                <Route path="/Utilizadores" element={<Utilizadores/>} />
                <Route path="/Sobre" element={<Sobre/>} />
                <Route path="/Filmes" element={<Filmes/>} />
                <Route path="/Series" element={<Series/>} />
                <Route path="/Alugueres" element={<Alugueres/>} />
                <Route path="/Subscricao" element={<Subscricao/>} />
                <Route path="/Exemplos" element={<Exemplos/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;