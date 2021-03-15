import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import CumulativeCard from '../components/CumulativeCard';
import { CalculateCumulative } from '../utilities/GlobalFunctions';

class CumulativeDataCard extends React.Component {
  render() {

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
      {
        title: 'Green House Gas (GHG) Produced',
        img: '/images/cumulative-page/C.png',
        data: '0',
      },

    ];
    const data = CalculateCumulative(this.props.dailyUserData);
    eImpactData[0].data = data.milesTraveled;
    eImpactData[1].data = data.cO2Reduced;
    eImpactData[2].data = data.GasSaved;
    eImpactData[3].data = data.cO2Produced;

    return (
        <div style={{ paddingTop: '20px' }}>
          <Header as='h1' textAlign='center'>
            ENVIRONMENTAL IMPACT
            <br/>
          </Header>
          <Grid stackable columns={4}>
            {eImpactData.map((user, index) => (
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
