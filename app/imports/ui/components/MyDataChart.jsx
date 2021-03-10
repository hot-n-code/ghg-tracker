import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { Pie } from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';

// Displaying a pie chart of the mode of transportation from DailyUserData collection
const MyDataChart = () => {
    const email = Meteor.user().username;
    const totalTelework = _.reduce(_.pluck(DailyUserData.collection.find({ owner: email,
        modeOfTransportation: 'Telework' }).fetch(), 'milesTraveled'), (total, num) => total + num, 0);
    const totalAV = _.reduce(_.pluck(DailyUserData.collection.find({ owner: email,
        modeOfTransportation: 'Alternative Fuel Vehicle' }).fetch(), 'milesTraveled'), (total, num) => total + num, 0);
    const totalBiking = _.reduce(_.pluck(DailyUserData.collection.find({ owner: email,
        modeOfTransportation: 'Biking' }).fetch(), 'milesTraveled'), (total, num) => total + num, 0);
    const totalWalking = _.reduce(_.pluck(DailyUserData.collection.find({ owner: email,
        modeOfTransportation: 'Walking' }).fetch(), 'milesTraveled'), (total, num) => total + num, 0);
    const totalCarpool = _.reduce(_.pluck(DailyUserData.collection.find({ owner: email,
        modeOfTransportation: 'Carpool' }).fetch(), 'milesTraveled'),(total, num) => total + num, 0);
    const totalPT = _.reduce(_.pluck(DailyUserData.collection.find({ owner: email,
        modeOfTransportation: 'Public Transportation' }).fetch(), 'milesTraveled'), (total, num) => total + num, 0);
    const stateAll = {
        labels: ['Telework', 'Public Transportation', 'Biking', 'Walk', 'Carpool', 'Alternative Fuel Vehicle'],
        datasets: [{ data: [totalTelework, totalPT, totalBiking, totalWalking, totalCarpool, totalAV],
            backgroundColor: ['#5c8d89', '#4b8796', '#4f7fa0', '#6872a0', '#846391', '#985575'],
        }],
    };

    return (
        <Grid>
            <Grid.Column>
                <Header as='h1'>My Mileage Breakdown</Header>
                <Pie data={stateAll} height='250px'/>
            </Grid.Column>
        </Grid>
    );
};

export default withRouter(MyDataChart);
