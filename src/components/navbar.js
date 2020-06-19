import React from 'react'

import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import ReorderOutlinedIcon from '@material-ui/icons/ReorderOutlined';

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Produtos</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#/cadastrar">
                            <PlaylistAddOutlinedIcon />&nbsp;Cadastrar
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/listar">
                            <ReorderOutlinedIcon />&nbsp;Listar
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;