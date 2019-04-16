import React from "react";

export default function Message(props) {
  return (
    <div>
      <div className='message'>
        <div className='message-username'>{props.userName}</div>
        <div className='message-text'>{props.text}</div>
      </div>
    </div>
  );
}
