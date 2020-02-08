import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SubscribedRoomContext from '../SubscribedRoomContext'
import Form from 'react-bootstrap/Form';


export default function NewRoomButton() {
    const [show, setShow] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const subscribedRoom = useContext(SubscribedRoomContext);

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.privateCheckbox.checked === true && !form.users.value ) {
          setInvalid(true);
          return;
        } 
        setInvalid(false);
        setShow(false);
        subscribedRoom.user.createRoom({
            name: form.roomname.value,
            private: form.privateCheckbox.checked,
            addUserIds: form.privateCheckbox.checked?[form.users.value]:[],
        }).then(room => {
            // subscribedRoom.createNewRoom(room);
        })
            .catch(err => {
            })
    };

    return (
        <div className="newroom-btn-container">
            <button className="newroom-btn" onClick={handleShow}>new room</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Room</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="roomname">
                            <Form.Label>Room Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter the Room Name" />
                            <Form.Text className="text-muted">
                                Within 20 characters.
                            </Form.Text>
                        </Form.Group>
                        <Form.Check
                            custom
                            type={"checkbox"}
                            id={"privateCheckbox"}
                            label={"Private Room"}
                        />
                        <br />
                        <Form.Group controlId="users">
                            <Form.Label>Add Users:</Form.Label>
                            <Form.Control isInvalid={invalid} type="text" placeholder="Enter the User ID" />
                            <Form.Control.Feedback type="invalid">
                                As it is a private room, please Enter a Valid User ID.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" >
                            Confirm
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}
