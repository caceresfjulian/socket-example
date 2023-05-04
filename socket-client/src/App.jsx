import { Component } from "react";
import "./App.css";
import SocketClient from "./components/SocketClient";

class App extends Component {
  state = {
    connectChat: false,
  };

  handleChatConnection = () => {
    this.setState((prevState) => ({ connectChat: !prevState.connectChat }));
  };

  render() {
    return (
      <>
        <h1>GoIT Queue</h1>
        {this.state.connectChat ? (
          <>
            <SocketClient />
            <button onClick={this.handleChatConnection}>Disconnect chat</button>
          </>
        ) : (
          <button onClick={this.handleChatConnection}>Connect chat</button>
        )}
      </>
    );
  }
}

export default App;
