import React from 'react'

const SubscribedRoomContext = React.createContext({
    room: null,
    setRoom: () => {},
    messages: [],
});

export default SubscribedRoomContext;