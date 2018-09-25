import React, { Component } from "react";
import Chatkit from "@pusher/chatkit";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import img from "../img/icon.png";
import maximize from "../img/maximize.png";
import style from "../styles/App.css";

const testToken =
  "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/ca8f1b69-30ad-4c29-8fd8-57eb195cab66/token";
const instanceLocator = "v1:us1:ca8f1b69-30ad-4c29-8fd8-57eb195cab66";
const roomId = 16867911;
const username = "yurii";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.maximizeChat = this.maximizeChat.bind(this);
  }

  maximizeChat() {
    let chatElement = document.querySelector('.chat');
    chatElement.classList.toggle('max');
    localStorage.setItem('maximize', 'true');  
  }

  render() {
    return (
      <div className="header">
        <img 
          src={img} 
          width='30px' 
          alt="icon"
        />
        <img 
          src={maximize} 
          width='30px' 
          alt="maximize" 
          className="header-maximize"
          onClick={this.maximizeChat}
        />
      </div>
    )
  }
}

class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: username,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: roomId
    });
  }

  render() {
    return (
      <div className="app" ref="img">
        <Header />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default AppComponent;
