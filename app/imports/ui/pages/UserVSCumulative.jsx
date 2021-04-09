import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Users } from '../../api/user/UserCollection';
import { DailyUserData } from '../../api/user/ghg-data/DailyUserDataCollection';
import WhatIf from '../components/user-data-page/WhatIf';
import ComparisonGraph from '../components/ComparisonGraph';
import { getCumulativeGHG } from '../utilities/CumulativeGHGData';
import { UserVehicle } from '../../api/user/UserVehicleCollection';


const paddingStyle = { padding: 20 };

const UserVSCumulative = (props) => {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];
    const getThisMonth = _.filter(props.dailyData, (userTrip) => {
        return (userTrip.inputDate.getMonth() ===
            date.getMonth() && userTrip.inputDate.getFullYear() === date.getFullYear());
    });
    const thisMonthGHGData = getCumulativeGHG(getThisMonth, props.vehicles);
    const thisMonthCO2Produced = thisMonthGHGData.cO2Produced;

    const getLastMonth = _.filter(props.dailyData, (userTrip) => {
        if (date.getMonth() - 1 !== -1) {
            return (userTrip.inputDate.getMonth() - 1 ===
                date.getMonth() - 1 && userTrip.inputDate.getFullYear() === date.getFullYear());
        } else {
            return (userTrip.inputDate.getMonth() - 1 ===
                date.getMonth() - 1 && userTrip.inputDate.getFullYear() - 1 === date.getFullYear() - 1);
        }
    });

    const lastMonthsGHGData = getCumulativeGHG(getLastMonth, props.allVehicles);
    const lastMonthCO2Produced = lastMonthsGHGData.cO2Produced;

    const increase = thisMonthCO2Produced - lastMonthCO2Produced !== 0 ? thisMonthCO2Produced - lastMonthCO2Produced : '';
    let result;
    if (increase > 0 && lastMonthCO2Produced !== 0) {
        result = 'Your CO2 Production is up ' + ((increase / lastMonthCO2Produced) * 100).toFixed(2)
            + '% from last month!';
    } else if (increase < 0 && lastMonthCO2Produced !== 0) {
        result = 'Your CO2 Production is down ' +
            (((lastMonthCO2Produced - thisMonthCO2Produced) / lastMonthCO2Produced) * 100).toFixed(2) +
            '% from last month. Keep up the good work!';
    } else if (lastMonthCO2Produced === 0 && increase > 0) {
        result = increase;
    } else {
        result = 'No CO2 Production data available for this user.';
    }
    return (
        <Container style={paddingStyle}>
            <Grid stackable>
                <Grid.Column textAlign='center' width={16}>
                    <Header as='h1'>My GHG Statistics vs HEI Community</Header>
                    <Header as='h1'>{months[date.getMonth()]} {date.getFullYear()}</Header>
                    <ComparisonGraph userData={props.dailyData} userDataAll={props.dailyDataAll} users={props.users}
                                     vehicles={props.vehicles} allVehicles={props.allVehicles}/>
                </Grid.Column>
            </Grid>
            <Grid stackable>
                <Grid.Column textAlign='center' width={16}>
                    <Header as='h1'>{result}</Header>
                    <Header as='h1'>Think you can do better? Start reducing your GHG Emissions today!</Header>
                    <WhatIf/>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

UserVSCumulative.propTypes = {
    users: PropTypes.array,
    dailyData: PropTypes.array,
    dailyDataAll: PropTypes.array.isRequired,
    vehicles: PropTypes.array.isRequired,
    allVehicles: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription1 = Meteor.subscribe(Users.adminPublicationName);
    const subscription2 = Meteor.subscribe(DailyUserData.cumulativePublicationName);
    const subscription3 = Meteor.subscribe(DailyUserData.userPublicationName);
    const subscription4 = Meteor.subscribe(UserVehicle.userPublicationName);
    const subscription5 = Meteor.subscribe(UserVehicle.adminPublicationName);
    const currentUser = Meteor.user() ? Meteor.user().username : '';
    return {
        users: Users.collection.find({}).fetch(),
        dailyData: DailyUserData.collection.find({ owner: currentUser }).fetch(),
        dailyDataAll: DailyUserData.collection.find({}).fetch(),
        vehicles: UserVehicle.collection.find({ owner: currentUser }).fetch(),
        allVehicles: UserVehicle.collection.find({}).fetch({}),
        ready: subscription1.ready() && subscription2.ready() && subscription3.ready() && subscription4.ready()
            && subscription5.ready(),
    };
})(UserVSCumulative);
