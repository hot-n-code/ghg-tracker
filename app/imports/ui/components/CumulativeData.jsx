import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import CumulativeCard from '../components/CumulativeCard';

class CumulativeData extends React.Component {
  render() {

     const CalculateCumulative = () => {
        const altTransportation = ['Alternative Fuel Vehicle', 'Biking', 'Carpool', 'Public     Transportation', 'Telework', 'Walking'];
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
        const data = [];
        const miles = _.pluck(altData, 'milesTraveled');
        data[0] = _.reduce(miles, function (sum, num) { return sum + num; }, 0);

        const ghg = _.pluck(altData, 'cO2Reduced');
        data[1] = _.reduce(ghg, function (sum, num) { return sum + num; }, 0);
        data[2] = data[0] / 20;
        return data;
    };

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

    const data = CalculateCumulative();
    impactData[0].data = data[0];
    impactData[1].data = data[1];
    impactData[2].data = data[2];

    return (
        <div style={{ paddingTop: '20px' }}>
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
})(CumulativeData);
