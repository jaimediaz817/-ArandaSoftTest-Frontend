import React, { Component } from 'react';
import { Alert, Badge, ListGroup, Button } from 'react-bootstrap';
import '../products/Product.css';

class Home extends Component {

    constructor(props) {
        super(props);

        // estado
        this.state={
            alertInfo: true,
        }
    }

    render() {

        let alertShow = () => this.setState({alertInfo: false})

        return (
            <div className="text-center block-info">
                <h3 className="text mt-5 mb-5">
                    Prueba ArandaSoft, para ver el listado de productos con el CRUD, presione click en: "Products" ubicado en el Navbar superior <Badge bg="success" className="d-inline ml-5"><strong><a href="https://jaimediaz.dev" target="_blank" title="Acceder a mi página web personal en proceso de construcción">Ing. Jaime Díaz</a></strong></Badge>
                </h3>

                <div className="container-fluid mt-5">
                    <div className="row">
                        <Alert show={this.state.alertInfo} variant="success">
                            <Alert.Heading className="p-2 pb-4">¡Nuevos Features agregados a la prueba!</Alert.Heading>
                            <p className="">
                                <ListGroup as="ol" numbered>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold"></div>
                                            Permite buscar por Nombre del Producto <strong>En el BACKEND</strong>
                                        </div>
                                        <Badge variant="primary" pill>
                                            Filtros de búsqueda
                                        </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-start align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold"></div>
                                            Permite buscar por la Descripción del Producto <strong>En el BACKEND</strong>
                                        </div>
                                        <Badge variant="primary" pill>
                                            Filtros de búsqueda
                                        </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold"></div>
                                            Permite buscar Productos por la Categoría Seleccionada <strong>En el BACKEND</strong>
                                        </div>
                                        <Badge variant="primary" pill>
                                            Filtros de búsqueda
                                        </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-star align-items-start"
                                    >
                                        <div className="ms-2 me-auto text-start">
                                            <div className="fw-bold"></div>
                                            Permite retornar la primera página de 20 registros como máximo, no interesa si se carga la base de datos inicialmente con 1000 registros tal y como estaba descrito en uno de los untos de la prueba Aranda Soft. <strong>En el BACKEND</strong>
                                        </div>
                                        <Badge pill bg="success">
                                            Paginación
                                        </Badge>
                                        <Badge pill bg="warning" text="dark">
                                            
                                        </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-star align-items-start"
                                    >
                                        <div className="ms-2 me-auto text-start">
                                            <div className="fw-bold"></div>
                                            Faltó Implementar en el Frontend los errores en validaciones al registrar el Producto y restricción de negocio implementada en el back: <strong>NO se permite registrar un Producto de un ID de categoría que NO existe, o NO permite registrar el Producto si NO se ingresó alguna Categoría existente</strong> <strong>En el BACKEND</strong>
                                        </div>
                                        <Badge pill bg="danger">
                                            Faltó
                                        </Badge>
                                    </ListGroup.Item>                                      
                                </ListGroup>                                 
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => alertShow(false)} variant="outline-success">
                                    Ocultar esta información
                                </Button>
                            </div>
                        </Alert>
                    </div>
                    
                </div>               
            </div>
        );
    }
}

export default Home;
