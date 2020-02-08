import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import ChatKit from '@pusher/chatkit-client';
import ChatRoom from './ChatRoom';
import RoomList from './RoomList';
import Input from './Input';
import NewRoomButton from './NewRoomButton';
import { GiHamburgerMenu } from "react-icons/gi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { tokenUrl, instanceLocator } from '../config'
import SubscribedRoomContext from '../SubscribedRoomContext'

export default function App({userId}) {
  const [user, setUser] = useState(null);
  const [showRoomList, setShowRoomList] = useState(false);
  const [rooms, setRoom] = useState([]);
  const [subscribedRoom, setSubscribedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();
  const roomsRef = useRef();


  useEffect(() => {
    // Connect the chatManager 
    const chatManager = new ChatKit.ChatManager({
      instanceLocator: instanceLocator,
      userId: userId,
      tokenProvider: new ChatKit.TokenProvider({
        url: tokenUrl,
      })
    });

    chatManager
      .connect({
        onAddedToRoom: room => {
          console.log("onAddedToRoom Hook");
          roomsRef.current = [...roomsRef.current, room];
          setRoom([...roomsRef.current]);
        },
      })
      .then(currentUser => {
        setUser(currentUser);
        roomsRef.current = currentUser.rooms;
        setRoom(currentUser.rooms);
        messagesRef.current = [];
      })
      .catch(error => {
        console.error("error:" + error);
      });
  }, [userId]);

  // 1. Subscribe to the room
  // 2. clear the messages displayed
  // 3. get the messages
  const contextSetRoom = (subroom) => {
    user.subscribeToRoomMultipart({
      roomId: subroom.id,
      hooks: {
        onMessage: message => {
          messagesRef.current = [...messagesRef.current, message];
          setMessages(messagesRef.current);
        },
        onUserJoined: user => {
          //try to put the user into messages lists as braodcast message
          messagesRef.current = [...messagesRef.current, { user: user, status: "join" }];
          setMessages(messagesRef.current);
        },
        onUserLeft: user => {
          messagesRef.current = [...messagesRef.current, { user: user, status: "leav" }];
          setMessages(messagesRef.current);
        },
      },
      messageLimit: 20,
    });
    changesubscribedRoom(subroom);

  };

  // clear the messages by remove the state: subscribedRoom
  // Update the Roomlist
  const leaveRoom = (subroom) => {
    // should set it to null
    changesubscribedRoom(null);
    const temp = rooms.filter(room => {
      return room.id !== subroom.id
    });
    roomsRef.current = temp;
    setRoom(temp);
  };

  // const createNewRoom = (newroom) => {
  //   user.subscribeToRoomMultipart({
  //     roomId: newroom.id,
  //     hooks: {
  //       onMessage: message => {
  //         messagesRef.current = [...messagesRef.current, message];
  //         setMessages(messagesRef.current);
  //       },
  //       onUserJoined: user => {
  //         //try to put the user into messages lists as braodcast message
  //         messagesRef.current = [...messagesRef.current, { user: user, status: "join" }];
  //         setMessages(messagesRef.current);
  //       },
  //       onUserLeft: user => {
  //         messagesRef.current = [...messagesRef.current, { user: user, status: "leav" }];
  //         setMessages(messagesRef.current);
  //       },
  //     },
  //     messageLimit: 20,
  //   })
  //   const temp = [newroom, ...rooms];
  //   roomsRef.current = temp;
  //   setRoom(temp);
  //   changesubscribedRoom(newroom);
  // };

  //change utility 
  const changesubscribedRoom = (newroom) => {
    setSubscribedRoom(newroom);
    setMessages([]);
    messagesRef.current = [];  
  }

  const handleHamburgerClick = (e) => {
    setShowRoomList(!showRoomList);
  };

  return (
    <div className="App">
      <SubscribedRoomContext.Provider value={{
        user: user,
        room: subscribedRoom,
        messages: messages,
        setSubscribedRoom: contextSetRoom,
        leaveSubscribedRoom: leaveRoom,
        // createNewRoom: createNewRoom,
      }}>
        <GiHamburgerMenu className="hamburgerMenu" onClick={handleHamburgerClick} />
        {showRoomList ?
          <div className="roomlist-container roomlist-container-active">
            <RoomList rooms={rooms} />
            <NewRoomButton />
          </div> :
          <div className="roomlist-container">
            <RoomList rooms={rooms} />
            <NewRoomButton />
          </div>
        }
        <ChatRoom />
        <Input />
      </SubscribedRoomContext.Provider>
    </div>
  );
};

