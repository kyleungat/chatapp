import React, {useState, useContext} from 'react';
import SubscribedRoomContext from '../SubscribedRoomContext'

export default function Input() {
    // States:
    // value of this controlled component
    const [value, setValue] = useState("");
    const subscribedRoom = useContext(SubscribedRoomContext);

    // handle submit
    // push the message to the room
    const handleSubmit = e => {
        e.preventDefault();
        subscribedRoom.user.sendSimpleMessage({
                roomId: subscribedRoom.room.id,
                text: value,
            })
            .then(messageId => {
            })
            .catch(err => {
            });
        setValue("");

    }

    return (
        <div className="inputBox">
            <form onSubmit={handleSubmit}>
                <input 
                    value={value} 
                    onChange={e => setValue(e.target.value)} 
                    type="text" 
                    placeholder="Enter the message" 
                    disabled={subscribedRoom.room === null} />
            </form>
        </div>
    )
}


