import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';

// Displaying a pie chart of the mode of transportation from DailyUserData collection
const CumulativeDataChart = (props) => {
  // Calculating the sum of individual modes of transportation between all users
  const transportationData = (dailyUser) => {
    const otherAltTransportation = ['Biking', 'Public Transportation', 'Walking'];
    const allUserData = dailyUser;
    const altData = {
      Telework: 0,
      Carpool: 0,
      Other: 0,
      GasVehicle: 0,
      EVHybrid: 0,
    };
    allUserData.map((data) => {
      if (data.modeOfTransportation === 'Telework') {
        altData.Telework += 1;
      } else if (data.modeOfTransportation === 'Carpool') {
        altData.Carpool += 1;
      } else if (otherAltTransportation.includes(data.modeOfTransportation)) {
        altData.Other += 1;
      } else if (data.cO2Reduced > 0) {
          altData.EVHybrid += 1;
        } else {
          altData.GasVehicle += 1;
        }
      return altData;
    });
    return [altData.Telework, altData.Carpool, altData.Other, altData.EVHybrid, altData.GasVehicle];
  };
  // Forming the layout for pie chart
  const pieDataSet = (dailyUser) => {
    const dataSets = {
      labels: ['Telework', 'Carpool', 'Other', 'EV/Hybrid Vehicle', 'Gas Vehicle'],
      datasets: [
          {
            data: transportationData(dailyUser),
            backgroundColor: ['#4f7fa0', '#4b8796', '#6872a0', '#846391', '#FF69B4'],
          }],
  };
    return dataSets;
  };
    return (
        <Grid>
          <Grid.Column width={9}>
            <Header as='h1' color='blue'> MODES OF TRAVEL COUNT </Header>
            <Pie data={ pieDataSet(props.userData)} height={200}/>
          </Grid.Column>
        </Grid>
    );
};

CumulativeDataChart.propTypes = {
  userData: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscriptionDailyUser = Meteor.subscribe(DailyUserData.cumulativePublicationName);

  return {
    userData: DailyUserData.collection.find({}).fetch(),
    ready: subscriptionDailyUser.ready(),
  };
})(CumulativeDataChart);
