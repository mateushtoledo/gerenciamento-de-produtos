import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from '../views/home'
import CadastroProduto from '../views/cadastrar-produto'
import EditarProdutoProduto from '../views/editar-produto'
import ListarProdutos from '../views/listar-produtos'
import VisualizarProduto from '../views/visualizar-produto'

export default () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/cadastrar" component={CadastroProduto} />
                <Route exact path="/editar/:sku" component={EditarProdutoProduto} />
                <Route exact path="/visualizar/:sku" component={VisualizarProduto} />
                <Route exact path="/listar" component={ListarProdutos} />
            </Switch>
        </HashRouter>
    );
}