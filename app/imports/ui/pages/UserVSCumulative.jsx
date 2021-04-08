import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import ComparisonGraph from '../components/ComparisonGraph';
import { Users } from '../../api/user/UserCollection';
import { DailyUserData } from '../../api/user/ghg-data/DailyUserDataCollection';

const paddingStyle = { padding: 20 };

const UserVSCumulative = (props) => {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];
    return (
        <Container style={paddingStyle}>
            <Grid stackable>
                <Grid.Column textAlign='center' width={16}>
                    <Header as='h1'>My GHG Statistics vs HEI Community</Header>
                    <Header as='h1'>{months[date.getMonth()]} {date.getFullYear()}</Header>
                    <ComparisonGraph userData={props.dailyData} userDataAll={props.dailyDataAll} users={props.users}/>
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
