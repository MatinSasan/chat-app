import React, { Component } from "react";

import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";

import "./App.css";
import Chatkit from "@pusher/chatkit-client";

import { instanceLocator, tokenUrl } from "./config";

// Yes, I've made this. Thank you for reading :)

class App extends Component {
  state = {
    roomId: null,
    messages: [],
    joinableRooms: [],
    joinedRooms: []
  };

  // since the keys are hidden, the original app cannot operate on github

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator, //sorry,hidden the keys, so the app can't work :(
      userId: "Max",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl //hidden the keys too, so the app can't work
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
        // this.subscribeToRoom();
      })
      .catch(err => {
        console.log("Error on conection", err);
      });
  }

  getRooms = () => {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("error", err));
  };

  subscribeToRoom = roomId => {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoomMultipart({
        roomId,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        console.log("roomId", room);
        this.setState({
          roomId: room.id
        });
        this.getRooms();
      })
      .catch(err => console.log("Error on subscription", err));
  };

  sendMessage = text => {
    this.currentUser.sendMultipartMessage({
      roomId: this.state.roomId,
      parts: [{ type: "text/plain", content: text }]
    });
  };

  createRoom = name => {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log(`Error: ${err}`));
  };

  render() {
    console.log("messages", this.state.messages);
    return (
      <div className='App'>
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
