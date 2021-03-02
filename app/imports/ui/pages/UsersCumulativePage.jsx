import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Pie } from 'react-chartjs-2';
import { _ } from 'meteor/underscore';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import CumulativeCard from '../components/CumulativeCard';

function CalculateCumulative() {
  const altTransportation = ['Alternative Fuel Vehicle', 'Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking'];
  const test = DailyUserData.collection.find({}).fetch();

  const altData = [];
  let i = 0;
  test.map((value) => {
    if (altTransportation.includes(value.modeOfTransportation)) {
      altData[i] = value;
      i++;
    }
    return altData;
  });

  console.log(altData);

  const data = [];
  const miles = _.pluck(altData, 'milesTraveled');
  const totalMiles = _.reduce(miles, function (sum, num) { return sum + num; }, 0);
  data[0] = totalMiles;

  const ghg = _.pluck(altData, 'cO2Reduced');
  const ghgTotal = _.reduce(ghg, function (sum, num) { return sum + num; }, 0);
  data[1] = ghgTotal;
  data[2] = totalMiles / 20;
  return data;
}

const impactData = [
  {
    title: 'Vehicle Miles Travel Reduced',
    img: '/images/cumulative-page/car.png',
    data: '',
  },
  {
    title: 'Green House Gas (GHG) Reduced',
    img: '/images/cumulative-page/C.png',
    data: '',
  },
  {
    title: 'Gallons of Gas Saved',
    img: '/images/cumulative-page/gas.png',
    data: '',
  },

];

class UsersCumulativePage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        labels: ['Telework', 'Other', 'Carpool', 'Electric Vehicle'],
        datasets: [{ data: [84, 4, 4, 7], backgroundColor: ['#4f7fa0', '#4b8796', '#6872a0', '#846391'],
        }],
      };
    }

    render() {
      const data = CalculateCumulative();
      impactData[0].data = data[0];
      impactData[1].data = data[1];
      impactData[2].data = data[2];
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
                    {/* <Image src="/images/cumulative-page/graph.png"/> */}
                    <Pie data={{ labels: this.state.labels, datasets: this.state.datasets }} height='200px'/>
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
              <div style={{ paddingTop: '20px' }}/>
              <Header as='h1' textAlign='center'>
                ENVIRONMENTAL IMPACT
                <br/>
              </Header>
              <Grid stackable columns={3}>
                {impactData.map((user, index) => (
                    <Grid.Column key={index}>
                      <CumulativeCard user={user}/>
                    </Grid.Column>
                ))}
              </Grid>
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
