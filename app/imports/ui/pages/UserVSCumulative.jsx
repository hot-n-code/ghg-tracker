import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/UserCollection';
import { DailyUserData } from '../../api/user/ghg-data/DailyUserDataCollection';
import WhatIf from '../components/user-data-page/WhatIf';
import ComparisonGraph from '../components/ComparisonGraph';
import {getCumulativeGHG} from "../utilities/CumulativeGHGData";


const paddingStyle = { padding: 20 };

const UserVSCumulative = (props) => {
    // NEXT: GRAB LAST MONTH'S DATA
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];
    const getThisMonth = _.filter(props.userData, (userTrip) => {
        return (userTrip.inputDate.getMonth() ===
            date.getMonth() && userTrip.inputDate.getFullYear() === date.getFullYear());
    });
    const thisMonthGHGData = getCumulativeGHG(getThisMonth);
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

    const lastMonthsGHGData = getCumulativeGHG(getLastMonth);
    const lastMonthCO2Produced = lastMonthsGHGData.cO2Produced;

    const increase = thisMonthCO2Produced - lastMonthCO2Produced;
    let result;
    if (increase > 0 && lastMonthCO2Produced !== 0) {
        result = 'Your CO2 Production is up ' + ((increase / lastMonthCO2Produced) * 100).toFixed(2)
            + '% from last month!';
    } else if (increase < 0 && lastMonthCO2Produced !== 0) {
        result = 'Your CO2 Production is down ' +
            (((lastMonthCO2Produced - thisMonthCO2Produced) / lastMonthCO2Produced) * 100).toFixed(2) +
            '% from last month. Keep up the good work!';
    } else {
        result = 'No CO2 Production data available.';
    }
    return (
        <Container style={paddingStyle}>
            <Grid stackable>
                <Grid.Column textAlign='center' width={16}>
                    <Header as='h1'>My GHG Statistics vs HEI Community</Header>
                    <Header as='h1'>{months[date.getMonth()]} {date.getFullYear()}</Header>
                    <ComparisonGraph userData={props.dailyData} userDataAll={props.dailyDataAll} users={props.users}/>
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
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription1 = Meteor.subscribe(Users.adminPublicationName);
    const subscription2 = Meteor.subscribe(DailyUserData.cumulativePublicationName);
    const subscription3 = Meteor.subscribe(DailyUserData.userPublicationName);
    const currentUser = Meteor.user() ? Meteor.user().username : '';
    return {
        users: Users.collection.find({}).fetch(),
        dailyData: DailyUserData.collection.find({ owner: currentUser }).fetch(),
        dailyDataAll: DailyUserData.collection.find({}).fetch(),
        ready: subscription1.ready() && subscription2.ready() && subscription3.ready(),
    };
})(UserVSCumulative);
