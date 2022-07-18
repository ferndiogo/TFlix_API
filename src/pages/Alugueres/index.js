import React, { useState, useEffect } from 'react';
import './styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import iconAluga from './iconAluga.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



function Alugueres() {

    const [data1, setData1] = useState([]);

    const baseUrl1 = "https://localhost:7198/api/utilizadoresapi";

    const [updateData1, setUpdateData1] = useState(true);

    const [data2, setData2] = useState([]);

    const baseUrl2 = "https://localhost:7198/api/filmesapi";

    const [updateData2, setUpdateData2] = useState(true);

    const baseUrl = "https://localhost:7198/api/aluguersapi";

    const [data, setData] = useState([]);

    const [updateData, setUpdateData] = useState(true);

    const [modalAdicionar, setModalAdicionar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalApagar, setModalApagar] = useState(false);

    const [modalCriado, setModalCriado] = useState(false);

    const [modalEditado, setModalEditado] = useState(false);

    const [aluguerSelecionado, setAluguerSelecionado] = useState(
        {
            id: '',
            nomeUtilizador: '',
            nomeFilme: '',
            preco: null,
            auxPreco: '',
            dataInicio: null,
            dataFim: null,
        }
    )

    // const [dataUtlz, setDatatlz] = useState([]);

    // const [updateDatatlz, setUpdateDatatlz] = useState(true);


    // const [utilizadorSelecionado, setUtilizadorSelecionado] = useState(
    //     {
    //         id: '',
    //         nome: '',
    //         email: '',
    //         nif: '',
    //         morada: '',
    //         pais: '',
    //         codPostal: '',
    //         sexo: '',
    //         dataNasc: '',
    //         userF: '',
    //     }
    // )

    // //impedir loop pedidoGet
    // useEffect(() => {
    //     if (updateDatatlz) {
    //         pedidoGetUtlz();
    //         setUpdateDatatlz(false);
    //     }
    // }, [updateDatatlz])






    const selecionarAluguer = (aluguer, opcao) => {
        setAluguerSelecionado(aluguer);
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

    const abrirFecharModalCriado = () => {
        setModalCriado(!modalCriado);
    }

    const abrirFecharModalEditado = () => {
        setModalEditado(!modalEditado);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setAluguerSelecionado({
          ...aluguerSelecionado, [name]: value
        });
        console.log(aluguerSelecionado);
      }

    const handleUtilizadorChange = (e) => {
        setAluguerSelecionado({
            ...aluguerSelecionado, nomeUtilizador: e.target.value
        });
        console.log(aluguerSelecionado);
    }

    const handleFilmeChange = (e) => {
        setAluguerSelecionado({
            ...aluguerSelecionado, nomeFilme: e.target.value
        });
        console.log(aluguerSelecionado);
    }

    const pedidoGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoGet1 = async () => {
        await axios.get(baseUrl1)
            .then(response => {
                setData1(response.data);
            }).catch(error => {
                console.log(error);
            })
    }


    const pedidoGet2 = async () => {
        await axios.get(baseUrl2)
            .then(response => {
                setData2(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const pedidoPost = async () => {
        delete aluguerSelecionado.id;
        const formData = new FormData();
        formData.append("nomeUtilizador", aluguerSelecionado.nomeUtilizador)
        formData.append("nomeFilme", aluguerSelecionado.nomeFilme)
        formData.append("preco", aluguerSelecionado.preco)
        formData.append("auxPreco", aluguerSelecionado.auxPreco)
        formData.append("dataInicio", aluguerSelecionado.dataInicio)
        formData.append("dataFim", aluguerSelecionado.dataFim)
        axios.post(baseUrl, formData)
        .then(response => {
            setData(data.concat(response.data));
            setUpdateData(true);
            abrirFecharModalAdicionar();
            abrirFecharModalCriado();
        }).catch(error => {
            console.log(error);
        })
    }

    const pedidoPut = async () => {
        await axios.put(baseUrl + "/" + aluguerSelecionado.id, aluguerSelecionado)
            .then(response => {
                var dados = response.data;
                var dadosAux = data;
                dadosAux.map(aluguer => {
                    if (aluguer.id === aluguerSelecionado.id) {
                        aluguer.nomeUtilizador = dados.nomeUtilizador;
                        aluguer.nomeFilme = dados.nomeFilme;
                        aluguer.preco = dados.preco;
                        aluguer.auxPreco = dados.auxPreco;
                        aluguer.dataInicio = dados.dataInicio;
                        aluguer.dataFim = dados.dataFim;
                    }
                });
                setUpdateData(true);
                abrirFecharModalEditar();
                abrirFecharModalEditado();
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoDelete = async () => {
        await axios.delete(baseUrl + "/" + aluguerSelecionado.id)
            .then(response => {
                setData(data.filter(aluguer => aluguer.id !== response.data));
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

    //impedir loop pedidoGet
    useEffect(() => {
        if (updateData1) {
            pedidoGet1();
            setUpdateData1(false);
        }
    }, [updateData1])



    //impedir loop pedidoGet
    useEffect(() => {
        if (updateData2) {
            pedidoGet2();
            setUpdateData2(false);
        }
    }, [updateData2])


    return (
        <div className="utilizadores-container">
            <br />
            <Link className="button" to="/">
                <button type="button" className="btn btn-outline-info btn-sm">Voltar</button>
            </Link>
            <br />
            <br />
            <h3>Criação de Aluguers</h3>
            <img src={iconAluga} alt='Alugueres' width="50px" />
            <button className="btn btn-success" onClick={() => abrirFecharModalAdicionar()}><FontAwesomeIcon icon={faPlus} /></button>

            <table className="table table-dark table-striped mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Utilizador</th>
                        <th>Filme</th>
                        <th>Preço</th>
                        <th>Data de Início</th>
                        <th>Data de Fim</th>
                        <th>Operação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(aluguer => (
                        <tr key={aluguer.id}>
                            <td>{aluguer.id}</td>
                            <td>{aluguer.nomeUtilizador}</td>
                            <td>{aluguer.nomeFilme}</td>
                            <td>{aluguer.preco}</td>
                            <td>{aluguer.dataInicio}</td>
                            <td>{aluguer.dataFim}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => selecionarAluguer(aluguer, "Editar")}><FontAwesomeIcon icon={faEdit} /></button> {"   "}
                                <button className="btn btn-danger" onClick={() => selecionarAluguer(aluguer, "Apagar")}><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalAdicionar}>
                <ModalHeader>Adicionar Utilizador</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Utilizador:</label>
                        <br />
                    
                        <select className="form-select" onChange={handleUtilizadorChange}>
                            <option value="">Escolha um utilizador</option>
                            {data1.map(filme => (
                                <option key={filme.id} value={filme.id}>{filme.nome}</option>
                            ))}
                        </select> 
                        <br />
                        <label>Filme:</label>

                        <select className="form-select" onChange={handleFilmeChange}>
                            <option value="">Escolha um flme</option>
                            {data2.map(filme => (
                                <option key={filme.id} value={filme.id} >{filme.titulo}</option>
                            ))}
                        </select> 
                        <br />
                        <label>aux Preço:</label>
                        <br />
                        <input type="text" className="form-control" name="auxPreco" onChange={handleChange} />

                        <label>Preço:</label>
                        <br />
                        <input type="text" className="form-control" name="preco" onChange={handleChange} />

                        <label>data i:</label>
                        <br />
                        <input type="date" className="form-control" name="dataInicio" onChange={handleChange} />

                        <label>data f:</label>
                        <br />
                        <input type="date" className="form-control" name="dataFim" onChange={handleChange} />
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
                        <label>Utilizador:</label>
                        <br />
                        <select className="form-select" onChange={handleUtilizadorChange}>
                            <option value="">{aluguerSelecionado && aluguerSelecionado.nomeUtilizador}</option>
                            {data1.map(filme => (
                                <option key={filme.id} value={filme.nome}>{filme.nome}</option>
                            ))}
                        </select>
                        <br />
                        <label>Filme:</label>
                        <select className="form-select" onChange={handleFilmeChange}>
                            <option value="">{aluguerSelecionado && aluguerSelecionado.nomeFilme}</option>
                            {data2.map(filme => (
                                <option key={filme.id} value={filme.titulo} >{filme.titulo}</option>
                            ))}
                        </select>
                        <br />
                        <label>Preço:</label>
                        <br />
                        <input type="text" className="form-control" name="auxPreco" onChange={handleChange} />
                        {/* <select className="form-control" onChange={handlePrecoChange}>
                            <option value="5,99">5,99 por 1 filme (1 ano)</option>
                        </select> */}


                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPut()}>Editar</button>
                    <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalApagar}>
                <ModalBody>
                    Confirma a eliminação esta subscrição: {aluguerSelecionado && aluguerSelecionado.id} ?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => pedidoDelete()}>Sim</button>
                    <button className="btn btn-secondary" onClick={() => abrirFecharModalApagar()}>Não</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalCriado}>
                <ModalHeader>Utilizador Adicionado</ModalHeader>
                <ModalBody>
                    <div>O utilizador que introduziu foi adicionado com sucesso!</div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => abrirFecharModalCriado()}><FontAwesomeIcon icon={faCheck} /></button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditado}>
                <ModalHeader>Utilizador Editado</ModalHeader>
                <ModalBody>
                    <div>O utilizador foi editado com sucesso!</div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => abrirFecharModalEditado()}><FontAwesomeIcon icon={faCheck} /></button>
                </ModalFooter>
            </Modal>

        </div>
    );
}


export default Alugueres;
