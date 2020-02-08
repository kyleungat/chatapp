import React, {useContext} from 'react';
import Message from './Message';
import Broadcast from './Broadcast';
import SubscribedRoomContext from '../SubscribedRoomContext';

export default function ChatRoomContent() {
    const subscribedRoom = useContext(SubscribedRoomContext);
    if (subscribedRoom.room !== null){
        return (
            <div className="chatroom-content">
                {subscribedRoom.messages.map((message, index) => {
                    if (message.status == null){
                        return (
                            <Message key={index} id={message.sender.id} name={message.sender.name} text={message.parts[0].payload.content} /> 
                        );
                    }else
                    {
                        return (
                            <Broadcast key={index} user={message.user.name} status={message.status}/>
                        );
                    }
                })}
            </div>
        )
    }
    else {
        return (
            <div className="chatroom-content">  
                <div className="splash-message">Please select a room</div>
            </div>
        );
    }
}
