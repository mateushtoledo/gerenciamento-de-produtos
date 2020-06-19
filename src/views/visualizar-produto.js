import React from 'react'

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import ProdutoService from '../service/produto-service'

const initialState = {
    sku: "",
    produto: false,
    exibirMensagemSucesso: false,
    errosValidacao: []
};

class CadastroProdutos extends React.Component {

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
            this.setState({ produto: produto });
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

    render() {
        return (
            <div className="card bg-light">
                <div className="card-header bg-dark text-light">
                    <h3><InfoOutlinedIcon />  {this.state.produto ? this.state.produto.nome : "Produto não encontrado"}</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-group">
                                <span className="font-weight-bold mr-md-2">
                                    Fornecedor:
                                </span>
                                <div class="text-justify">{this.state.produto.fornecedor}</div>
                            </div>
                            <div className="form-group">
                                <span className="font-weight-bold mr-md-2">
                                    Identificador SKU:
                                </span>
                                <div class="text-justify">{this.state.produto.sku}</div>
                            </div>
                            <div className="form-group">
                                <span className="font-weight-bold mr-md-2">
                                    Preço:
                                </span>
                                <div class="text-justify">R$ {this.state.produto.preco}</div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="form-group">
                                <span className="font-weight-bold mr-md-2">
                                    Descrição:
                                </span>
                                <div class="text-justify">{this.state.produto.descricao}</div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <small style={{ color: "#868e96", fontStyle: "italic" }}><InfoOutlinedIcon />  Para editar as informações ou remover o produto, acesse a listagem.</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default CadastroProdutos;