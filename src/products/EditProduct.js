import React, { Component } from 'react';
import { Col, Form, Modal, Row, Button, Image } from 'react-bootstrap';
import AlertDialog from './../components/AlertDialog';
import './Product.css';

class Editproduct extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.state = {
            imageUpload: '',
            'imageDefault': props.image,
            'imageUrl': process.env.REACT_APP_IMAGEPATH,
            alertDialogModal: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);

        console.log("props: image ", props.image);
    }

    refrescarImagen = () => {
        if (this.props.image !== '') {
            this.setState({
                imageDefault: this.props.image
            })
        }
    }


    componentDidMount() {
        console.log("imagen: ", this.props.image)
        this.refrescarImagen();
    }

    componentDidUpdate() {
        console.log("componentDidUpdate")
    }

    componentWillReceiveProps(nextProps) {
        console.log("next props ", nextProps)
        this.setState({
            imageDefault: nextProps.image
        });
    }    

    // Acción editar
    handleSubmit(event) {
        event.preventDefault();

        fetch(process.env.REACT_APP_API + 'Product' + '?id=' + event.target.id.value, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                name: event.target.name.value,
                description: event.target.description.value,
                image: this.state.imageDefault,
                categoryId: event.target.categoryId.value
            })
        })
        .then(res => res.json())
        .then((result) => {
            console.log("post result: ", result)

            // Refreshcar el listado
            // eslint-disable-next-line no-unused-expressions
            this.setState({alertDialogModal: true})

            this.props.onHide();

            this.props.refreshListProducts();
        })
        .catch(err => {
            console.log("err", err)
        })
    }

    // SAVE IMAGE
    handleFileSelected(event) {
        event.preventDefault();

        this.setState({
            imageUpload: event.target.files[0].name            
        })

        const formData = new FormData();
        formData.append(
            "uploadImage",
            event.target.files[0],
            event.target.files[0].name,
        );

        fetch(process.env.REACT_APP_API + 'Product/uploadImage', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(dataResponse => {
            console.log("response upload image: ", dataResponse)
            // Setear en el estado la imagen:  imageDefault
            this.setState({
                imageDefault: dataResponse
            })
        })
        .catch(err => {
            console.log("error upload image ", err)
        })
    }      

    render() {
        

        let handleCloseAlertDialogModal = () => this.setState({alertDialogModal: false})
        //let handleOpenAlertDialogModal = () => this.setState({alertDialogModal: true})

        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="container-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Editar Producto
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={ this.handleSubmit }>
                                    <Form.Group controlId="id">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control 
                                            disabled 
                                            type="text" 
                                            name="id" 
                                            required 
                                            defaultValue={this.props.id}
                                            placeholder="ID del producto" 
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="name">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="name" 
                                            required 
                                            placeholder="Nombre del producto" 
                                            defaultValue={this.props.name}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="description">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="description" 
                                            required 
                                            placeholder="Descripción del prodycto" 
                                            defaultValue={this.props.description}
                                        />
                                    </Form.Group>   
                                    
                                    <Form.Group controlId="categoryId">
                                        <Form.Label>Categoría</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name="categoryId"
                                            defaultValue={ this.props.categoryId }
                                        >
                                        {
                                            this.props.categories && this.props.categories.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))
                                        }
                                        </Form.Control>
                                    </Form.Group>                                      

                                    <Form.Group>
                                        <Button className="mt-4" variant="primary" type="submit">
                                            Actualizar Producto
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>

                            <Col sm={6}>
                                <Image 
                                    className="image-test__arandasoft"
                                    width="200px" 
                                    height="200px" 
                                    src={ this.state.imageUrl + this.state.imageDefault } 
                                />
                                <input 
                                    onChange={ this.handleFileSelected}
                                    type="File" 
                                />

                            </Col>                            
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={ this.props.onHide }>Cerrar</Button>
                    </Modal.Footer>
                </Modal>

                <AlertDialog 
                    show={ this.state.alertDialogModal }
                    onHide={handleCloseAlertDialogModal}
                >
                    <h3>Producto Editado correctamente</h3>                
                </AlertDialog>
               
            </div>
        );
    }
}

export default Editproduct;
