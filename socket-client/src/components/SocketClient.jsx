import { nanoid } from "nanoid";
import { Component, createRef } from "react";
import { io } from "socket.io-client";

export default class SocketClient extends Component {
  constructor(props) {
    super(props);
    this.listRef = createRef();
    this.socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });
  }

  state = {
    messages: [],
    autoScroll: true,
  };

  componentDidMount() {
    this.socket.on("message", (data) => {
      this.setState((prevState) => {
        const updatedMessages = [...prevState.messages];
        if (updatedMessages.length === 15) {
          updatedMessages.splice(0, 1);
        }
        return {
          ...prevState,
          messages: [...updatedMessages, { content: data, id: nanoid() }],
        };
      });
    });
  }

  componentDidUpdate() {
    if (this.state.autoScroll) {
      const lastMsg =
        this.listRef?.current?.children[
          this.listRef?.current?.children.length - 1
        ];
      if (lastMsg?.offsetTop >= 300 - 36) {
        lastMsg.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  resetMessageList = () => {
    this.setState((prevState) => ({ ...prevState, messages: [] }));
  };

  toggleAutoScroll = () => {
    this.setState((prevState) => ({
      ...prevState,
      autoScroll: !prevState.autoScroll,
    }));
  };

  render() {
    return (
      <>
        <div
          style={{ display: "flex", gap: 10, justifyContent: "space-around" }}
        >
          <button
            style={{
              backgroundColor: this.state.autoScroll ? "unset" : "pink",
            }}
            onClick={this.toggleAutoScroll}
          >{`Turn auto scroll ${this.state.autoScroll ? "OFF" : "ON"}`}</button>
          <h3>{this.state.messages.length} messages</h3>
          <button onClick={this.resetMessageList}>Empty messages</button>
        </div>
        <ul
          style={{
            width: 500,
            height: 300,
            border: "1px solid black",
            overflowY: "scroll",
            padding: 5,
            backgroundColor: "gray",
            position: "relative",
          }}
          ref={this.listRef}
        >
          {this.state.messages.map((msg) => (
            <li
              key={msg.id}
              style={{
                listStyle: "none",
                backgroundColor: "white",
                padding: 5,
                border: "1px solid black",
                marginBottom: 5,
              }}
            >
              {msg.content}
            </li>
          ))}
        </ul>
      </>
    );
  }
}
