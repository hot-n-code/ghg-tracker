import React from 'react';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { UserDailyData } from '../../../api/user/UserDailyDataCollection';

// Displaying a pie chart of the mode of transportation from UserDailyData collection
class CumulativeDataChart extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting your data...</Loader>;
  }

  renderPage() {
    // Calculating the sum of individual modes of transportation between all users
    const transportationData = (userDaily) => {
      const otherAltTransportation = ['Biking', 'Public Transportation', 'Walking'];
      const allUserData = userDaily;
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
        } else if (data.modeType === 'EV/Hybrid' > 0) {
          altData.EVHybrid += 1;
        } else {
          altData.GasVehicle += 1;
        }
        return altData;
      });
      return [altData.Telework, altData.Carpool, altData.Other, altData.EVHybrid, altData.GasVehicle];
    };
    // Forming the layout for pie chart
    const pieDataSet = (userDaily) => {
      const dataSets = {
        labels: ['Telework', 'Carpool', 'Other', 'EV/Hybrid Vehicle', 'Gas Vehicle'],
        datasets: [
          {
            data: transportationData(userDaily),
            backgroundColor: ['#5c8d89', '#846391', '#C0C0C0', '#F7B733', '#FC4A1A'],
          }],
      };
      return dataSets;
    };
    return (
        <Grid>
          <Grid.Column width={9}>
            <Header as='h1' color='blue'> MODES OF TRAVEL COUNT </Header>
            <Pie data={ pieDataSet(this.props.userData)} height={200}/>
          </Grid.Column>
        </Grid>
    );
  }
}
CumulativeDataChart.propTypes = {
  userData: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscriptionUserDaily = UserDailyData.subscribeUserDailyDataCumulative();

  return {
    userData: UserDailyData.find({}).fetch(),
    ready: subscriptionUserDaily.ready(),
  };
})(CumulativeDataChart);
