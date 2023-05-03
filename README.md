# socket-example
This is a sample project that demonstrates how to build a socket-based application using React and Node.js.

## Getting Started
To run this project, you'll need to install Node.js and NPM. Once you have these tools installed, follow the steps below:

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the socket-service directory.
3. Run ```npm install ```to install the server dependencies.
4. Run ```node index.js ```to start the server.
5. Open a new terminal window and navigate to the socket-client directory.
6. Run ```npm install```to install the client dependencies.
7. Run ```npm start``` to start the React app.

### Directory Structure
This project is organized into two main directories:

- socket-service: This directory contains the server code for the application. The server is built using Node.js and Socket.io, and is responsible for broadcasting messages to all connected clients.

- socket-client: This directory contains the React app for the application. The app uses Socket.io to connect to the server and receive real-time updates.
