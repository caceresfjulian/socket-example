import { nanoid } from "nanoid";

export default class MessageQueue {
  constructor({ size = 10, interval = 2, updateState }) {
    this.messages = Array(size);
    this.size = size;
    this.count = 0;
    this.interval = interval;
    this.updateState = updateState;
    this.intervalId = this.initiateQueue();
  }

  initiateQueue = () =>
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 10 + 1);
      const newMessage = { id: nanoid(), content: randomNumber };

      if (!this.messages[this.messages.length - 1]) {
        this.messages[this.count] = newMessage;
        this.count += 1;
        this.updateState((prevState) => ({
          ...prevState,
          queue: { ...this },
        }));
        return;
      }

      this.messages.splice(0, 1);
      this.messages.push(newMessage);
      this.updateState((prevState) => ({
        ...prevState,
        queue: { ...this },
      }));
    }, this.interval * 1000);

  getMessages = () => {
    return this.messages;
  };

  getMessagesCount = () => {
    return this.count;
  };

  resetMessages = () => {
    this.messages = Array(this.size);
    this.count = 0;
    this.updateState((prevState) => ({
      ...prevState,
      queue: { ...this },
    }));
  };

  stopQueue = () => {
    clearInterval(this.intervalId);
  };
}
