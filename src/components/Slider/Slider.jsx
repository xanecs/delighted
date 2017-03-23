import React from 'react';
import './slider.css';

export default class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.update = 0;
  }

  render() {
    let style = !this.bar ? {} : {left: this.bar.getBoundingClientRect().width * this.props.value}
    return (
      <div onClick={this.handleClick} className={"slider " + this.props.color} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseDown} style={this.props.style}>
        <div className="bar" ref={bar => {this.bar = bar}}>
          <div className="lever" onDrag={this.handleDrag} style={style} ref={lever => {this.lever = lever}}></div>
        </div>
      </div>
    );
  }

  handleMouseDown(e) {
    if (e.buttons === 1) {
      let rect = this.bar.getBoundingClientRect();
      let left0 = (e.pageX - rect.left);
      let value = left0 / (rect.right - rect.left);
      if (value < 0) value = 0;
      if (value > 1) value = 1;
      let time = +Date.now()
      this.props.onChange(value)
    }
  }
}
