import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { getCumulativePerMode } from '../../utilities/CumulativeGHGData';

// Pie chart of the all time mileage for each mode of transportation for a specific user
const graphObject = {
  telework: 'Telework',
  pTransportation: 'Public Transportation',
  biking: 'Biking',
  walking: 'Walking',
  carpool: 'Carpool',
  evHybrid: 'EVHybrid',
  transportationTypes: ['Telework', 'Public Transportation', 'Biking',
      'Walk', 'Carpool', 'EV/Hybrid', 'Gas'],
  graphColors: ['#5c8d89', '#4b8796', '#4f7fa0', '#6872a0', '#846391', '#F7B733', '#FC4A1A'],
};

const MyDataChart = (props) => {
  const date = new Date();
  const getByMonthIndividual = _.filter(props.userData, (userTrip) => (userTrip.inputDate.getMonth() ===
        date.getMonth() && userTrip.inputDate.getFullYear() === date.getFullYear()));
  const teleworkData = getCumulativePerMode(getByMonthIndividual, graphObject.telework, props.vehicles);
  const totalTelework = teleworkData.VMTReduced.toFixed(2);
  const aVData = getCumulativePerMode(getByMonthIndividual, graphObject.evHybrid, props.vehicles);
  const totalAV = aVData.VMTReduced.toFixed(2);
  const bikingData = getCumulativePerMode(getByMonthIndividual, graphObject.biking, props.vehicles);
  const totalBiking = bikingData.VMTReduced.toFixed(2);
  const walkingData = getCumulativePerMode(getByMonthIndividual, graphObject.walking, props.vehicles);
  const totalWalking = walkingData.VMTReduced.toFixed(2);
  const carpoolData = getCumulativePerMode(getByMonthIndividual, graphObject.carpool, props.vehicles);
  const totalCarpool = carpoolData.VMTReduced.toFixed(2);
  const ptData = getCumulativePerMode(getByMonthIndividual, graphObject.pTransportation, props.vehicles);
  const totalPT = ptData.VMTReduced.toFixed(2);

  const totalCar = _.where(getByMonthIndividual, { modeType: 'Gas' });
  let gasTotal = 0;
  totalCar.forEach((obj) => {
      gasTotal += obj.milesTraveled;
  });
  const stateAll = {
      labels: graphObject.transportationTypes,
      datasets: [{ data: [totalTelework, totalPT, totalBiking, totalWalking, totalCarpool, totalAV,
              gasTotal.toFixed(2)],
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

export default (MyDataChart);
