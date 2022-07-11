import React, { useState, useEffect } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoUsers from './assets/user.jpg';

function App() {

  const baseUrl = "https://localhost:44365/API/UtilizadoresAPI";

  const [data, setData] = useState([]);

  const pedidoGet = async() => {
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    pedidoGet();
  })

  return (
    <div className="utilizadores-container">
      <br />
      <h3>Criação de Utilizadores</h3>
      <header>
        <img src={logoUsers} alt='Utilizadores'/>
        <button className="btn btn-success">Criar Utilizador</button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>NIF</th>
            <th>Morada</th>
            <th>País</th>
            <th>Código Postal</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Subscrição</th>
            <th>Aluguer</th>
            <th>Função</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(utilizador =>(
            <tr key={utilizador.id}>
              <td>{utilizador.id}</td>
              <td>{utilizador.nome}</td>
              <td>{utilizador.email}</td>
              <td>{utilizador.nif}</td>
              <td>{utilizador.morada}</td>
              <td>{utilizador.pais}</td>
              <td>{utilizador.codPostal}</td>
              <td>{utilizador.sexo}</td>
              <td>{utilizador.dataNasc}</td>
              <td>{utilizador.subscricoes}</td>
              <td>{utilizador.aluguer}</td>
              <td>{utilizador.userF}</td>
              <td>
                <button className="btn btn-primary">Editar</button> {"   "}
                <button className="btn btn-danger">Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
