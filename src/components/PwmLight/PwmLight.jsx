import React from 'react';
import Backend from '../../backend/light.js';
import Switch from '../Switch/Switch.jsx';
import Slider from '../Slider/Slider.jsx';

export default class PwmLight extends React.Component {
  constructor(props) {
    super(props);
    this.handlePower = this.handlePower.bind(this);
    this.handleBrightness = this.handleBrightness.bind(this);
    this.state = {power: false, brightness: 0}
  }

  componentDidMount() {
    Backend.status(this.props.device).then(r => this.setState({
      power: r.power,
      brightness: r.brightness
    }));
  }

  render() {
    return (
      <div className="pwmlight control">
        <div className="header">
          <h2>{this.props.name}</h2>
        </div>
        <div className="container">
          <Switch power={this.state.power} onChange={this.handlePower} center={true} />
          <Slider value={this.state.brightness} onChange={this.handleBrightness} style={{bottom: 15, position: 'absolute', width: '100%'}} color="luminance"/>
        </div>
      </div>
    );
  }

  handlePower(power) {
    Backend.message(this.props.device, "power", {"power": power})
    this.setState({power})
  }

  handleBrightness(brightness) {
    Backend.message(this.props.device, "brightness", {"brightness": brightness})
    this.setState({brightness})
  }
}
