import React, { useState, useEffect } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import iconSeries from './iconSeries.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


function Series() {

  const baseUrl = "https://localhost:7198/api/seriesapi";

  const [data, setData] = useState([]);

  const [updateData, setUpdateData] = useState(true);

  const [modalAdicionar, setModalAdicionar] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  const [modalApagar, setModalApagar] = useState(false);

  const [modalCriado, setModalCriado] = useState(false);

  const [modalEditado, setModalEditado] = useState(false);

  const [serieSelecionada, setSerieSelecionada] = useState(
    {
      id: '',
      nome: '',
      titulo: '',
      imagem: null,
      sinopse: '',
      dataLancamento: '',
      classificacao: '',
      elenco: '',
      genero: '',
      temporada: '',
      episodio: '',

    }
  )

  //   const [dataUtlz, setDataUtlz] = useStateA([]);

  //   const [updateDataUtlz, setUpdateDataUtlz] = useStateA(true);

  //   const [utilizadorSelecionado, setUtilizadorSelecionado] = useStateA(
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

  // const pedidoGetUtlz = async () => {
  //   await axios.get("https://localhost:7198/api/utilizadoresapi")
  //     .then(response => {
  //       setDataUtlz(response.dataUtlz);
  //     }).catch(error => {
  //       console.log(error);
  //     })
  // }

  // //impedir loop pedidoGet
  // useEffectA(() => {
  //   if (updateDataUtlz) {
  //     pedidoGetUtlz();
  //     setUpdateDataUtlz(false);
  //   }
  // }, [updateDataUtlz])







  const selecionarSerie = (serie, opcao) => {
    setSerieSelecionada(serie);
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
    setSerieSelecionada({
      ...serieSelecionada, [name]: value
    });
    console.log(serieSelecionada);
  }
  const handleImagemChange = (e) => {
    setSerieSelecionada({
      ...serieSelecionada, imagem: e.target.files[0]
    });
    console.log(serieSelecionada);
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
    delete serieSelecionada.id;
    const formData = new FormData();
    formData.append("titulo", serieSelecionada.titulo)
    formData.append("imagem", serieSelecionada.imagem)
    formData.append("sinopse", serieSelecionada.sinopse)
    formData.append("dataLancamento", serieSelecionada.dataLancamento)
    formData.append("classificacao", serieSelecionada.classificacao)
    formData.append("elenco", serieSelecionada.elenco)
    formData.append("genero", serieSelecionada.genero)
    formData.append("temporada", serieSelecionada.temporada)
    formData.append("episodio", serieSelecionada.episodio)
    axios.post(baseUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
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
    axios.put(baseUrl + "/" + serieSelecionada.id, serieSelecionada)
      .then(response => {
        var dados = response.data;
        var dadosAux = data;
        dadosAux.map(serie => {
          if (serie.id === serieSelecionada.id) {
            serie.titulo = dados.titulo;
            serie.imagem = dados.imagem;
            serie.sinopse = dados.sinopse;
            serie.dataLancamento = dados.dataLancamento;
            serie.classificacao = dados.classificacao;
            serie.elenco = dados.elenco;
            serie.genero = dados.genero;
            serie.temporada = dados.temporada;
            serie.episodio = dados.episodio;
          }
        });
        setUpdateData(true);
        abrirFecharModalEditado();
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidoDelete = async () => {
    await axios.delete(baseUrl + "/" + serieSelecionada.id)
      .then(response => {
        setData(data.filter(serie => serie.id !== response.data));
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
    <div className="series-container">
      <br />
      <Link className="button" to="/">
        <button type="button" className="btn btn-outline-info btn-sm">Voltar</button>
      </Link>
      <br />
      <br />
      <h3>Adicionar Série</h3>
      <img src={iconSeries} alt='Series' width="50px" />
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
            <th>Nº Temporadas</th>
            <th>Nº Episódios</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(serie => (
            <tr key={serie.id}>
              <td>{serie.id}</td>
              <td>{serie.titulo}</td>
              <td><img src={'https://localhost:7198/Fotos/series/' + serie.imagem}
                alt={'imagem de ' + serie.titulo}
                title={serie.titulo}
                height="100" />
              </td>
              <td className="sinopse">{serie.sinopse}</td>
              <td>{serie.dataLancamento}</td>
              <td>{serie.classificacao}</td>
              <td>{serie.elenco}</td>
              <td>{serie.genero}</td>
              <td>{serie.temporada}</td>
              <td>{serie.episodio}</td>
              <td>
                <button className="btn btn-primary" onClick={() => selecionarSerie(serie, "Editar")}><FontAwesomeIcon icon={faEdit} /></button> {"   "}
                <button className="btn btn-danger" onClick={() => selecionarSerie(serie, "Apagar")}><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalAdicionar}>
        <ModalHeader>Adicionar Série</ModalHeader>
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
            <label>Nº Temporadas:</label>
            <br />
            <input type="number" className="form-control" name="temporada" onChange={handleChange} />
            <br />
            <label>Nº Episódios:</label>
            <br />
            <input type="number" className="form-control" name="episodio" onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPost()}>Adicionar</button>
          <button className="btn btn-danger" onClick={() => abrirFecharModalAdicionar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Série</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Id:</label>
            <input type="text" className="form-control" readOnly value={serieSelecionada && serieSelecionada.id} />
            <br />
            <label>Título:</label>
            <br />
            <input type="text" className="form-control" name="titulo" onChange={handleChange}
              value={serieSelecionada && serieSelecionada.titulo} />
            <br />
            <label>Imagem:</label>
            <br />
            <input type="file" className="form-control" name="imagem" accept=".jpg,.png,.jpeg" onChange={handleImagemChange}
            />
            <br />
            <label>Sinopse:</label>
            <br />
            <input type="text" className="form-control" name="sinopse" onChange={handleChange}
              value={serieSelecionada && serieSelecionada.sinopse} />
            <br />
            <label>Data de Lançamento:</label>
            <br />
            <input type="date" className="form-control" name="dataLancamento" onChange={handleChange}
            />
            <br />
            <label>Classificação:</label>
            <br />
            <input type="number" className="form-control" name="classificacao" onChange={handleChange}
              value={serieSelecionada && serieSelecionada.classificacao} />
            <br />
            <label>Elenco:</label>
            <br />
            <input type="text" className="form-control" name="elenco" onChange={handleChange}
              value={serieSelecionada && serieSelecionada.elenco} />
            <br />
            <label>Género:</label>
            <br />
            <input type="text" className="form-control" name="genero" onChange={handleChange}
              value={serieSelecionada && serieSelecionada.genero} />
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
          Confirma a eliminação desta série: {serieSelecionada && serieSelecionada.titulo} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => pedidoDelete()}>Sim</button>
          <button className="btn btn-secondary" onClick={() => abrirFecharModalApagar()}>Não</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCriado}>
        <ModalHeader>Série Adicionada</ModalHeader>
        <ModalBody>
          <div>A série que introduziu foi adicionada com sucesso!</div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => abrirFecharModalCriado()}><FontAwesomeIcon icon={faCheck} /></button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditado}>
        <ModalHeader>Série Editada</ModalHeader>
        <ModalBody>
          <div>A série foi editado com sucesso!</div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => abrirFecharModalEditado()}><FontAwesomeIcon icon={faCheck} /></button>
        </ModalFooter>
      </Modal>

    </div>
  );
}


export default Series;






