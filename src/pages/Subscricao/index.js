import React, { useState, useEffect } from 'react';
import './styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import iconSubs from './iconSubs.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



function Subscricao() {

    const [data1, setData1] = useState([]);

    const baseUrl1 = "https://localhost:7198/api/utilizadoresapi";

    const [updateData1, setUpdateData1] = useState(true);

    const [data2, setData2] = useState([]);

    const baseUrl2 = "https://localhost:7198/api/filmesapi";

    const [updateData2, setUpdateData2] = useState(true);

    const [data3, setData3] = useState([]);

    const baseUrl3 = "https://localhost:7198/api/seriesapi";

    const [updateData3, setUpdateData3] = useState(true);

    const baseUrl = "https://localhost:7198/api/subscricaoesapi";

    const [data, setData] = useState([]);

    const [updateData, setUpdateData] = useState(true);

    const [modalAdicionar, setModalAdicionar] = useState(false);

    const [modalEditar, setModalEditar] = useState(false);

    const [modalApagar, setModalApagar] = useState(false);

    const [modalCriado, setModalCriado] = useState(false);

    const [modalEditado, setModalEditado] = useState(false);

    const [subscricaoelecionada, setSubscricaoelecionada] = useState(
        {
            id: '',
            utilizador: '',
            duracao: null,
            preco: null,
            auxPreco: null,
            dataInicio: null,
            dataFim: null,
            filmes: '',
            series: '',
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
        setSubscricaoelecionada(aluguer);
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
        setSubscricaoelecionada({
            ...subscricaoelecionada, [name]: value
        });
        console.log(subscricaoelecionada);
    }

    const handleUtilizadorChange = (e) => {
        setSubscricaoelecionada({
            ...subscricaoelecionada, utilizador: e.target.value
        });
        console.log(subscricaoelecionada);
    }

    const handleFilmeChange = (e) => {
        setSubscricaoelecionada({
            ...subscricaoelecionada, filmes: e.target.value
        });
        console.log(subscricaoelecionada);
    }

    const handleSerieChange = (e) => {
        setSubscricaoelecionada({
            ...subscricaoelecionada, series: e.target.value
        });
        console.log(subscricaoelecionada);
    }

    const pedidoGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
                console.log(response.data)
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

    const pedidoGet3 = async () => {
        await axios.get(baseUrl3)
            .then(response => {
                setData3(response.data);
            }).catch(error => {
                console.log(error);
            })
    }



    const pedidoPost = async () => {
        delete subscricaoelecionada.id;
        const formData = new FormData();
        formData.append("nomeUtilizador", subscricaoelecionada.nomeUtilizador)
        formData.append("nomeFilme", subscricaoelecionada.nomeFilme)
        formData.append("preco", subscricaoelecionada.preco)
        formData.append("auxPreco", subscricaoelecionada.auxPreco)
        formData.append("dataInicio", subscricaoelecionada.dataInicio)
        formData.append("dataFim", subscricaoelecionada.dataFim)
        axios.post(baseUrl, formData, {
            headers: {
                'Content-Type': 'text/plain'
            }
        }).then(response => {
            setData(data.concat(response.data));
            setUpdateData(true);
            abrirFecharModalAdicionar();
            abrirFecharModalCriado();
        }).catch(error => {
            console.log(error);
        })
    }

    const pedidoPut = async () => {
        await axios.put(baseUrl + "/" + subscricaoelecionada.id, subscricaoelecionada)
            .then(response => {
                var dados = response.data;
                var dadosAux = data;
                dadosAux.map(aluguer => {
                    if (aluguer.id === subscricaoelecionada.id) {
                        aluguer.nomeUtilizador = dados.nomeUtilizador;
                        aluguer.nomeFilme = dados.nomeFilme;
                        aluguer.preco = dados.preco;
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
        await axios.delete(baseUrl + "/" + subscricaoelecionada.id)
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


    //impedir loop pedidoGet
    useEffect(() => {
        if (updateData3) {
            pedidoGet3();
            setUpdateData3(false);
        }
    }, [updateData2])


    return (
        <div className="subscricoes-container">
            <br />
            <Link className="button" to="/">
                <button type="button" className="btn btn-outline-info btn-sm">Voltar</button>
            </Link>
            <br />
            <br />
            <h3>Criação de Aluguers</h3>
            <img src={iconSubs} alt='Alugueres' width="50px" />
            <button className="btn btn-success" onClick={() => abrirFecharModalAdicionar()}><FontAwesomeIcon icon={faPlus} /></button>

            <div>{data.map((subs, i) => (<div>{subs.filmes[i].titulo}</div>
            ))}</div>

            <table className="table table-dark table-striped mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Utilizador</th>
                        <th>Duração</th>
                        <th>Preço</th>
                        <th>Data de Início</th>
                        <th>Data de Fim</th>
                        <th>Filmes</th>
                        <th>Séries</th>
                        <th>Operação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((subscricao, i) => (
                        <tr key={subscricao}>
                            <td>{subscricao.id}</td>
                            <td>{subscricao.utilizador.nome}</td>
                            <td>{subscricao.duracao}</td>
                            <td>{subscricao.preco}</td>
                            <td>{subscricao.dataInicio}</td>
                            <td>{subscricao.dataFim}</td>
                            <td>{subscricao.filmes[i].titulo}</td>
                            <td>{subscricao.series[i].titulo}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => selecionarAluguer(subscricao, "Editar")}><FontAwesomeIcon icon={faEdit} /></button> {"   "}
                                <button className="btn btn-danger" onClick={() => selecionarAluguer(subscricao, "Apagar")}><FontAwesomeIcon icon={faTrash} /></button>
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
                            {data1.map(utilizador => (
                                <option key={utilizador.id} value={utilizador.id}>{utilizador.nome}</option>
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
                        <label>Série:</label>
                        <select className="form-select" onChange={handleSerieChange}>
                            <option value="">Escolha uma série</option>
                            {data3.map(serie => (
                                <option key={serie.id} value={serie.id} >{serie.titulo}</option>
                            ))}
                        </select>
                        <br />
                        <label>Preço:</label>
                        <br />
                        <select className="form-control" onChange={handleChange}>
                            <option value="">Escolha uma opção</option>
                            <option value="10,99">10,99 por 1 mês</option>
                            <option value="39,99">39,99 por 6 meses</option>
                            <option value="69,99">69,99 por 12 meses</option>
                        </select>
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
                        {/* <select className="form-select" onChange={handleUtilizadorChange}>
                            <option value="">{subscricaoelecionada && subscricaoelecionada.nomeUtilizador}</option>
                            {data1.map(filme => (
                                <option key={filme.id} value={filme.nome}>{filme.nome}</option>
                            ))}
                        </select> */}
                        <br />
                        <label>Filme:</label>
                        {/* <select className="form-select" onChange={handleFilmeChange}>
                            <option value="">{subscricaoelecionada && subscricaoelecionada.nomeFilme}</option>
                            {data2.map(filme => (
                                <option key={filme.id} value={filme.titulo} >{filme.titulo}</option>
                            ))}
                        </select> */}
                        <br />
                        <label>Preço:</label>
                        <br />

                        <select class="form-control" onChange={handleChange}>
                            <option value="5,99">5,99 por 1 filme (1 ano)</option>
                        </select>


                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPut()}>Editar</button>
                    <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalApagar}>
                <ModalBody>
                    Confirma a eliminação esta subscrição: {subscricaoelecionada && subscricaoelecionada.id} ?
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


export default Subscricao;
