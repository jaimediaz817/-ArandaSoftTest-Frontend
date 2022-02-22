import React, { Component } from 'react';
import { ButtonToolbar, Table, Button, Image, Form, Alert } from 'react-bootstrap';
import Addproduct from './AddProduct';
import Editproduct from './EditProduct';
// TODO: habilitar import ReactPaginate from 'react-paginate';
import './Product.css';

class Product extends Component {
    

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        // estado
        this.state={
            products:[],
            categories: [],
            titulo: 'Hello',
            addmodalShow: false,
            editmodalShow: false,
            product: {
                id: null,
                name: '',
                description: '',
                categoryId: null,
                image: ''
            },
            imageUpload: '',

            // paginacion
            perPage: 5,
            page: 0,
            pages: 0,
        }

        this.deleteProduct = this.deleteProduct.bind(this);
        this.refreshListProducts = this.refreshListProducts.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleEjecutarFiltrosBusqueda = this.handleEjecutarFiltrosBusqueda.bind(this);
    }
    

    refreshListProducts() {
        console.log("fetch ::", process.env.REACT_APP_API + 'Product')
        fetch(process.env.REACT_APP_API + 'Product')
            .then(response => response.json())
            .then(dataResponse => {
                this.setState({
                    titulo: 'Productos Leídos',
                    products: dataResponse.data,                    
                });

                console.log(" state :: ", this.state.products)
            })
    }

    loadCategories() {
        fetch(process.env.REACT_APP_API + 'Product/getCategories')
            .then(response => response.json())
            .then(dataResponse => {
                console.log("categories ::: ", dataResponse.data)
                this.setState({
                    categories: dataResponse.data,
                    pages: Math.floor(dataResponse.data.length / perPage)
                });

                const {perPage} = this.state;


            })        
    }

    // Paginación
    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({page})
    }    

    deleteProduct(productId) {
        if (window.confirm("¿Desea eliminar este producto?")) {
            fetch(process.env.REACT_APP_API + 'Product/' + productId, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(dataResponse => {
                console.log("data: dekete ", dataResponse.data)
                if (dataResponse.data) {
                    alert("Producto eliminado correctamente")
                    this.refreshListProducts();
                }                
            })
            .catch(err => {
                console.log("delete error");
            })
        }
    }

    componentDidMount() {
        this.loadCategories();
        this.refreshListProducts();
    }
    

    componentDidUpdate() {        
    }

    componentWillReceiveProps(nextProps) {
        this.refreshListProducts();
    }

    // FILTROS : PENDIENTE
    handleEjecutarFiltrosBusqueda(event) {

    }

    render() {
        
        let addModalClose = () => this.setState({addmodalShow: false})
        let editModalClose = () => this.setState({editmodalShow: false})

        // paginación
        const {page, perPage, pages, products} = this.state;
        let items = products.slice(page * perPage, (page + 1) * perPage);        

        return (
            <div className="text-center block-info">
                <Alert show={true} variant="success">
                    <Alert.Heading>Filtros de búsqueda</Alert.Heading>
                    <div className="row">
                        <Form.Group className="mb-3 col-md-3">
                            <Form.Label>Buscar por Nombre del producto</Form.Label>
                            <Form.Control placeholder="Nombre..." disabled />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-3">
                            <Form.Label>Buscar por la Descripción</Form.Label>
                            <Form.Control placeholder="Descripción..." disabled />
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-3">
                            <Form.Label>Buscar por la Categoría</Form.Label>
                            <Form.Select disabled>
                                <option>Pendiente implementar</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3 col-md-3 align-items-end justify-content-center d-flex">
                            <Button title="pendiente de implementar" onClick={() => this.handleEjecutarFiltrosBusqueda()} variant="outline-success" disabled>
                                Buscar Productos
                            </Button>
                        </Form.Group>                                                        
                    </div>
                </Alert>         
                <hr />


     

                <Table className="mt-4" striped bordered size="sm">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th>Imagen</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length > 0 && products.map(prod => (
                                <tr key={ prod.id }>
                                    <td>{ prod.name }</td>
                                    <td>{ prod.description }</td>
                                    <td>{ prod.category ? prod.category.name: '- implementar Lazy Load - ' }</td>
                                    <td>
                                        <Image 
                                            className="image-test__arandasoft"
                                            width="50px" 
                                            height="50px" 
                                            src={ process.env.REACT_APP_IMAGEPATH + prod.image } 
                                        />
                                    </td>
                                    <td>
                                        <ButtonToolbar className="justify-content-around">
                                            <Button 
                                                className="mr-2" 
                                                variant="info"
                                                onClick={() => this.setState({
                                                    editmodalShow: true,
                                                    product: {
                                                        id: prod.id,
                                                        name: prod.name,
                                                        image: prod.image,
                                                        description: prod.description,
                                                        categoryId: prod.categoryId
                                                    }
                                                })}
                                            >
                                                EDITAR
                                            </Button>
                                            <Button 
                                                clasName="ml-2" 
                                                variant="danger"
                                                onClick={() => this.deleteProduct(prod.id)}>
                                                ELIMINAR
                                            </Button>

                                            <Editproduct 
                                                show={ this.state.editmodalShow }
                                                onHide={ editModalClose }
                                                id={ this.state.product.id }
                                                name={ this.state.product.name }
                                                description={ this.state.product.description }
                                                categoryId={ this.state.product.categoryId }
                                                image={ this.state.product.image }
                                                categories= { this.state.categories}
                                                refreshListProducts = { this.refreshListProducts }
                                            />
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>


                {/*<ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    pageCount={pages}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                /> */}               

                <ButtonToolbar>
                    <Button className="mb-5" variant='primary' onClick={() => this.setState({ addmodalShow: true })}>
                        Agregar Producto
                    </Button>

                    <Addproduct 
                        show={ this.state.addmodalShow } 
                        onHide={ addModalClose }
                        categories= { this.state.categories}
                        refreshListProducts = {this.refreshListProducts}
                    />
                </ButtonToolbar>
            </div>
        );
    }
}

export default Product;
