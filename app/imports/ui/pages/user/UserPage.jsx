import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Container, Loader, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../../api/user/UserCollection';
import ProfileCard from '../../components/user-page/ProfileCard';
import MyDataChart from '../../components/user-page/MyDataChart';
import { getCumulativeGHG } from '../../utilities/CumulativeGHGData';
import { getDateToday } from '../../utilities/DailyGHGData';
import { UserVehicle } from '../../../api/user/UserVehicleCollection';
import ComparisonGraph from '../../components/ComparisonGraph';
import MyNumbers from "../../components/MyNumbers";
import UserVCumulative from '../../components/UserVCumulative';

const paddingStyle = { padding: 20 };
/** Renders the Page for displaying the user's data: Their numbers for the day, overview of their carbon footprint, and
 * users may also edit their data of their entries.
 * */
class UserPage extends React.Component {
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting your data...</Loader>;
    }

    renderPage() {
      const today = getDateToday().toDateString();
      const hoursTelework = _.size(_.where(this.props.dailyData, { modeOfTransportation: 'Telework' }));
      const ghgData = getCumulativeGHG(this.props.dailyData, this.props.vehicles);
      const totalCO2Reduced = ghgData.cO2Reduced;
      const totalMiles = ghgData.VMTReduced;
      const totalFuelSaved = ghgData.fuelSaved;
      const totalGHGProduced = ghgData.cO2Produced;

        return (
            <div className='background-all'>
            <Container style={paddingStyle}>
                <UserVCumulative/>
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <ProfileCard profile={this.props.users}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid>
                            <Card.Content>
                                <Header as='h1' textAlign='center' style={{ margin: '10px' }}>This Month's
                                    Mileage Summary</Header>
                                <MyDataChart/>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
              <div style={{ paddingTop: '30px' }}/>
              <div className='background-total-user-data'>
              <Grid stackable columns={3}>
                  <Grid.Column width={16}>
                      <Header as='h1' textAlign='center'>
                          My numbers as of
                        <br/>
                        {today}</Header>
                    <hr/>
                  </Grid.Column>
              </Grid>
                <div style={{ paddingBottom: '50px' }}/>
                <div>
                  <Grid stackable columns={5} divided>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/colored-clipart/3.png"
                                 size='small' alt="filler placement for eventual graph"/>
                          <Header as='h1' textAlign='center'>Total Fuel Saved</Header>
                          <Header as='h2' textAlign='center'>{totalFuelSaved.toFixed(2)} gallons</Header>
                      </Grid.Column>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/colored-clipart/1.png"
                                 size='small' alt="filler placement for eventual graph"/>
                          <Header as='h1' textAlign='center'>Alternative Miles</Header>
                          <Header as='h2' textAlign='center'>{totalMiles.toFixed(2)} miles</Header>
                      </Grid.Column>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/colored-clipart/2.png"
                                 size='small' alt="CO2"/>
                          <Header as='h1' textAlign='center'>Total CO2 Reduced</Header>
                          <Header as='h2' textAlign='center'>{totalCO2Reduced.toFixed(2)} lbs</Header>
                      </Grid.Column>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/colored-clipart/4.png"
                                 size='small' alt="home"/>
                          <Header as='h1' textAlign='center'>Days Worked at Home</Header>
                          <Header as='h2' textAlign='center'>{hoursTelework} day(s)</Header>
                      </Grid.Column>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/colored-clipart/5.png"
                                 size='small' alt="biking"/>
                          <Header as='h1' textAlign='center'>Total CO2 Produced</Header>
                          <Header as='h2' textAlign='center'>{totalGHGProduced.toFixed(2)} lb(s)</Header>
                      </Grid.Column>
                  </Grid>
                </div>
              </div>
              <MyNumbers/>
            </Container>
            </div>
        );
    }
}

UserPage.propTypes = {
    users: PropTypes.object,
    vehicles: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
    const userId = match.params._id;
    const getUser = Meteor.users.findOne(userId);
    const ready = Meteor.subscribe(DailyUserData.userPublicationName).ready() &&
        Meteor.subscribe(Users.userPublicationName).ready() &&
        Meteor.subscribe(UserVehicle.userPublicationName).ready();
    const dailyData = DailyUserData.collection.find({}).fetch();
    const users = Users.collection.findOne({ username: getUser });
    const vehicles = UserVehicle.collection.find({}).fetch();
    return {
        dailyData,
        users,
        vehicles,
        ready,
    };
})(UserPage);
