import React from 'react';
import { Link } from 'react-router-dom';
import './scoped-bootstrap.css';

const NavBar = () => {
    return (
        <header className="custom-header">
            <nav className="navbar navbar-expand-lg">
                <span className="navbar-brand">Fish&CO</span>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/productos" className="nav-link">Productos</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
