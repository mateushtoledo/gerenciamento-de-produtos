import React from 'react'
import { withRouter } from 'react-router-dom'

import ProdutoService from '../service/produto-service'

import RequiredLabel from '../components/required-label'
import BackspaceIcon from '@material-ui/icons/Backspace';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';

const initialState = {
    nome: "",
    sku: "",
    descricao: "",
    preco: 0,
    fornecedor: "",
    exibirMensagemSucesso: false,
    errosValidacao: []
};

class EditarProduto extends React.Component {

    state = initialState;

    constructor() {
        super();
        this.service = new ProdutoService();
    }

    componentDidMount() {
        const sku = this.props.match.params.sku;
        let found = true;
        try {
            let produto = this.service.obterProduto(sku);
            this.setState({
                nome: produto.nome,
                sku: sku,
                descricao: produto.descricao,
                preco: produto.preco,
                fornecedor: produto.fornecedor,
            });
        } catch (error) {
            this.setState({ errosValidacao: error.erros });
            found = false;
        }

        // Se não encontrou o produto, voltar para a lista
        if (!found) {
            setTimeout(function () {
                this.props.history.push("/listar")
            }.bind(this), 3000);
        }
    }

    onChange = (event) => {
        const fieldValue = event.target.value;
        const fieldName = event.target.name;

        this.setState({ [fieldName]: fieldValue })
    };

    onsubmit = (event) => {
        // Prevenir o reload da tela (finalizar submissão do formulário)
        event.preventDefault();
        
        let produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        };
        let alterado = true;

        try {
            this.service.alterar(produto);
            this.cleanForm();
            this.setState({ exibirMensagemSucesso: true });
        } catch (error) {
            alterado = false;
            this.setState({ errosValidacao: error.erros })
        }

        if (alterado) {
            setTimeout(function () {
                this.props.history.push("/listar")
            }.bind(this), 3000);
        }
    };

    cleanForm = () => {
        const sku = this.state.sku;
        this.setState(initialState);
        this.setState({ sku: sku });
    };

    render() {
        return (
            <div className="card bg-light">
                <div className="card-header bg-dark text-light">
                    <h3>Editar produto</h3>
                </div>
                <div className="card-body">
                    {
                        this.state.exibirMensagemSucesso &&
                        <div className="alert alert-dismissible alert-success">
                            <DoneOutlineRoundedIcon />&nbsp;<span className="font-weight-bold">O produto foi editado com sucesso!</span>
                        </div>
                    }

                    {
                        this.state.errosValidacao.length > 0 &&
                        <div className="alert alert-dismissible alert-dark">
                            <ReportProblemRoundedIcon />&nbsp;<span className="font-weight-bold">{this.state.errosValidacao[0]}</span>
                        </div>
                    }

                    <form id="formulario-cadastro" onSubmit={this.onsubmit}>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <RequiredLabel htmlFor="nome" label="Nome" required={false} />
                                <input type="text" id="nome" name="nome" className="form-control" placeholder="Informe o nome do produto" value={this.state.nome} onChange={this.onChange} />
                            </div>
                            <div className="col-md-6 form-group">
                                <RequiredLabel htmlFor="sku" label="SKU" />
                                <input type="text" id="sku" minLength="8" maxLength="8" name="sku" disabled={true} className="form-control" placeholder="Informe o identificador SKU do produto" value={this.state.sku} onChange={this.onChange} />
                            </div>
                            <div className="col-md-6 form-group">
                                <RequiredLabel htmlFor="preco" label="Preço" />
                                <input type="number" id="preco" name="preco" className="form-control" placeholder="Informe o preço do produto" value={this.state.preco} onChange={this.onChange} />
                            </div>
                            <div className="col-md-6 form-group">
                                <RequiredLabel htmlFor="fornecedor" label="Fornecedor" />
                                <input type="text" id="fornecedor" name="fornecedor" className="form-control" placeholder="Informe o fornecedor do produto" value={this.state.fornecedor} onChange={this.onChange} />
                            </div>
                            <div className="col-md-12 form-group">
                                <RequiredLabel htmlFor="descricao" label="Descrição" />
                                <textarea className="form-control" name="descricao" rows="3" id="descricao" placeholder="Informe a descrição do produto" value={this.state.descricao} onChange={this.onChange}></textarea>
                            </div>
                        </div>
                        <div className="row mt-md-2">
                            <div className="col-md-3 form-group">
                                <button className="btn btn-dark form-control" onClick={this.onsubmit}>
                                    <EditRoundedIcon />&nbsp;Alterar
                            </button>
                            </div>
                            <div className="col-md-3 form-group">
                                <button className="btn btn-info form-control" onClick={this.cleanForm}>
                                    <BackspaceIcon />&nbsp;Limpar formulário
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(EditarProduto);