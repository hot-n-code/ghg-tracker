import React from 'react';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';

class Leaf extends React.Component {
  render() {
    return (
    // CSS code
        <div className="leaf-box">
          <div className="leaf-percent">
            <div className="percentNum" id="count">0</div>
            <div className="percentB">%</div>
          </div>
          <div id="water" className="leaf-water">
            <svg viewBox="0 0 560 20" className="leaf-water_wave leaf-water_wave_back">
              <use xlinkHref="#wave"></use>
            </svg>
            <svg viewBox="0 0 560 20" className="leaf-water_wave leaf-water_wave_front">
              <use xlinkHref="#wave"></use>
            </svg>
          </div>
        </div>
    );
  }
}

export default Leaf;
