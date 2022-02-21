import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import '../products/Product.css';

class Home extends Component {
    render() {
        return (
            <div className="text-center block-info">
                <h3 className="text mt-5">
                    Prueba ArandaSoft, para ver el listado de productos con el CRUD, presione click en: "Products" ubicado en el Navbar superior <Badge bg="success" className="d-inline ml-5"><strong><a href="https://jaimediaz.dev" target="_blank" title="Acceder a mi página web personal en proceso de construcción">Ing. Jaime Díaz</a></strong></Badge>
                </h3>
            </div>
        );
    }
}

export default Home;
