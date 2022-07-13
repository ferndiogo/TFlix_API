import React, { useState, useEffect } from 'react';
import './styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoUsers from './user.jpg';

function Utilizadores() {

    const baseUrl = "https://localhost:7198/API/UtilizadoresAPI";

    const [data, setData] = useState([]);

    const [updateData, setUpdateData] = useState(true);

    const [modalAdicionar, setModalAdicionar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalApagar, setModalApagar] = useState(false);

    const [utilizadorSelecionado, setUtilizadorSelecionado] = useState(
        {
            id: '',
            nome: '',
            email: '',
            nif: '',
            morada: '',
            pais: '',
            codPostal: '',
            sexo: '',
            dataNasc: '',
            userF: '',
        }
    )

    const selecionarUtilizador = (utilizador, opcao) => {
        setUtilizadorSelecionado(utilizador);
        (opcao === "Editar") ?
            abrirFecharModalEditar() : abrirFecharModalApagar();
    }

    const abrirFecharModalAdicionar = () => {
        setModalAdicionar(!modalAdicionar);
    }

    const abrirFecharModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirFecharModalApagar = () => {
        setModalApagar(!modalApagar);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setUtilizadorSelecionado({
            ...utilizadorSelecionado, [name]: value
        });
        console.log(utilizadorSelecionado);
    }

    const pedidoGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoPost = async () => {
        delete utilizadorSelecionado.id;
        await axios.post(baseUrl, utilizadorSelecionado)
            .then(response => {
                setData(data.concat(response.data));
                setUpdateData(true);
                abrirFecharModalAdicionar();
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoPut = async () => {
        await axios.put(baseUrl + "/" + utilizadorSelecionado.id, utilizadorSelecionado)
            .then(response => {
                var dados = response.data;
                var dadosAux = data;
                dadosAux.map(utilizador => {
                    if (utilizador.id === utilizadorSelecionado.id) {
                        utilizador.nome = dados.nome;
                        utilizador.email = dados.email;
                        utilizador.nif = dados.nif;
                        utilizador.morada = dados.morada;
                        utilizador.pais = dados.pais;
                        utilizador.codPostal = dados.codPostal;
                        utilizador.sexo = dados.sexo;
                        utilizador.dataNasc = dados.dataNasc;
                        utilizador.userF = dados.userF;
                    }
                });
                setUpdateData(true);
                abrirFecharModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoDelete = async () => {
        await axios.delete(baseUrl + "/" + utilizadorSelecionado.id)
            .then(response => {
                setData(data.filter(utilizador => utilizador.id !== response.data));
                setUpdateData(true);
                abrirFecharModalApagar();
            }).catch(error => {
                console.log(error);
            })
    }

    //impedir loop pedidoGet
    useEffect(() => {
        if (updateData) {
            pedidoGet();
            setUpdateData(false);
        }
    }, [updateData])

    return (
        <div className="utilizadores-container">
            <br />
            <h3>Criação de Utilizadores</h3>
            <header>
                <img src={logoUsers} alt='Utilizadores' />
                <button className="btn btn-success" onClick={() => abrirFecharModalAdicionar()}>Criar Utilizador</button>
            </header>
            <table className="table table-striped table-sucess">
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
                        <th>Função</th>
                        <th>Operação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(utilizador => (
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
                            <td>{utilizador.userF}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => selecionarUtilizador(utilizador, "Editar")}>Editar</button> {"   "}
                                <button className="btn btn-danger" onClick={() => selecionarUtilizador(utilizador, "Apagar")}>Apagar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalAdicionar}>
                <ModalHeader>Adicionar Utilizador</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome:</label>
                        <br />
                        <input type="text" className="form-control" name="nome" onChange={handleChange} />
                        <br />
                        <label>Email:</label>
                        <br />
                        <input type="text" className="form-control" name="email" onChange={handleChange} />
                        <br />
                        <label>NIF:</label>
                        <br />
                        <input type="text" className="form-control" name="nif" onChange={handleChange} />
                        <br />
                        <label>Morada:</label>
                        <br />
                        <input type="text" className="form-control" name="morada" onChange={handleChange} />
                        <br />
                        <label>País:</label>
                        <br />
                        <input type="text" className="form-control" name="pais" onChange={handleChange} />
                        <br />
                        <label>Código Postal:</label>
                        <br />
                        <input type="text" className="form-control" name="codPostal" onChange={handleChange} />
                        <br />
                        <label>Sexo:</label>
                        <br />
                        <input type="text" className="form-control" name="sexo" onChange={handleChange} />
                        <br />
                        <label>Data de Nascimento:</label>
                        <br />
                        <input type="date" className="form-control" name="dataNasc" onChange={handleChange} />
                        <br />
                        <label>Função:</label>
                        <br />
                        <input type="text" className="form-control" name="userF" onChange={handleChange} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPost()}>Adicionar</button>
                    <button className="btn btn-danger" onClick={() => abrirFecharModalAdicionar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Utilizador</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Id:</label>
                        <input type="text" className="form-control" readOnly value={utilizadorSelecionado && utilizadorSelecionado.id} />
                        <br />
                        <label>Nome:</label>
                        <br />
                        <input type="text" className="form-control" name="nome" onChange={handleChange}
                            value={utilizadorSelecionado && utilizadorSelecionado.nome} />
                        <br />
                        <label>Email:</label>
                        <br />
                        <input type="text" className="form-control" name="email" onChange={handleChange}
                            value={utilizadorSelecionado && utilizadorSelecionado.email} />
                        <br />
                        <label>NIF:</label>
                        <br />
                        <input type="text" className="form-control" name="nif" onChange={handleChange}
                            value={utilizadorSelecionado && utilizadorSelecionado.nif} />
                        <br />
                        <label>Morada:</label>
                        <br />
                        <input type="text" className="form-control" name="morada" onChange={handleChange}
                            value={utilizadorSelecionado && utilizadorSelecionado.morada} />
                        <br />
                        <label>País:</label>
                        <br />
                        <input type="text" className="form-control" name="pais" onChange={handleChange}
                            value={utilizadorSelecionado && utilizadorSelecionado.pais} />
                        <br />
                        <label>Código Postal:</label>
                        <br />
                        <input type="text" className="form-control" name="codPostal" onChange={handleChange}
                            value={utilizadorSelecionado && utilizadorSelecionado.codPostal} />
                        <br />
                        <label>Sexo:</label>
                        <br />
                        <input type="text" className="form-control" name="sexo" onChange={handleChange}
                            value={utilizadorSelecionado && utilizadorSelecionado.sexo} />
                        <br />
                        <label>Data de Nascimento:</label>
                        <br />
                        <input type="date" className="form-control" name="dataNasc" onChange={handleChange}
                            value={utilizadorSelecionado && utilizadorSelecionado.dataNasc} />
                        <br />
                        <label>Função:</label>
                        <br />
                        <input type="text" className="form-control" name="userF" onChange={handleChange}
                            value={utilizadorSelecionado && utilizadorSelecionado.userF} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPut()}>Editar</button>
                    <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalApagar}>
                <ModalBody>
                    Confirma a eliminação deste utilizador: {utilizadorSelecionado && utilizadorSelecionado.nome} ?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => pedidoDelete()}>Sim</button>
                    <button className="btn btn-secondary" onClick={() => abrirFecharModalApagar()}>Não</button>
                </ModalFooter>
            </Modal>


        </div>
    );
}


export default Utilizadores;
