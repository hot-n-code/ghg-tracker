import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid } from 'semantic-ui-react';
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
        modeOfTransportation: 'Carpool' }).fetch(), 'milesTraveled'), (total, num) => total + num, 0);
    const totalPT = _.reduce(_.pluck(DailyUserData.collection.find({ owner: email,
        modeOfTransportation: 'Public Transportation' }).fetch(), 'milesTraveled'), (total, num) => total + num, 0);
    const totalCar = _.where(DailyUserData.collection.find({}).fetch(), { owner: email });
    let gasTotal = 0;
    totalCar.forEach((obj) => {
           if (obj.cO2Reduced < 0) {
               gasTotal += obj.milesTraveled;
           }
        });
    // console.log(gasTotal);
    const stateAll = {
        labels: ['Telework', 'Public Transportation', 'Biking', 'Walk', 'Carpool', 'EV/Hybrid', 'Gas'],
        datasets: [{ data: [totalTelework, totalPT, totalBiking, totalWalking, totalCarpool, totalAV, gasTotal],
            backgroundColor: ['#5c8d89', '#4b8796', '#4f7fa0', '#6872a0', '#846391', '#985575', '#FF69B4'],
        }],
    };

    return (
        <Grid>
            <Grid.Column>
                <Pie data={stateAll} height={250}/>
            </Grid.Column>
        </Grid>
    );
};

export default withRouter(MyDataChart);
