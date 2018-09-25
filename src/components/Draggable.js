import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Draggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relX: 0,
            relY: 0,
            x: this.props.x,
            y: this.props.y
        };
        this.gridX = props.gridX || 1;
        this.gridY = props.gridY || 1;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    static propTypes = {
        onMove: PropTypes.func,
        onStop: PropTypes.func,
        x: PropTypes.number,
        y: PropTypes.number,
        gridX: PropTypes.number,
        gridY: PropTypes.number
    }; 

    onStart(e) {
        const ref = ReactDOM.findDOMNode(this.handle);
        const body = document.body;
        const box = ref.getBoundingClientRect();
        this.setState({
            relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
            relY: e.pageY - (box.top + body.scrollTop - body.clientTop)
        });
    }
    
    onMove(e) {
        const x = Math.trunc((e.pageX - this.state.relX) / this.gridX) * this.gridX;
        const y = Math.trunc((e.pageY - this.state.relY) / this.gridY) * this.gridY;
        let chatElement = document.querySelector('.app');
        const offset = -30;
        if ((x !== this.state.x || y !== this.state.y) 
            && e.pageX - this.state.relX < window.innerWidth - chatElement.offsetWidth + offset
            && e.pageX - this.state.relX > offset
            && e.pageY - this.state.relY > 0
            && e.pageY - this.state.relY + chatElement.offsetHeight < window.innerHeight) {

            this.setState({
                x,
                y
            });
            this.props.onMove && this.props.onMove(this.state.x, this.state.y);
        }        
    }

    onMouseDown(e) {
        if (e.button !== 0) return;
        this.onStart(e);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        //e.preventDefault();
    }

    componentDidMount() {
        // local storage position
        let chatElement = document.querySelector('.chat');
        let left = Math.abs(localStorage.getItem('leftProperty'));
        let top = Math.abs(localStorage.getItem('topProperty'));
        chatElement.style.left = `${left}px`;
        chatElement.style.top = `${top}px`;
        // local storage maximize
        if (localStorage.getItem('maximize') === 'true') {
            document.querySelector('.chat').classList.toggle('max')
        }
        // scroll to bottom
        const doAsyncTask = () => Promise.resolve(document.querySelector('.message-list'));
        (async function() {
            let value = await doAsyncTask();
            setTimeout(function() {
                value.scrollTop = value.scrollHeight;
            } ,2000) 
        })();
    }

    onMouseUp(e) {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        this.props.onStop && this.props.onStop(this.state.x, this.state.y);
        let chatElement = document.querySelector('.chat');
        localStorage.setItem('leftProperty', chatElement.offsetWidth - window.innerWidth);
        localStorage.setItem('topProperty', chatElement.offsetHeight - window.innerHeight);
    }

    onMouseMove(e) {
        this.onMove(e);
        //e.preventDefault();
    }

    onTouchStart(e) {
        this.onStart(e.touches[0]);
        document.addEventListener('touchmove', this.onTouchMove, {passive: false});
        document.addEventListener('touchend', this.onTouchEnd, {passive: false});
        //e.preventDefault();
    }

    onTouchMove(e) {
        this.onMove(e.touches[0]);
        //e.preventDefault();
    }

    onTouchEnd(e) {
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
        this.props.onStop && this.props.onStop(this.state.x, this.state.y);
        // let chatElement = document.querySelector('.chat');
        // console.log(chatElement.offsetWidth, chatElement.offsetHeight)
        //e.preventDefault();
    }

    render() {
        
        return <div
        className="chat"
            onMouseDown={this.onMouseDown}
            onTouchStart={this.onTouchStart}
            style={{
                left: this.state.x,
                top: this.state.y,
                touchAction: 'none',
                right: 0,
                bottom: 0,
            }}
            ref={(div) => { this.handle = div; }}
        >
            {this.props.children}
        </div>;
    }
}

export default Draggable