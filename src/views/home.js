import React from 'react'

import ReorderOutlinedIcon from '@material-ui/icons/ReorderOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';

function Home() {
    return (
        <>
            <h2 className="display-3">Bem vindo!</h2>
            <hr className="my-4" />
            <p className="lead">Por aqui você pode gerenciar o estoque de produtos de sua loja.</p>
            <p>
                <a className="btn btn-outline-dark btn-lg" href="#/listar" role="button">
                    <ReorderOutlinedIcon />&nbsp;Listar produtos
                </a>
            </p>
            <p>
                <a className="btn btn-outline-dark btn-lg" href="#/cadastrar" role="button">
                    <PlaylistAddOutlinedIcon />&nbsp;Cadastrar produto
                </a>
            </p>
        </>
    );
}

export default Home;