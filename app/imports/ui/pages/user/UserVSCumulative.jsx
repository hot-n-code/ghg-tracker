import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Header, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Users } from '../../../api/user/UserCollection';
import { UserDailyData } from '../../../api/user/UserDailyDataCollection';
import ComparisonGraph from '../../components/ComparisonGraph';
import TransportationOptions from '../../components/user-page/TransportationOptions';
import { getCumulativeGHG } from '../../utilities/CumulativeGHGData';
import { UserVehicles } from '../../../api/user/UserVehicleCollection';

const paddingStyle = { padding: 20 };

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
        <div className='background-all'>
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
                   <TransportationOptions/>
                </Grid.Column>
            </Grid>
        </Container>
        </div>
        );
    }
}

UserVSCumulative.propTypes = {
    users: PropTypes.array.isRequired,
    dailyData: PropTypes.array.isRequired,
    dailyDataAll: PropTypes.array.isRequired,
    vehicles: PropTypes.array.isRequired,
    allVehicles: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription1 = Users.subscribeUserCumulative();
    const subscription2 = UserDailyData.subscribeUserDailyDataCumulative();
    const subscription3 = UserVehicles.subscribeUserVehicleCumulative();
    const currentUser = Meteor.user() ? Meteor.user().username : '';
    const users = Users.find({}, {}).fetch();
    const dailyData = UserDailyData.find({ owner: currentUser }, {}).fetch();
    const dailyDataAll = UserDailyData.find({}, {}).fetch();
    const vehicles = UserVehicles.find({ owner: currentUser }, {}).fetch();
    const allVehicles = UserVehicles.find({}, {}).fetch({});
    const ready = subscription1.ready() && subscription2.ready() && subscription3.ready();
    return {
        users,
        dailyData,
        dailyDataAll,
        vehicles,
        allVehicles,
        ready,
    };
})(UserVSCumulative);
