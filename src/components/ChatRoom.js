import React from 'react';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomContent from './ChatRoomContent';

const ChatRoom = () => {

    return (
        <div className="chatroom-container">
            <ChatRoomHeader />
            <ChatRoomContent />
        </div>
    );

};

export default ChatRoom;