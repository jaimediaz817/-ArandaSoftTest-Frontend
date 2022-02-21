import React, { Component } from 'react';
import { ButtonToolbar, Table, Button, Image } from 'react-bootstrap';
import Addproduct from './AddProduct';
import Editproduct from './EditProduct';
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
            imageUpload: ''
        }

        this.deleteProduct = this.deleteProduct.bind(this);
        this.refreshListProducts = this.refreshListProducts.bind(this);
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
                });
            })        
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

    render() {

        const { products } = this.state;

        let addModalClose = () => this.setState({addmodalShow: false})
        let editModalClose = () => this.setState({editmodalShow: false})

        return (
            <div className="">                
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
                                    <td>{ prod.category.name }</td>
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
