import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import ComparisonGraph from '../components/ComparisonGraph';
import ComparisonGraphAll from '../components/ComparisonGraphAll';
import { Users } from '../../api/user/UserCollection';
import { DailyUserData } from '../../api/user/ghg-data/DailyUserDataCollection';

const UserVSCumulative = (props) => {
    return (
        <Container>
            <Grid stackable>
                <Grid.Column width={8}>
                    <ComparisonGraph userData={props.dailyData}/>
                </Grid.Column>
                <Grid.Column width={8}>
                    <ComparisonGraphAll users={props.users} userData={props.dailyDataAll}/>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

UserVSCumulative.propTypes = {
    users: PropTypes.array,
    dailyData: PropTypes.array,
    dailyDataAll: PropTypes.array.isRequired,
    currentUser: PropTypes.string,
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
