/**
 * Form.js
 */

import React from "react";


const ChooseOwner = (props) => {
    const options = props.ownersDataIN.map((row) => {
        return <option key={row.id} value={row.id}>{row.nome}</option>
    })
    return (
        <select className="form-select"
            onChange={props.choosedOwnerOUT} >
            <option value="">Choose an owner, please</option>
            {options}
        </select>
    )
}

const ChooseFilme = (props) => {
    const options = props.filmesDataIN.map((row) => {
        return <option key={row.id} value={row.id}>{row.titulo}</option>
    })
    return (
        <select className="form-select"
            onChange={props.choosedFilmeOUT} >
            <option value="">Choose an owner, please</option>
            {options}
        </select>
    )
}



class Form extends React.Component {
    newAnimal = {
        id: '',
        nomeUtilizador: '',
        nomeFilme: '',
        preco: null,
        dataInicio: '',
        dataFim:  '',
    }

    state = this.newAnimal;

    /**
     * function to handle data provided by 'input' field
     * @param {*} event 
     */
    handleAdd = (event) => {
        // read the data available at 'event'
        const { name, value } = event.target
        // assign to the state identified by 'name' withe the 'value' writed by user
        this.setState({
            [name]: value,
        })
    }

    /**
     * read the selected owner
     * @param {*} event 
     */
     handleOwnerChange = (event) => {
        this.setState({ nomeUtilizador: event.target.value })
    }

    /**
     * read the selected owner
     * @param {*} event 
     */
     handleFilmeChange = (event) => {
        this.setState({ nomeFilme: event.target.value })
    }


    /**
     * Sends data collect by the Form to API
     * @param {*} event 
     */
    handleForm = (event) => {
        // this statement will prevent Form to submit do Server the data
        event.preventDefault();

        // specefy an objet to transport data to API
        let formData = {
            nomeUtilizador: this.state.nomeUtilizador,
            nomeFilme: this.state.nomeFilme,
            preco: this.state.preco,
            dataInicio: this.state.dataInicio,
            dataFim: this.state.dataFim,
        }
        // export data to <App />
        this.props.newAnimalOUT(formData);

    }



    render() {
        // read the state and props values
        const {
            preco,
            dataInicio,
            dataFim, } = this.state;

        const { ownersIN, filmesIN } = this.props;

        return (
            <form method="POST"
                encType="multipart/form-data"
                onSubmit={this.handleForm}
            >
                <div className="form-group">
                    Utilizador: <ChooseOwner ownersDataIN={ownersIN}
                        choosedOwnerOUT={this.handleOwnerChange} />
                    <br />
                    Filmes: <ChooseFilme filmesDataIN={filmesIN}
                        choosedFilmeOUT={this.handleFilmeChange} />
                    <br />
                    data inicio: <input type="date"
                            required
                            className="form-control"
                            name="dataInicio"
                            value={dataInicio}
                            onChange={this.handleAdd}
                        /><br />
                        data fim: <input type="date"
                            required
                            className="form-control"
                            name="dataFim"
                            value={dataFim}
                            onChange={this.handleAdd}
                        /><br />
                    <br />
                </div>
                <input type="submit"
                    value="Adicionar"
                    className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default Form;