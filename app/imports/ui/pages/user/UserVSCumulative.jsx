import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Header, Card, Image, Button, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Users } from '../../../api/user/UserCollection';
import { DailyUserData } from '../../../api/user/DailyUserDataCollection';
import ComparisonGraph from '../../components/ComparisonGraph';
import { getCumulativeGHG } from '../../utilities/CumulativeGHGData';
import { UserVehicles } from '../../../api/user/UserVehicleCollection';

const paddingStyle = { padding: 20 };
const rideStyle = { height: '200px', width: '300px' };

class UserVSCumulative extends React.Component {

  render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting your data...</Loader>;
   }

  renderPage() {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];
    const getThisMonth = _.filter(this.props.dailyData, (userTrip) => (userTrip.inputDate.getMonth() ===
            date.getMonth() && userTrip.inputDate.getFullYear() === date.getFullYear()));
    const thisMonthGHGData = getCumulativeGHG(getThisMonth, this.props.vehicles);
    const thisMonthCO2Produced = thisMonthGHGData.cO2Produced;
    const thisMonthCO2Reduced = thisMonthGHGData.cO2Reduced;
    let result;
    if (thisMonthCO2Produced > 0 && (thisMonthCO2Reduced === 0 || thisMonthCO2Reduced < thisMonthCO2Produced)) {
            result = 'Uh-oh. It looks like you are producing more emissions rather than reducing them.' +
                ' Maybe consider a form of alternative transportation?';
        } else if (thisMonthCO2Reduced > thisMonthCO2Produced) {
            result = `Your CO2 reduction efforts are paying off! You have reduced ${thisMonthCO2Reduced.toFixed(2)
                } lbs of CO2. Keep up the good work!`;
        } else {
            result = 'No pounds of CO2 reduced available for this month. Start adding in your trips!';
        }
    return (
        <Container style={paddingStyle}>
            <Grid stackable>
                <Grid.Column textAlign='center' width={16}>
                    <Header as='h1'>My GHG Statistics vs HEI Community</Header>
                    <Header as='h1'>{months[date.getMonth()]} {date.getFullYear()}</Header>
                    <ComparisonGraph userData={this.props.dailyData} userDataAll={this.props.dailyDataAll}
                                     users={this.props.users}
                                     vehicles={this.props.vehicles} allVehicles={this.props.allVehicles}/>
                </Grid.Column>
            </Grid>
            <Grid stackable>
                <Grid.Column textAlign='center' width={16}>
                    <Header as='h1'>{result}</Header>
                    <Header as='h1'>Think you can do better?
                        Try some of your local alternative transportation options!</Header>
                    <Header as='h1' textAlign='center'>Oahu</Header>
                    <Card.Group style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px',
                        paddingBottom: '20px' }}>
                        <Card>
                            <Card.Content>
                                <Card.Header>Biki</Card.Header>
                                <Card size='medium' color='teal'>
                                    <Image style={rideStyle}
                                     src='https://kitv.images.worldnow.com/images/17721408_G.jpg?auto=webp&disable=
                                    upscale&height=560&fit=bounds&lastEditedDate=1539244048000'/>
                                </Card>
                                <Button href='https://gobiki.org/map-of-biki-stops' target='_blank'>
                                    Learn More
                                </Button>
                            </Card.Content>
                        </Card>
                        <Card>
                          <Card.Content>
                            <Card.Header>The Bus</Card.Header>
                              <Card size='medium' color='teal'>
                                  <Image style={rideStyle}
                                     src='https://hawaii-com-wp.s3.us-west-1.amazonaws.com/wp-content/uploads/2004/12/08100000/thebus.jpg'
                                  />
                              </Card>
                              <Button href='http://hea.thebus.org/' target='_blank'>
                                  Learn More
                              </Button>
                            </Card.Content>
                        </Card>
                        <Card>
                          <Card.Content>
                            <Card.Header>HUI Car Share</Card.Header>
                              <Card size='medium' color='teal'>
                                  <Image style={rideStyle}
                                         src='https://mediad.publicbroadcasting.net/p/khpr/files/styles/x_large/public/201807/IMG_5759-2.jpg'
                                  />
                              </Card>
                              <Button href='https://www.drivehui.com/' target='_blank'>
                                  Learn More
                              </Button>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                    <Header as='h1' textAlign='center'>Neighbor Islands</Header>
                    <Card.Group style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                        <Card>
                            <Card.Content>
                                <Card.Header>Hele-On (Big Island)</Card.Header>
                                <Card size='medium' color='teal'>
                                    <Image style={rideStyle}
                                           src='https://hilo.hawaii.edu/campuslife/images/campuslife/HELEON_383x362.jpg'
                                    />
                                </Card>
                                <Button href='http://www.heleonbus.org/schedules-and-maps/general-information'
                                        target='_blank'>
                                    Learn More
                                </Button>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>Maui Bus (Maui)</Card.Header>
                                <Card size='medium' color='teal'>
                                    <Image style={rideStyle}
                                           src='https://airports.hawaii.gov/ogg/wp-content/uploads/sites/7/2016/07/MauiBus.jpg'
                                    />
                                </Card>
                                <Button href='https://www.mauibus.org/map'
                                        target='_blank'>
                                    Learn More
                                </Button>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>The Kaua&apos;i Bus (Kauai)</Card.Header>
                                <Card size='medium' color='teal'>
                                    <Image style={rideStyle}
                                           src='https://www.thegardenisland.com/wp-content/uploads/2017/06/7bb6da5b281a42d51a9dc1d9ac37709f.jpg'
                                    />
                                </Card>
                                <Button href='https://www.kauai.com/kauai-bus'
                                        target='_blank'>
                                    Learn More
                                </Button>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Container>
        );
    }
}

UserVSCumulative.propTypes = {
    users: PropTypes.array,
    dailyData: PropTypes.array,
    dailyDataAll: PropTypes.array.isRequired,
    vehicles: PropTypes.array.isRequired,
    allVehicles: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription1 = Users.subscribeUserCumulative();
    const subscription2 = Meteor.subscribe(DailyUserData.cumulativePublicationName);
    const subscription3 = Meteor.subscribe(DailyUserData.userPublicationName);
    const subscription4 = UserVehicles.subscribeUserVehicle();
    const subscription5 = UserVehicles.subscribeUserVehicleCumulative();
    const currentUser = Meteor.user() ? Meteor.user().username : '';
    return {
        users: Users.find({}).fetch(),
        dailyData: DailyUserData.collection.find({ owner: currentUser }).fetch(),
        dailyDataAll: DailyUserData.collection.find({}).fetch(),
        vehicles: UserVehicles.find({ owner: currentUser }).fetch(),
        allVehicles: UserVehicles.find({}).fetch({}),
        ready: subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready()
            && subscription5.ready(),
    };
})(UserVSCumulative);
