import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Pie } from 'react-chartjs-2';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import CumulativeData from '../components/CumulativeData';

const transportationData = () => {
  const altTransportation = ['Biking', 'Public Transportation', 'Walking'];
  const test = _.pluck(DailyUserData.collection.find({}).fetch(), 'modeOfTransportation');
  const altData = [0, 0, 0, 0];
  // eslint-disable-next-line array-callback-return
  test.map((value) => {
    if (value === 'Telework') {
      altData[0] += 1;
    } else if (value === 'Carpool') {
      altData[1] += 1;
    } else if (altTransportation.includes(value)) {
      altData[2] += 1;
    } else {
      altData[3] += 1;
    }
  });
  return altData;
};

class UsersCumulativePage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        labels: ['Telework', 'Carpool', 'Other', 'Vehicles'],
      };
    }

    render() {
      const pieData = transportationData();
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
                    <Header as='h2'>84% OF USERS TELEWORK</Header>
                    <Header as='h2'>7% OF USERS USE ELECTRIC VEHICLES</Header>
                    <Header as='h2'>4% OF USERS CARPOOL</Header>
                    <Header as='h2'>4% OF USERS USE PUBLIC TRANSPORTATION</Header>
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

export default withTracker(() => {
  // KEEP FOR REFERENCE: Get access to Stuff documents.
  const sub1 = Meteor.subscribe(DailyUserData.adminPublicationName);
  return {
    // KEEP FOR REFERENCE: stuffs: Stuffs.collection.find({}).fetch(),
    ready: sub1.ready(),
  };
})(UsersCumulativePage);
