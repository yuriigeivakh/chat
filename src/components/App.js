import React, { 
  Component
} from "react";
import AppComponent from "./AppComponent";
import Draggable from './Draggable';
import img from "../img/icon.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    let icon = document.querySelector('.icon');
    icon.classList.toggle('icon-clicked');
    localStorage.setItem('open', !this.state.isOpen); 
  }

  render() {
    return (
      <div>
        <img 
          onClick={this.toggle} 
          src={img} 
          className="icon"
          width="80px" 
          alt="logo"/>
        {this.state.isOpen
        || localStorage.getItem('open') === 'true' 
        ? <Draggable>
            <AppComponent/>
          </Draggable>
        : false}
      </div>
    );
  }
}

export default App;
