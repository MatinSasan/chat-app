import React, { Component } from "react";

export class NewRoomForm extends Component {
  state = {
    roomName: ""
  };

  handleChange = e => {
    this.setState({
      roomName: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({ roomName: "" });
  };

  render() {
    return (
      <div className='new-room-form'>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.roomName}
            onChange={this.handleChange}
            type='text'
            placeholder='Create a room'
            required
          />
          <button id='create-room-btn' type='submit' />
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
