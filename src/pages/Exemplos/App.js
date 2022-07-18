/**
 * App.js
 */

import React from 'react';
import Form from './Form';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import iconAluga from './iconAluga.png';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';


/**
 * read the animals'data from API
 * To access data, is necessary to create a PROXY
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/
 */
async function getAnimals() {
  // read the animals'data from API
  let animalsData = await fetch("api/aluguersapi/");

  // avaliate the data collected
  if (!animalsData.ok) {
    // ok, means HTTP code: 200
    console.error(animalsData);
    throw new Error("something went wrong when accessing animals'data. HTTP Code: ",
      animalsData.state);
  }

  // return the collected data, in JSON format
  return await animalsData.json();
}

async function getOwners() {
  // read the onwers'data from API
  let ownersData = await fetch("api/utilizadoresAPI/");

  // avaliate the data collected
  if (!ownersData.ok) {
    // ok, means HTTP code: 200
    console.error(ownersData);
    throw new Error("something went wrong when accessing owners'data. HTTP Code: ",
      ownersData.state);
  }
  // return the collected data, in JSON format
  return await ownersData.json();
}

async function getFilmes() {
  // read the onwers'data from API
  let filmesData = await fetch("api/filmesapi/");

  // avaliate the data collected
  if (!filmesData.ok) {
    // ok, means HTTP code: 200
    console.error(filmesData);
    throw new Error("something went wrong when accessing owners'data. HTTP Code: ",
    filmesData.state);
  }
  // return the collected data, in JSON format
  return await filmesData.json();
}

/**
 * this function is the function that realy sends new animal data to API
 * // Submissão de dados para a API
//    https://developer.mozilla.org/pt-BR/docs/Web/API/FormData
//    https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
 * @param {*} animal 
 */
async function AddAnimal(animal) {
  // create an object to transport data from React to API
  let formData = new FormData();
  formData.append("nomeUtilizador", animal.nomeUtilizador)
  formData.append("nomeFilme", animal.nomeFilme)
  formData.append("preco", animal.preco)
  formData.append("dataInicio", animal.dataInicio)
  formData.append("dataFim", animal.dataFim)

  // send data to API
  let resposta = await fetch("api/aluguersapi",
    {
      method: "POST",
      body: formData
    }
  );
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error("it was not possible to add the animal. Code: ",
      resposta.status)
  }
  return await resposta.json();
}

async function EditAnimal(animal) {
  // create an object to transport data from React to API
  let formData = new FormData();
  formData.append("nomeUtilizador", animal.nomeUtilizador)
  formData.append("nomeFilme", animal.nomeFilme)
  formData.append("preco", animal.preco)
  formData.append("dataInicio", animal.dataInicio)
  formData.append("dataFim", animal.dataFim)

  // send data to API
  let resposta = await fetch("api/aluguersAPI/" + animal.id,
    {
      method: "PUT",
      body: formData
    }
  );
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error("it was not possible to add the animal. Code: ",
      resposta.status)
  }
  return await resposta.json();
}

/**
 * Sends data to API to delete the animal
 * @param {*} animalId 
 */
async function deleteAnimal(animalId) {
  let formData = new FormData();
  formData.append("id", animalId);
  // send data to API
  let resposta = await fetch("api/aluguersAPI/" + animalId,
    {
      method: "DELETE",
      body: formData
    })
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error("It ws not possible to delete the animal. Code: ", resposta.status)
  }
  else {
    alert("the animal was deleted");
  }
}



class Exemplos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalCriar: false,
      modalApagar: false,
      animals: [],
      owners: [],
      filmes: [],
    };

    this.toggleCriar = this.toggleCriar.bind(this);
    this.toggleApagar = this.toggleCriar.bind(this);
  }

  toggleCriar() {
    this.setState({
      modalCriar: !this.state.modalCriar
    });
  }

  toggleApagar() {
    this.setState({
      modalApagar: !this.state.modalApagar
    });
  }





  /**
   * this function acts like a 'startup' when
   * the component is started
   */
  componentDidMount() {
    this.LoadAnimals();
    this.LoadOwners();
    this.LoadFilmes();
  }

  /**
   * load the Animals' data, from API
   */
  async LoadAnimals() {
    try {
      // ask for data, from API
      let animalsFromAPI = await getAnimals();
      // after receiving data, store it at state
      this.setState({ animals: animalsFromAPI })
    } catch (ex) {
      console.error("Error: it was not possible to read animals' data", ex)
    }
  }

  async LoadOwners() {
    try {
      // ask for data, from API
      let ownersFromAPI = await getOwners();
      // after receiving data, store it at state
      this.setState({ owners: ownersFromAPI })
    } catch (ex) {
      console.error("Error: it was not possible to read owners' data", ex)
    }
  }

  async LoadFilmes() {
    try {
      // ask for data, from API
      let filmesFromAPI = await getFilmes();
      // after receiving data, store it at state
      this.setState({ filmes: filmesFromAPI })
    } catch (ex) {
      console.error("Error: it was not possible to read owners' data", ex)
    }
  }

  /**
   * send the new animal data to API
   * @param {*} animal 
   */
  handleNewAnimalData = async (animal) => {
    /**
     * 1. read new animal data
     * 2. send it to API
     * 3. redraw the Table
     */

    // 1. already done. New animal data is send by parameter

    // 2.
    try {
      await AddAnimal(animal);
    } catch (error) {
      console.error("Something went wrong when a new animal was sento to API. ", error);
    }
    // 3.
    await this.LoadAnimals();
  }

  /**
  * send the new animal data to API
  * @param {*} animal 
  */
  handleEditAnimalData = async (animal) => {
    /**
     * 1. read new animal data
     * 2. send it to API
     * 3. redraw the Table
     */

    // 1. already done. New animal data is send by parameter

    // 2.
    try {
      await EditAnimal(animal);
    } catch (error) {
      console.error("Something went wrong when a new animal was sento to API. ", error);
    }
    // 3.
    await this.LoadAnimals();
  }

  /**
   * request the action to Delete the animal that user choosed
   * @param {*} animalId 
   */
  handleDeleteAnimal = async (animalId) => {
    this.setState({
      modalApagar: !this.state.modalApagar
    });
    try {
      await deleteAnimal(animalId);
    } catch (error) {
      console.error("Error when deleting the animal", error);
    }
    // redraw the table
    await this.LoadAnimals();
  }



  render() {
    const { animals, owners, filmes } = this.state;

    return (
      <div className="alugueres-container">
        <br />
        <Link className="button" to="/">
          <button type="button" className="btn btn-outline-info btn-sm">Voltar</button>
        </Link>
        <br />
        <br />
        <h3>Criação de Aluguers</h3>
        <img src={iconAluga} alt='Alugueres' width="50px" />
        <button className="btn btn-success" onClick={this.toggleCriar}><FontAwesomeIcon icon={faPlus} /></button>

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
            {animals.map(aluguer => (
              <tr key={aluguer.id}>
                <td>{aluguer.id}</td>
                <td>{aluguer.nomeUtilizador}</td>
                <td>{aluguer.nomeFilme}</td>
                <td>{aluguer.preco}</td>
                <td>{aluguer.dataInicio}</td>
                <td>{aluguer.dataFim}</td>
                <td>
                  <button className="btn btn-primary" onClick={this.toggleCriar}><FontAwesomeIcon icon={faEdit} /></button> {"   "}
                  <button className="btn btn-danger" onClick={this.toggleCriar}><FontAwesomeIcon icon={faTrash} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        <Modal isOpen={this.state.modalCriar} toggle={this.toggleCriar} className={this.props.className}>
          <ModalHeader toggle={this.toggleCriar}>Adicionar Subscrição</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <Form ownersIN={owners} filmesIN={filmes}  newAnimalOUT={this.handleNewAnimalData} />
            </div>
          </ModalBody>
        </Modal>



      </div>
    )
  }
}
export default Exemplos;
