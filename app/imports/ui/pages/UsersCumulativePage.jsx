import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Pie } from 'react-chartjs-2';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import CumulativeData from '../components/CumulativeData';

const percentage = (num, total) => ((num / total) * 100).toFixed(1);

const transportationData = (data) => {
  const altTransportation = ['Biking', 'Public Transportation', 'Walking'];
  const test = _.pluck(data, 'modeOfTransportation');
  const altData = {
    Telework: 0,
    Carpool: 0,
    Other: 0,
    Vehicle: 0,
  };
  test.map((value) => {
    if (value === 'Telework') {
      altData.Telework += 1;
    } else if (value === 'Carpool') {
      altData.Carpool += 1;
    } else if (altTransportation.includes(value)) {
      altData.Other += 1;
    } else {
      altData.Vehicle += 1;
    }
    return altData;
  });
  return [altData.Telework, altData.Carpool, altData.Other, altData.Vehicle];
};

class UsersCumulativePage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        labels: ['Telework', 'Carpool', 'Other', 'Vehicles'],
      };
    }

    render() {
      const pieData = transportationData(this.props.dailyUserData);
      const totalTransportation = _.reduce(pieData, (memo, num) => memo + num);
      const dataSets = [
        {
          data: pieData,
          backgroundColor: ['#4f7fa0', '#4b8796', '#6872a0', '#846391'],
        },
      ];
      return (
        <div className='background-all'>
          <div style={{ paddingBottom: '80px' }}>
            <Container>
              <Grid.Column>
                <div>
                  <Header as='h1' textAlign='center'> Cumulative Data Of Users</Header>
                  <br/>
                </div>
                <Grid>
                  <Grid.Column width={9}>
                    <Pie data={{ labels: this.state.labels, datasets: dataSets }} height='200px'/>
                  </Grid.Column>
                  <Grid.Column textAlign='right' width={7}>
                    <Header as='h1' color='blue'> MODES OF TRAVEL COUNT </Header>
                    <Header as='h2'>{percentage(pieData[0], totalTransportation)}% OF USERS TELEWORK</Header>
                    <Header as='h2'>{percentage(pieData[1], totalTransportation)}7% OF USERS USE CARPOOL</Header>
                    <Header as='h2'>{percentage(pieData[2], totalTransportation)}4% OF USERS USE OTHER ALTERNATIVE TRANSPORTATION</Header>
                    <Header as='h2'>{percentage(pieData[3], totalTransportation)}4% OF USERS USE VEHICLES</Header>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
              <CumulativeData/>
            </Container>
          </div>
        </div>
      );
  }
}

UsersCumulativePage.propTypes = {
  dailyUserData: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscriptionData = Meteor.subscribe(DailyUserData.cumulativePublicationName);
  return {
    dailyUserData: DailyUserData.collection.find({}).fetch(),
    ready: subscriptionData.ready(),
  };
})(UsersCumulativePage);
