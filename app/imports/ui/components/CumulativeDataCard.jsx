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
      const sumData = (arr, key) => _.reduce(_.pluck(arr, key), function (sum, num) { return sum + num; }, 0).toFixed(1);

      const CalculateCumulative = (dailyUser, impactArr) => {
        const altTransportation = ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking'];
        const userData = dailyUser;
        const eImpact = impactArr;
        const altData = [];
        let i = 0;
        userData.map((collectionData) => {
          if (altTransportation.includes(collectionData.modeOfTransportation)) {
            altData[i] = collectionData;
            i++;
          }
          return altData;
      });
        eImpact[0].data = sumData(altData, 'milesTraveled');
        eImpact[1].data = sumData(altData, 'cO2Reduced');
        eImpact[2].data = (eImpact[0].data / 20).toFixed(1);
        return eImpact;
    };

    const eImpactData = [
      {
        title: 'Vehicle Miles Travel Reduced',
        img: '/images/cumulative-page/car.png',
        data: '0',
      },
      {
        title: 'Green House Gas (GHG) Reduced',
        img: '/images/cumulative-page/C.png',
        data: '0',
      },
      {
        title: 'Gallons of Gas Saved',
        img: '/images/cumulative-page/gas.png',
        data: '0',
      },

    ];

    const data = CalculateCumulative(this.props.dailyUserData, eImpactData);

    return (
        <div style={{ paddingTop: '20px' }}>
          <Header as='h1' textAlign='center'>
            ENVIRONMENTAL IMPACT
            <br/>
          </Header>
          <Grid stackable columns={3}>
            {data.map((user, index) => (
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
  const subscriptionDailyUser = Meteor.subscribe(DailyUserData.cumulativePublicationName);
  return {
    dailyUserData: DailyUserData.collection.find({}).fetch(),
    ready: subscriptionDailyUser.ready(),
  };
})(CumulativeDataCard);
