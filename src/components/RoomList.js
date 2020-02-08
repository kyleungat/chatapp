import React, { useState, useContext } from 'react';
import Room from './Room';
import { GiExitDoor } from "react-icons/gi";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SubscribedRoomContext from '../SubscribedRoomContext'

const RoomList = ({ rooms }) => {
    const [show, setShow] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const subscribedRoom = useContext(SubscribedRoomContext);

    const handlePlusClick = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        subscribedRoom.user.getJoinableRooms()
            .then(rooms => {
                const validRoom = rooms.filter(room => {
                    return room.id === form.roomId.value
                });
                console.log(validRoom);
                //   There is an existing room to join
                if (validRoom.length) {
                    subscribedRoom.user.joinRoom({ roomId: validRoom[0].id })
                        .then(room => {
                            // close the modal
                            // update the subscribed room and change to it
                            setShow(false);
                            subscribedRoom.setSubscribedRoom(room);
                        })
                        .catch(err => {
                        })
                } else {
                    setInvalid(true);
                }
            })
            .catch(err => {
                setInvalid(true);
            })
    };

    return (
        <>
            <div className="roomlist">
                <h2>Rooms<GiExitDoor className="join-btn" onClick={handlePlusClick} /></h2>
                <h3>public rooms</h3>
                <ul>
                    {rooms.map(room => {
                        if (!room.isPrivate) {
                            return <Room key={room.id} room={room} />
                        }
                        return null;
                    })}
                </ul>
                <h3>Private rooms</h3>
                <ul>
                    {rooms.map(room => {
                        if (room.isPrivate) {
                            return <Room key={room.id} room={room} />
                        }
                        return null;
                    })}
                </ul>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Join an Existed room</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group controlId="roomId">
                            <Form.Label />
                            <Form.Control isInvalid={invalid} type="text" placeholder="Enter the Room ID" />
                            <Form.Control.Feedback type="invalid">
                                Not an existing room.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        </>
    );
};

export default RoomList;