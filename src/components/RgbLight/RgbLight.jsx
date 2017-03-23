import React from 'react';
import Backend from '../../backend/light.js';
import Switch from '../Switch/Switch.jsx';
import Slider from '../Slider/Slider.jsx';

export default class RgbLight extends React.Component {
  constructor(props) {
    super(props);
    this.handlePower = this.handlePower.bind(this);
    this.handleLuminance = this.handleLuminance.bind(this);
    this.handleSaturation = this.handleSaturation.bind(this);
    this.handleHue = this.handleHue.bind(this);
    this.state = {power: false, hue: 0, saturation: 0, luminance: 0}
  }

  componentDidMount() {
    Backend.status(this.props.device).then(r => {
      let state = this.rgbToHsv(r.red, r.green, r.blue);
      state.power = r.power;
      this.setState(state);
    });
  }

  render() {
    return (
      <div className="pwmlight control">
        <div className="header">
          <h2>{this.props.name}</h2>
        </div>
        <div className="container">
          <Switch power={this.state.power} onChange={this.handlePower} center={true} />
          <Slider value={this.state.hue} onChange={this.handleHue} style={{top: 15, position: 'absolute', width: '100%'}} color="hue"/>
          <Slider value={this.state.saturation} onChange={this.handleSaturation} style={{top: 50, position: 'absolute', width: '100%'}}  color="saturation"/>
          <Slider value={this.state.luminance} onChange={this.handleLuminance} style={{bottom: 15, position: 'absolute', width: '100%'}} color="luminance"/>
        </div>
      </div>
    );
  }

  handlePower(power) {
    Backend.message(this.props.device, "power", {"power": power})
    this.setState({power})
  }

  handleLuminance(value) {
    this.update({hue: this.state.hue, saturation: this.state.saturation, luminance: value});
  }

  handleHue(value) {
    this.update({hue: value, saturation: this.state.saturation, luminance: this.state.luminance});
  }

  handleSaturation(value) {
    this.update({hue: this.state.hue, saturation: value, luminance: this.state.luminance});
  }

  update(newState) {
    let color = this.hsvToRgb(newState.hue, newState.saturation, newState.luminance);
    this.setState(newState);
    Backend.message(this.props.device, "color", color);
  }

  hsvToRgb(h, s, v) {
    h += 0.333;
    if (h > 1) h -= 1;
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        red: Math.round(r * 255),
        green: Math.round(g * 255),
        blue: Math.round(b * 255)
    };
  }

  rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    h -= 0.333;
    if (h < 0) h += 1;

    return {hue: h, saturation: s, luminance: v}
  }
}
