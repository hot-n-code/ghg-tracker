import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Button, Image, Container, Table, Loader, Card } from 'semantic-ui-react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Users } from '../../api/user/UserCollection';
import HistoryRowData from '../components/HistoryRowData';
import AddDailyData from '../components/AddDailyData';
import ProfileCard from '../components/ProfileCard';

const paddingStyle = { padding: 20 };
/** Renders the Page for displaying the user's data: Their numbers for the day, overview of their carbon footprint, and
 * users may also edit their data of their entries.
 * */
class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: ['Telework', 'Public Transportation', 'Biking', 'Walk', 'Carpool', 'Electric Vehicle'],
            datasets: [{ data: [50, 40, 2, 2, 1, 5], backgroundColor: ['#5c8d89', '#4b8796', '#4f7fa0', '#6872a0', '#846391', '#985575'],
            }],
        };
    }

    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    renderPage() {
      const uEmail = Meteor.user().username;
      const profTest = Users.collection.find({ email: uEmail }).fetch()[0];
      const userData = [];
      DailyUserData.collection.find({ owner: uEmail }).forEach(
          function (data) {
            userData.push(data);
          },
      );
        return (
            <div className='background-all'>
            <Container style={paddingStyle}>
                <Header as='h1' textAlign='center'>Welcome Back! Your CO2 Emission was up 2.6% from yesterday.</Header>
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <ProfileCard profile={profTest}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid>
                            <Card.Content>
                                <Header as='h1' textAlign='center'>My Summary</Header>
                                <div id='graph-buttons'>
                                    <Button size='large'>This Week</Button>
                                    <Button size='large'>This Month</Button>
                                    <Button size='large'>All Time</Button>
                                </div>
                                <Pie data={{ labels: this.state.labels, datasets: this.state.datasets }} height='200px'/>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
              <div style={{ paddingTop: '50px' }}/>
              <Grid stackable columns={3}>
                  <Grid.Column width={16}>
                      <Header as='h1' textAlign='center'>
                          My Numbers for February 8, 2021</Header>
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
                          <Header as='h2' textAlign='center'>7.4 miles</Header>
                      </Grid.Column>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/co2.png"
                                 size='small' alt="CO2"/>
                          <Header as='h1' textAlign='center'>Total CO2 Reduced</Header>
                          <Header as='h2' textAlign='center'>15.2 lbs</Header>
                      </Grid.Column>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/home.png"
                                 size='small' alt="home"/>
                          <Header as='h1' textAlign='center'>Days Worked at Home</Header>
                          <Header as='h2' textAlign='center'>206 days</Header>
                      </Grid.Column>
                      <Grid.Column>
                          <Image style={{ display: 'block',
                              margin: '0 auto' }} src="/images/altvehicle-page/Biking.png"
                                 size='small' alt="biking"/>
                          <Header as='h1' textAlign='center'>Days Biked to Work</Header>
                          <Header as='h2' textAlign='center'>10 days</Header>
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
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {userData.map((value, index) => <HistoryRowData key={index} data={value}/>)}
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
    const subscription1 = Meteor.subscribe(DailyUserData.userPublicationName);
    const subscription2 = Meteor.subscribe(Users.userPublicationName);
    return {
        ready: subscription1.ready() && subscription2.ready(),
    };
})(UserPage);
