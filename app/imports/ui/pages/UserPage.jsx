import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Image, Container, Table, Loader, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Users } from '../../api/user/UserCollection';
import HistoryRowData from '../components/HistoryRowData';
import AddDailyData from '../components/AddDailyData';
import ProfileCard from '../components/ProfileCard';
import MyDataChart from '../components/MyDataChart';

const paddingStyle = { padding: 20 };
/** Renders the Page for displaying the user's data: Their numbers for the day, overview of their carbon footprint, and
 * users may also edit their data of their entries.
 * */
class UserPage extends React.Component {
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting your data...</Loader>;
    }

    renderPage() {
      const uEmail = Meteor.user().username;
      const userData = [];
      DailyUserData.collection.find({ owner: uEmail }).forEach(
          function (data) {
            userData.push(data);
          },
      );

      const today = new Date().toDateString();
      const getUserMilesToday = _.pluck(DailyUserData.collection.find({ owner: uEmail }).fetch(), 'milesTraveled');
      const totalUserMilesToday = _.reduce(getUserMilesToday, (total, num) => total + num, 0);
      const getUserCO2Today = _.pluck(DailyUserData.collection.find({ owner: uEmail }).fetch(), 'cO2Reduced');
      const totalUserCO2Today = _.reduce(getUserCO2Today, (total, num) => total + num, 0).toFixed(2);
      const daysTelework = _.size(_.pluck(DailyUserData.collection.find({ owner: uEmail,
          modeOfTransportation: 'Telework' }).fetch(), 'inputDate'));
      const daysBiking = _.pluck(DailyUserData.collection.find({ owner: uEmail,
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
                <Header as='h1' textAlign='center'>Welcome Back! Your CO2 Emission was up 2.6% from yesterday.</Header>
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <ProfileCard profile={this.props.users}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid>
                            <Card.Content>
                                <Header as='h1' textAlign='center' style={{ margin: '10px' }}>My Mileage Summary</Header>
                                <MyDataChart/>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
              <div style={{ paddingTop: '50px' }}/>
              <Grid stackable columns={3}>
                  <Grid.Column width={16}>
                      <Header as='h1' textAlign='center'>
                          My Numbers as of {today}</Header>
                  </Grid.Column>
              </Grid>
                <div style={{ paddingBottom: '50px' }}/>
                <div>
                  <Grid stackable columns={5}>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/gas.png"
                                 size='small' alt="filler placement for eventual graph"/>
                          <Header as='h1' textAlign='center'>Total Fuel Saved</Header>
                          <Header as='h2' textAlign='center'>0.9 gal</Header>
                      </Grid.Column>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/speedometer.png"
                                 size='small' alt="filler placement for eventual graph"/>
                          <Header as='h1' textAlign='center'>Total Miles Traveled</Header>
                          <Header as='h2' textAlign='center'>{totalUserMilesToday} miles</Header>
                      </Grid.Column>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/co2.png"
                                 size='small' alt="CO2"/>
                          <Header as='h1' textAlign='center'>Total CO2 Reduced</Header>
                          <Header as='h2' textAlign='center'>{totalUserCO2Today} lbs</Header>
                      </Grid.Column>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/home.png"
                                 size='small' alt="home"/>
                          <Header as='h1' textAlign='center'>Days Worked at Home</Header>
                          <Header as='h2' textAlign='center'>{daysTelework} day(s)</Header>
                      </Grid.Column>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/altvehicle-page/Biking.png"
                                 size='small' alt="biking"/>
                          <Header as='h1' textAlign='center'>Average Miles Biked</Header>
                          <Header as='h2' textAlign='center'>{bikeAverage(daysBiking)} mile(s)</Header>
                      </Grid.Column>
                  </Grid>
                <Grid stackable columns={3}>
                    <Grid.Column width={16}>
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
                            <Table.HeaderCell>CO2 Reduced</Table.HeaderCell>
                            <Table.HeaderCell/>
                            <Table.HeaderCell/>
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
    users: PropTypes.array,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
    const userId = match.params._id;
    const getUser = Meteor.users.findOne(userId);
    const subscription1 = Meteor.subscribe(DailyUserData.userPublicationName);
    const subscription2 = Meteor.subscribe(Users.userPublicationName);
    return {
        users: Users.collection.find({ username: getUser }).fetch()[0],
        ready: subscription1.ready() && subscription2.ready(),
    };
})(UserPage);
