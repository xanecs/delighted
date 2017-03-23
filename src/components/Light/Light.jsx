import React from 'react';
import Backend from '../../backend/light.js';
import Switch from '../Switch/Switch.jsx';

export default class Light extends React.Component {
  constructor(props) {
    super(props);
    this.state = {power: false}
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    Backend.status(this.props.device).then(r => this.setState({power: r.power}));
  }

  render() {
    return (
      <div className="light control">
        <div className="header">
          <h2>{this.props.name}</h2>
        </div>
        <div className="container">
          <Switch power={this.state.power} onChange={this.handleClick} center={true} />
        </div>
      </div>
    );
  }

  handleClick(power) {
    this.setState({power});
    Backend.message(this.props.device, "write", {"power": power});
  }
}
