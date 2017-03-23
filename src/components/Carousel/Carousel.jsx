import React from 'react';
import './carousel.css';

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let children = [];
    for (let i = 0; i < this.props.children.length; i++) {
      children.push(<div className="carousel-item" key={i}>{this.props.children[i]}</div>)
    }
    return (
      <div className="carousel">
        {children}
      </div>
    );
  }
}
