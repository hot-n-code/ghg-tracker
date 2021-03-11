import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Pie } from 'react-chartjs-2';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';

// Displaying a pie chart of the mode of transportation from DailyUserData collection
const CumulativeDataChart = (props) => {
  // Calculating the sum of individual modes of transportation between all users
  const transportationData = (dailyUser) => {
    const otherAltTransportation = ['Biking', 'Public Transportation', 'Walking'];
    const allModeData = dailyUser;
    const altData = {
      Telework: 0,
      Carpool: 0,
      Other: 0,
      Vehicle: 0,
    };
    allModeData.map((mode) => {
      if (mode === 'Telework') {
        altData.Telework += 1;
      } else if (mode === 'Carpool') {
        altData.Carpool += 1;
      } else if (otherAltTransportation.includes(mode)) {
        altData.Other += 1;
      } else {
        altData.Vehicle += 1;
      }
      return altData;
    });
    return [altData.Telework, altData.Carpool, altData.Other, altData.Vehicle];
  };
  // Forming the layout for pie chart
  const pieDataSet = (dailyUser) => {
    const dataSets = {
      labels: ['Telework', 'Carpool', 'Other', 'Vehicles'],
      datasets: [
          {
            data: transportationData(dailyUser),
            backgroundColor: ['#4f7fa0', '#4b8796', '#6872a0', '#846391'],
          }],
  };
    return dataSets;
  };
    return (
        <Grid>
          <Grid.Column width={9}>
            <Pie data={ pieDataSet(props.dailyUserData)} height='200px'/>
          </Grid.Column>
          <Grid.Column textAlign='right' width={7}>
            <Header as='h1' color='blue'> MODES OF TRAVEL COUNT </Header>
          </Grid.Column>
        </Grid>
    );
};

CumulativeDataChart.propTypes = {
  dailyUserData: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscriptionDailyUser = Meteor.subscribe(DailyUserData.cumulativePublicationName);

  return {
    dailyUserData: _.pluck(DailyUserData.collection.find({}).fetch(), 'modeOfTransportation'),
    ready: subscriptionDailyUser.ready(),
  };
})(CumulativeDataChart);
