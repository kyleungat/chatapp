import React, {useContext} from 'react';
import SubscribedRoomContext from '../SubscribedRoomContext'

const Message = ({id, name, text}) => {
    const subscribedroom = useContext(SubscribedRoomContext);
    if (id === subscribedroom.user.id){
        return (
            <div className="message message-self">
                <h3 className="message-username">Me</h3>
                <p className="message-text">{text}</p>
            </div>
        );
    }else{
        return (
            <div className="message message-others">
                <h3 className="message-username">{name}</h3>
                <p className="message-text">{text}</p>
            </div>
        );
    }
};

export default Message;


