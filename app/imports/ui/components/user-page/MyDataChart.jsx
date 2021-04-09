import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid } from 'semantic-ui-react';
import { Pie } from 'react-chartjs-2';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { DailyUserData } from '../../../api/user/ghg-data/DailyUserDataCollection';
import { getCumulativePerMode } from '../../utilities/CumulativeGHGData';
import { UserVehicle } from '../../../api/user/UserVehicleCollection';

// Pie chart of the all time mileage for each mode of transportation for a specific user

const graphObject = {
  telework: 'Telework',
  pTransportation: 'Public Transportation',
  biking: 'Biking',
  walking: 'Walking',
  carpool: 'Carpool',
  evHybrid: 'EVHybrid',
  transportationTypes: ['Telework', 'Public Transportation', 'Biking',
      'Walk', 'Carpool', 'EVHybrid'],
  graphColors: ['#5c8d89', '#4b8796', '#4f7fa0', '#6872a0', '#846391', '#985575'],
};

const MyDataChart = (props) => {
  const teleworkData = getCumulativePerMode(props.userData, graphObject.telework, props.vehicles);
  const totalTelework = teleworkData.VMTReduced;
  const aVData = getCumulativePerMode(props.userData, graphObject.evHybrid, props.vehicles);
  const totalAV = aVData.VMTReduced;
  const bikingData = getCumulativePerMode(props.userData, graphObject.biking, props.vehicles);
  const totalBiking = bikingData.VMTReduced;
  const walkingData = getCumulativePerMode(props.userData, graphObject.walking, props.vehicles);
  const totalWalking = walkingData.VMTReduced;
  const carpoolData = getCumulativePerMode(props.userData, graphObject.carpool, props.vehicles);
  const totalCarpool = carpoolData.VMTReduced;
  const ptData = getCumulativePerMode(props.userData, graphObject.pTransportation, props.vehicles);
  const totalPT = ptData.VMTReduced;
  const stateAll = {
      labels: graphObject.transportationTypes,
      datasets: [{ data: [totalTelework, totalPT, totalBiking, totalWalking, totalCarpool, totalAV],
          backgroundColor: graphObject.graphColors,
      }],
  };

  return (
      <Grid>
          <Grid.Column>
              <Pie data={stateAll} height={250}/>
          </Grid.Column>
      </Grid>
  );
};

MyDataChart.propTypes = {
  userData: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const ready = Meteor.subscribe(DailyUserData.userPublicationName).ready() &&
      Meteor.subscribe(UserVehicle.userPublicationName).ready();
  const userData = DailyUserData.collection.find({}).fetch();
  const vehicles = UserVehicle.collection.find({}).fetch();
  return {
      userData,
      vehicles,
      ready,
  };
})(MyDataChart);
