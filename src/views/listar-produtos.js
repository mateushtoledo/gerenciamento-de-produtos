import React from 'react'
import { withRouter } from 'react-router-dom'

import ProdutoService from '../service/produto-service'

import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded'
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

import '../css/lista-produtos.css'

const initialState = {
    produtos: [],
    mensagemSucesso: false,
    skuProduto: "",
    pedirConfirmacao: false,
    erros: []
};

class ListaProdutos extends React.Component {
    state = initialState;

    constructor() {
        super();
        this.produtoService = new ProdutoService();
    };

    componentDidMount() {
        this.setState({ produtos: this.produtoService.obterProdutos() });
    };

    confirmarApagar = (skuProduto) => {
        this.setState({ pedirConfirmacao: true, skuProduto: skuProduto });
    };

    apagarProduto = () => {
        this.cancelarApagarProduto();
        try {
            let produtos = this.produtoService.apagar(this.state.skuProduto);
            this.setState({
                produtos: produtos,
                mensagemSucesso: "O produto foi apagado com sucesso!",
                erros: []
            });
        } catch (error) {
            this.setState({
                mensagemSucesso: false,
                erros: error.erros
            });
        } finally {
            setTimeout(function () {
                this.setState(
                    {
                        mensagemSucesso: false,
                        skuProduto: "",
                        pedirConfirmacao: false,
                        erros: []
                    }
                );
            }.bind(this), 3000);
        }
    };

    cancelarApagarProduto = () => {
        this.setState({ pedirConfirmacao: false, skuProduto: "" });
    };

    render() {
        return (
            <>
                <div className="card bg-light">
                    <div className="card-header bg-dark text-light">
                        <h3>Listar produtos</h3>
                    </div>
                    <div className="card-body">
                        {
                            this.state.mensagemSucesso &&
                            <div className="alert alert-dismissible alert-success">
                                <DoneOutlineRoundedIcon />&nbsp;<span className="font-weight-bold">{this.state.mensagemSucesso}</span>
                            </div>
                        }
                        {
                            this.state.erros.length > 0 &&
                            <div className="alert alert-dismissible alert-dark">
                                <ReportProblemRoundedIcon />&nbsp;<span className="font-weight-bold">{this.state.errosValidacao[0]}</span>
                            </div>
                        }
                        {
                            this.state.pedirConfirmacao &&
                            <div className="alert alert-dismissible alert-warning">
                                <HelpOutlineRoundedIcon />
                                &nbsp;
                                <span className="font-weight-bold">
                                    Confirma a exclusão do produto?
                                    &nbsp;&nbsp;
                                    <button className="btn btn-sm btn-outline-success" onClick={() => this.apagarProduto()}>
                                        <DoneOutlineRoundedIcon />
                                    </button>
                                    &nbsp;&nbsp;
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => this.cancelarApagarProduto()}>
                                        <ClearRoundedIcon />
                                    </button>
                                </span>
                            </div>
                        }
                        <div className="products-table">
                            <div className="table-header">
                                <div className="row">
                                    <div className="col-sm-3">
                                        Nome
                                    </div>
                                    <div className="col-sm-2">
                                        SKU
                                    </div>
                                    <div className="col-sm-2">
                                        Fornecedor
                                    </div>
                                    <div className="col-sm-2">
                                        Preço
                                    </div>
                                    <div className="col-sm-3">
                                        Ações
                                    </div>
                                </div>
                            </div>
                            <div className="table-body">
                                {
                                    this.state.produtos.map(produto => {
                                        return (
                                            <div className="row" key={produto.sku}>
                                                <div className="col-sm-3">
                                                    {produto.nome}
                                                </div>
                                                <div className="col-sm-2">
                                                    {produto.sku}
                                                </div>
                                                <div className="col-sm-2">
                                                    {produto.fornecedor}
                                                </div>
                                                <div className="col-sm-2">
                                                    R$ {produto.preco}
                                                </div>
                                                <div className="col-sm-3 actions">
                                                    <a className="btn btn-sm btn-outline-info" href={`#/visualizar/${produto.sku}`} title="Visualizar detalhes do produto">
                                                        <VisibilityRoundedIcon />
                                                    </a>
                                                    <a className="btn btn-sm btn-outline-primary" href={`#/editar/${produto.sku}`} title="Editar produto">
                                                        <EditRoundedIcon />
                                                    </a>
                                                    <button className="btn btn-sm btn-outline-dark btn-delete" onClick={() => this.confirmarApagar(produto.sku)} title="Apagar produto">
                                                        <DeleteRoundedIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                                {
                                    this.state.produtos.length === 0 &&
                                    <div className="no-one-product">
                                        <p>Nenhum produto cadastrado</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(ListaProdutos);