import React, { 
  Component,
} from "react";
import Button from "@material-ui/core/Button";

class SendMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
    const doAsyncTask = () => Promise.resolve(document.querySelector('.message-list'));
    (async function() {
      let value = await doAsyncTask();
      setTimeout(function() {
        value.scrollTop = value.scrollHeight;
      } ,400) 
    })();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type your message and hit ENTER"
          type="text"
        />
        <Button onClick={this.handleSubmit}>Send</Button>
      </form>
    );
  }
}

export default SendMessageForm;
