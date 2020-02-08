import React, { useState } from 'react'
import App from './App';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login() {
    const [show, setShow] = useState(true);
    const [userId, setuserId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        setuserId(form.userid.value)
        setShow(false);
    };

    return (
        <>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="userid">
                            <Form.Label>User Id:</Form.Label>
                            <Form.Control as="select" >
                                <option>test1</option>
                                <option>test2</option>
                                <option>test3</option>
                                <option>test4</option>
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" >
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <App userId={userId} />
        </>
    )
}
