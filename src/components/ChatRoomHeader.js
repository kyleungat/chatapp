import React, { useContext, useState } from 'react';
import SubscribedRoomContext from '../SubscribedRoomContext'
import { FaRunning } from "react-icons/fa";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ChatRoomHeader() {
    const subscribedRoom = useContext(SubscribedRoomContext);
    const [show, setShow] = useState(false);

    if (subscribedRoom.room !== null) {
        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Information</Popover.Title>
                <Popover.Content>
                    <div>
                        <strong>Room Id:</strong> {subscribedRoom.room.id}
                    </div>
                    <div>
                        <strong>Created at:</strong> {subscribedRoom.room.createdAt.slice(0, 10)}
                    </div>
                    <div>
                        <strong>Created by:</strong> {subscribedRoom.room.createdByUserId}
                    </div>
                    <div>
                        <strong>{subscribedRoom.room.isPrivate ? "Private" : "Public"}</strong>
                    </div>
                    <div>
                        <strong>Users:</strong>
                        <ul>
                            {subscribedRoom.room.users.map(user => (
                                <li key={user.id}>{user.name}</li>
                            ))}
                        </ul>
                    </div>
                </Popover.Content>
            </Popover>
        );

        const handleClick = e => {
            setShow(true);
        };

        const handleClose = () => {
            setShow(false);
        };

        const handleConfirm = () => {
            setShow(false);
            subscribedRoom.user.leaveRoom({ roomId: subscribedRoom.room.id })
                .then(room => {
                    subscribedRoom.leaveSubscribedRoom(room);
                })
                .catch(err => {
                });
        };

        return (
            <>
                <div className="chatroom-header">
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <h1>{subscribedRoom.room.name}</h1>
                    </OverlayTrigger>
                    <span onClick={handleClick}><FaRunning /></span>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Leave Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to leave this room?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleConfirm}>
                            Confirm
            </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
            </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    else {
        return (
            <div className="chatroom-header">
                <h1>chatkit</h1>
            </div>
        );
    }
};

