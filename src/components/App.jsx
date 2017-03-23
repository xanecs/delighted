import React from 'react';
import Carousel from './Carousel/Carousel.jsx';
import Light from './Light/Light.jsx';
import PwmLight from './PwmLight/PwmLight.jsx';
import RgbLight from './RgbLight/RgbLight.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div className="heading">
          <h1>Delighted</h1>
        </div>
        <Carousel>
          <Light name="Stereo" device="stereo" />
          <PwmLight name="Dodec" device="dodec" />
          <RgbLight name="Desk" device="desk" />
        </Carousel>
      </div>
    );
  }
}
