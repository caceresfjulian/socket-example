import { Component, createRef } from "react";
import MessageQueue from "../utils/MessageQueue";

export default class SocketClient extends Component {
  constructor(props) {
    super(props);
    this.listRef = createRef();
  }

  state = {
    queue: new MessageQueue({
      size: 20,
      interval: 0.5,
      updateState: this.setState.bind(this),
    }),
    autoScroll: true,
  };

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
    this.state.queue.stopQueue();
  }

  resetMessageList = () => {
    this.state.queue.resetMessages();
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
          <h3>{this.state.queue.getMessagesCount()} messages</h3>
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
          {this.state.queue.getMessages().map(
            (msg) =>
              msg && (
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
              )
          )}
        </ul>
      </>
    );
  }
}
