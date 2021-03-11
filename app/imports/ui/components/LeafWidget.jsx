import React from 'react';
import { Meteor } from 'meteor/meteor';
// import SimpleSchema from 'simpl-schema';
// import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import swal from 'sweetalert';
import { Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
// import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { _ } from 'meteor/underscore';
// import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
// import { computeCO2Reduced, getAltTransportation } from '../utilities/GlobalFunctions';

// Renders modal for inputting daily data
class LeafWidget extends React.Component {
  const cnt=document.getElementById("count");
  const water=document.getElementById("water");
  const percent=cnt.innerText;
  const goal=80; //goal that user set, link to the user enter,
  const co2reduced=40; //sum of co2reduced from alt page, link it from alt page
  const currentpercent=0; // to caculate so it out off 100%

  const interval=setInterval(function(){
    currentpercent = (co2reduced/goal);  //finding the % of co2redced out of the goal. because goal not always 100.

    if(percent <= (currentpercent*100)) {  //add percent until it reach the point.
      percent++;
    }

    cnt.innerHTML = percent;
    water.style.transform='translate(0'+','+(100-percent)+'%)';

    if(percent==(currentpercent*100)){  //when percent reach percent of it stops.
      clearInterval(interval);
    }

    if(co2reduced == goal) {
      //reset
    }
    //when goal = co2reduced than it reset and ask user another goal from the week, month, and year
  },60);
  render() {
    return (
        <div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             style="display: none;">
          <symbol id="wave">
            <path
                d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
            <path
                d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
            <path
                d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
            <path
                d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
          </symbol>
        </svg>
    <div className="box">
      <div className="percent">
        <div className="percentNum" id="count">0</div>
        <div className="percentB">%</div>
      </div>
      <div id="water" className="water">
        <svg viewBox="0 0 560 20" className="water_wave water_wave_back">
          <use xlink:href="#wave"></use>
        </svg>
        <svg viewBox="0 0 560 20" className="water_wave water_wave_front">
          <use xlink:href="#wave"></use>
        </svg>
      </div>
    </div>
        </div>
  );
  }
}
// withTracker connects Meteor data to React components.
export default withTracker(() => {
  const subscription = Meteor.subscribe(Vehicle.userPublicationName);
  const email = Meteor.user().username;
  return {
    vehicles: Vehicle.collection.find({ owner: email }).fetch(),
    ready: subscription.ready(),
  };
})(LeafWidget);
