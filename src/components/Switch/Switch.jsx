import React from 'react';
import './switch.css';

export default class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    let power = this.props.power ? 'on' : 'off';
    let center = this.props.center ? 'center' : '';
    return (
      <div onClick={this.handleClick} className={center + " switch " + power}>
        <div className="mover">
          <div className="top-label">OFF</div>
          <div className="lever"></div>
          <div className="bottom-label">ON</div>
        </div>
      </div>
    );
  }

  handleClick() {
    this.props.onChange(!this.props.power);
  }
}
