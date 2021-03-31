import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { withRouter } from 'react-router-dom';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';

// Displaying a pie chart of the mode of transportation from DailyUserData collection
const Leaf = () => {
  const cnt = document.getElementById('count');
  const water = document.getElementById('water');
  let percent = cnt.innerText;
  const goal = 80; // goal that user set, link to the user enter,
  let currentpercent = 0; // to caculate so it out off 100%
  const email = Meteor.user().username;
  const user = _.where(DailyUserData.collection.find({}).fetch(), { owner: email });

  const interval = setInterval(function () {
    currentpercent = (user.cO2Reduced / goal); // finding the % of co2redced out of the goal. because goal not always 100.

    if (percent <= (currentpercent * 100)) { // add percent until it reach the point.
      percent++;
    }

    cnt.innerHTML = percent;
    // eslint-disable-next-line no-useless-concat
    water.style.transform = `${'translate(0' + ','}${100 - percent}%)`;

    if (percent === (currentpercent * 100)) { // when percent reach percent of it stops.
      clearInterval(interval);
    }

    if (user.cO2Reduced === goal) {
      // reset
    }
  }, 60);

  return (
      <Grid>
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
      </Grid>
  );
};

export default withRouter(Leaf);
