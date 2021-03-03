import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import CumulativeCard from '../components/CumulativeCard';

class CumulativeDataCard extends React.Component {
  render() {
      const CalculateCumulative = (dailyUser) => {
        const altTransportation = ['Alternative Fuel Vehicle', 'Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking'];
        const userData = dailyUser;
        const altData = [];
        let i = 0;
        userData.map((value) => {
          if (altTransportation.includes(value.modeOfTransportation)) {
            altData[i] = value;
            i++;
          }
          return altData;
      });
        const data = [];
        const miles = _.pluck(altData, 'milesTraveled');
        data[0] = (_.reduce(miles, function (sum, num) { return sum + num; }, 0)).toFixed(1);

        const ghg = _.pluck(altData, 'cO2Reduced');
        data[1] = (_.reduce(ghg, function (sum, num) { return sum + num; }, 0)).toFixed(1);
        data[2] = (data[0] / 20).toFixed(1);
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

    const data = CalculateCumulative(this.props.dailyUserData);
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
CumulativeDataCard.propTypes = {
  dailyUserData: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscriptionData = Meteor.subscribe(DailyUserData.cumulativePublicationName);
  return {
    dailyUserData: DailyUserData.collection.find({}).fetch(),
    ready: subscriptionData.ready(),
  };
})(CumulativeDataCard);
