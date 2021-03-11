import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Image, Container, Table, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import HistoryRowData from '../components/HistoryRowData';
import AddDailyData from '../components/AddDailyData';
import MyDataChart from "../components/MyDataChart";

const paddingStyle = { padding: 20 };
/** Renders the Page for displaying the user's data: Their numbers for the day, overview of their carbon footprint, and
 * users may also edit their data of their entries.
 * */
class UserPage extends React.Component {
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting your data...</Loader>;
    }

    renderPage() {
      const email = Meteor.user().username;
      const userData = [];
      DailyUserData.collection.find({ owner: email }).forEach(
          function (data) {
            userData.push(data);
          },
      );

      const today = new Date().toDateString();
      const getUserMilesToday = _.pluck(DailyUserData.collection.find({ owner: email }).fetch(), 'milesTraveled');
      const totalUserMilesToday = _.reduce(getUserMilesToday, (total, num) => total + num, 0);
      const getUserCO2Today = _.pluck(DailyUserData.collection.find({ owner: email }).fetch(), 'cO2Reduced');
      const totalUserCO2Today = _.reduce(getUserCO2Today, (total, num) => total + num, 0).toFixed(2);
      const daysTelework = _.size(_.pluck(DailyUserData.collection.find({ owner: email,
          modeOfTransportation: 'Telework' }).fetch(), 'inputDate'));
      const daysBiking = _.pluck(DailyUserData.collection.find({ owner: email,
            modeOfTransportation: 'Biking' }).fetch(), 'milesTraveled');
      const bikeAverage = (bikeDays) => {
          if (bikeDays.length === 0) {
              return 0;
          }
         return (_.reduce(bikeDays, (total, num) => total + num, 0) / _.size(bikeDays)).toFixed(2);
      };


        return (
            <div className='background-all'>
            <Container style={paddingStyle}>
                <Grid stackable fluid columns={2}>
                    <Grid.Column>
                        <MyDataChart/>
                    </Grid.Column>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/home.png"
                                size='small' alt="home"/>
                        <Header as='h1' textAlign='center'>Days Worked at Home:</Header>
                        <Header as='h2' textAlign='center'>{daysTelework} day(s)</Header>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/Biking.png"
                               size='small' alt="biking"/>
                        <Header as='h1' textAlign='center'>Average Miles Biked:</Header>
                        <Header as='h2' textAlign='center'>{bikeAverage(daysBiking)} miles</Header>
                    </Grid.Column>
                </Grid>
              <div style={{ paddingTop: '150px' }}/>
              <div>
                <Grid stackable columns={3}>
                    <Grid.Column width={16}>
                        <Header as='h1' textAlign='center'>
                            My Numbers as of {today}</Header>
                    </Grid.Column>
                </Grid>
                <Grid stackable columns={3}>
                    <Grid.Column>
                        <Image className='images' src="/images/gas.png"
                               floated='left' size='medium' alt="filler placement for eventual graph"/>
                        <Header as='h1' textAlign='center'>Fuel Saved</Header>
                        <Header as='h2' textAlign='center'>0.9 gal</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image className='images' src="/images/speedometer.png"
                               size='medium' alt="filler placement for eventual graph"/>
                        <Header as='h1' textAlign='center'>Total Miles</Header>
                        <Header as='h2' textAlign='center'>{totalUserMilesToday}</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image className='images' src="/images/co2.png"
                               floated='right' size='medium' alt="filler placement for eventual graph"/>
                        <Header as='h1' textAlign='center'>CO2 Reduced</Header>
                        <Header as='h2' textAlign='center'>{totalUserCO2Today} lbs</Header>
                    </Grid.Column>
                </Grid>
                <Grid stackable columns={3}>
                    <Grid.Column width={16}>
                        <Header as='h1' textAlign='center'>Your CO2 Emission was up 2.6% from yesterday.</Header>
                        <Header as='h2' textAlign='center'>My Transportation History</Header>
                        <Header as='h1' textAlign='center'><AddDailyData/></Header>
                    </Grid.Column>
                </Grid>
                <Table stackable striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Mode of Transportation</Table.HeaderCell>
                            <Table.HeaderCell>Total Miles</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {userData.map((value, index) => <HistoryRowData key={index} transportationData={value}/>)}
                    </Table.Body>
                </Table>
              </div>
            </Container>
            </div>
        );
    }
}

UserPage.propTypes = {
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription = Meteor.subscribe(DailyUserData.userPublicationName);
    return {
        ready: subscription.ready(),
    };
})(UserPage);
