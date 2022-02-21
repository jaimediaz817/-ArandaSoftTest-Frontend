import React, { useState } from 'react';
import { Modal, Row, Button } from 'react-bootstrap';

const AlertDialog = (props) => {

    const [alertDialogModal, setAlertDialogModal] = useState();

    const handleCloseAlertDialogModal = () => {
        setAlertDialogModal(false);
    }

    const handleOpenAlertDialogModal = () => {
        setAlertDialogModal(true);
    }    

    return (
        <Modal show={props.show} onHide={props.onHide} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Operación exitosa</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ props.onHide }>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>   
    );
}

export default AlertDialog;
