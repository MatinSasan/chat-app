import React, { Component } from "react";
import ReactDOM from "react-dom";
import Message from "./Message";

export class MessageList extends Component {
  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  render() {
    if (!this.props.roomId) {
      return (
        <div className='message-list'>
          <div className='join-room'>&larr; Join a room!</div>
        </div>
      );
    }
    return (
      <div className='message-list'>
        {this.props.messages.map((message, index) => {
          return (
            <Message
              key={index}
              userName={message.senderId}
              text={message.parts[0].payload.content}
              // text={message.map(item => item.payload.content)}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
