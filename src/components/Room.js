import React, {useContext} from 'react'
import SubscribedRoomContext from '../SubscribedRoomContext'

export default function Room({room}) {
    const subscribedRoom = useContext(SubscribedRoomContext);
    return (
        <li 
            className={(subscribedRoom.room && room.id === subscribedRoom.room.id)? "active": ""}
            onClick={() => {subscribedRoom.setSubscribedRoom(room)} }
         >
            {room.name}
        </li>
    )
}
