import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Pie } from 'react-chartjs-2';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';

class CumulativeDataChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['Telework', 'Carpool', 'Other', 'Vehicles'],
    };
  }

  transportationData = (dailyUser) => {
    const altTransportation = ['Biking', 'Public Transportation', 'Walking'];
    const allModeData = _.pluck(dailyUser, 'modeOfTransportation');
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
      } else if (altTransportation.includes(mode)) {
        altData.Other += 1;
      } else {
        altData.Vehicle += 1;
      }
      return altData;
    });
    return [altData.Telework, altData.Carpool, altData.Other, altData.Vehicle];
  };

  pieDataSet = (dailyUser) => {
    const dataSets = [
      {
        data: this.transportationData(dailyUser),
        backgroundColor: ['#4f7fa0', '#4b8796', '#6872a0', '#846391'],
      },
    ];
    return dataSets;
  }

  render() {
    return (
        <Grid>
          <Grid.Column width={9}>
            <Pie data={{ labels: this.state.labels, datasets: this.pieDataSet(this.props.dailyUserData) }} height='200px'/>
          </Grid.Column>
          <Grid.Column textAlign='right' width={7}>
            <Header as='h1' color='blue'> MODES OF TRAVEL COUNT </Header>
          </Grid.Column>
        </Grid>
    );
  }
}
CumulativeDataChart.propTypes = {
  dailyUserData: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscriptionDailyUser = Meteor.subscribe(DailyUserData.cumulativePublicationName);

  return {
    dailyUserData: DailyUserData.collection.find({}).fetch(),
    ready: subscriptionDailyUser.ready(),
  };
})(CumulativeDataChart);
