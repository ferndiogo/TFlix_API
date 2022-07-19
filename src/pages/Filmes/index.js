import React, { useState, useEffect } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

import iconFilmes from './iconFilmes.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';


import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


function Filmes() {

  const baseUrl = "https://tflix.azurewebsites.net/api/filmesapi";

  const [data, setData] = useState([]);

  const [updateData, setUpdateData] = useState(true);

  const [modalAdicionar, setModalAdicionar] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  const [modalApagar, setModalApagar] = useState(false);

  const [modalCriado, setModalCriado] = useState(false);

  const [modalEditado, setModalEditado] = useState(false);

  const [filmeSelecionado, setFilmeSelecionado] = useState(
    {
      id: '',
      titulo: '',
      imagem: null,
      sinopse: '',
      dataLancamento: '',
      classificacao: '',
      elenco: '',
      genero: '',
    }
  )

  const selecionarFilme = (filme, opcao) => {
    setFilmeSelecionado(filme);
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
    setFilmeSelecionado({
      ...filmeSelecionado, [name]: value
    });
    console.log(filmeSelecionado);
  }

  const handleImagemChange = (e) => {
    setFilmeSelecionado({
      ...filmeSelecionado, imagem: e.target.files[0]
    });
    console.log(filmeSelecionado);
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
    delete filmeSelecionado.id;
    const formData = new FormData();
    formData.append("titulo", filmeSelecionado.titulo)
    formData.append("imagem", filmeSelecionado.imagem)
    formData.append("sinopse", filmeSelecionado.sinopse)
    formData.append("dataLancamento", filmeSelecionado.dataLancamento)
    formData.append("classificacao", filmeSelecionado.classificacao)
    formData.append("elenco", filmeSelecionado.elenco)
    formData.append("genero", filmeSelecionado.genero)
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
    axios.put(baseUrl + "/" + filmeSelecionado.id, filmeSelecionado)
      .then(response => {
        var dados = response.data;
        var dadosAux = data;
        dadosAux.map(filme => {
          if (filme.id === filmeSelecionado.id) {
            filme.titulo = dados.titulo;
            filme.imagem = dados.imagem;
            filme.sinopse = dados.sinopse;
            filme.dataLancamento = dados.dataLancamento;
            filme.classificacao = dados.classificacao;
            filme.elenco = dados.elenco;
            filme.genero = dados.genero;
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
    await axios.delete(baseUrl + "/" + filmeSelecionado.id)
      .then(response => {
        setData(data.filter(filme => filme.id !== response.data));
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
    <div className="filmes-container">
      <br />
      <Link className="button" to="/">
        <button type="button" className="btn btn-outline-info btn-sm">Voltar</button>
      </Link>
      <br />
      <br />
      <h3>Adicionar Filmes</h3>
      <img src={iconFilmes} alt='Filmes' width="50px" />
      <button className="btn btn-success" onClick={() => abrirFecharModalAdicionar()}><FontAwesomeIcon icon={faPlus} /></button>
      <table className="table table-dark table-striped mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Imagem</th>
            <th>Sinopse</th>
            <th>Data de Lançamento</th>
            <th>Classificação</th>
            <th>Elenco</th>
            <th>Género</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(filme => (
            <tr key={filme.id}>
              <td>{filme.id}</td>
              <td>{filme.titulo}</td>
              <td><img src={'https://tflix.azurewebsites.net/Fotos/Filmes/' + filme.imagem}
                alt={'imagem de ' + filme.titulo}
                title={filme.titulo}
                height="100" />
              </td>
              <td className="sinopse">{filme.sinopse}</td>
              <td>{filme.dataLancamento}</td>
              <td>{filme.classificacao}</td>
              <td>{filme.elenco}</td>
              <td>{filme.genero}</td>
              <td>
                <button className="btn btn-primary" onClick={() => selecionarFilme(filme, "Editar")}><FontAwesomeIcon icon={faEdit} /></button> {"   "}
                <button className="btn btn-danger" onClick={() => selecionarFilme(filme, "Apagar")}><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalAdicionar}>
        <ModalHeader>Adicionar Filme</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Título:</label>
            <br />
            <input type="text" className="form-control" name="titulo" onChange={handleChange} />
            <br />
            <label>Imagem:</label>
            <br />
            <input type="file" className="form-control" name="imagem" accept=".jpg,.png,.jpeg" onChange={handleImagemChange} />
            <br />
            <label>Sinopse:</label>
            <br />
            <input type="text" className="form-control" name="sinopse" onChange={handleChange} />
            <br />
            <label>Data de Lançamento:</label>
            <br />
            <input type="date" className="form-control" name="dataLancamento" onChange={handleChange} />
            <br />
            <label>Classificação:</label>
            <br />
            <input type="number" className="form-control" name="classificacao" onChange={handleChange} />
            <br />
            <label>Elenco:</label>
            <br />
            <input type="text" className="form-control" name="elenco" onChange={handleChange} />
            <br />
            <label>Género:</label>
            <br />
            <input type="text" className="form-control" name="genero" onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPost()}>Adicionar</button>
          <button className="btn btn-danger" onClick={() => abrirFecharModalAdicionar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Filme</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id:</label>
            <input type="text" className="form-control" readOnly value={filmeSelecionado && filmeSelecionado.id} />
            <br />
            <label>Título:</label>
            <br />
            <input type="text" className="form-control" name="titulo" onChange={handleChange}
              value={filmeSelecionado && filmeSelecionado.titulo} />
            <br />
            <label>Imagem:</label>
            <br />
            <input type="file" className="form-control" name="imagem" accept=".jpg,.png,.jpeg" onChange={handleImagemChange}
            />
            <br />
            <label>Sinopse:</label>
            <br />
            <input type="text" className="form-control" name="sinopse" onChange={handleChange}
              value={filmeSelecionado && filmeSelecionado.sinopse} />
            <br />
            <label>Data de Lançamento:</label>
            <br />
            <input type="date" className="form-control" name="dataLancamento" onChange={handleChange}
            />
            <br />
            <label>Classificação:</label>
            <br />
            <input type="number" className="form-control" name="classificacao" onChange={handleChange}
              value={filmeSelecionado && filmeSelecionado.classificacao} />
            <br />
            <label>Elenco:</label>
            <br />
            <input type="text" className="form-control" name="elenco" onChange={handleChange}
              value={filmeSelecionado && filmeSelecionado.elenco} />
            <br />
            <label>Género:</label>
            <br />
            <input type="text" className="form-control" name="genero" onChange={handleChange}
              value={filmeSelecionado && filmeSelecionado.genero} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPut()}>Editar</button>
          <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalApagar}>
        <ModalBody>
          Confirma a eliminação deste filme: {filmeSelecionado && filmeSelecionado.titulo} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => pedidoDelete()}>Sim</button>
          <button className="btn btn-secondary" onClick={() => abrirFecharModalApagar()}>Não</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCriado}>
        <ModalHeader>Filme Adicionado</ModalHeader>
        <ModalBody>
          <div>O filme que introduziu foi adicionado com sucesso!</div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => abrirFecharModalCriado()}><FontAwesomeIcon icon={faCheck} /></button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditado}>
        <ModalHeader>Filme Editado</ModalHeader>
        <ModalBody>
          <div>O filme foi editado com sucesso!</div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => abrirFecharModalEditado()}><FontAwesomeIcon icon={faCheck} /></button>
        </ModalFooter>
      </Modal>


    </div>
  );
}


export default Filmes;






