import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import { DailyUserData } from '../../api/user/ghg-data/DailyUserDataCollection';
import PropTypes from 'prop-types';
import { getCumulativeGHG } from '../utilities/CumulativeGHGData';

// Displaying a pie chart of the mode of transportation from DailyUserData collection
const ComparisonGraph = (props) => {
    // NEXT: ADD CUMULATIVE, ADD POPUP THAT WARNS/CONGRATULATES USER BASED ON COMPARISON
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];
    const date = new Date();
    const getByMonthIndividual = _.filter(props.userData, (userTrip) => { return (userTrip.inputDate.getMonth() ===
        date.getMonth() && userTrip.inputDate.getFullYear() === date.getFullYear()) });
    const userGHGData = getCumulativeGHG(getByMonthIndividual);
    const totalCO2Reduced = userGHGData.cO2Reduced;
    const totalCO2Produced = userGHGData.cO2Produced;
    const getByMonthAll = _.filter(props.userData, (userTrip) => { return (userTrip.inputDate.getMonth() ===
        date.getMonth() && userTrip.inputDate.getFullYear() === date.getFullYear()) });
    const allGHGData = getCumulativeGHG(getByMonthAll);
    const allCO2Reduced = allGHGData.cO2Reduced;
    const allCO2Produced = allGHGData.cO2Produced;
    const stateAll = {
        labels: ['Carbon Reduced', 'Carbon Produced'],
        datasets: [
            {
                label: 'Me',
                backgroundColor: '#5c8d89',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [totalCO2Reduced, totalCO2Produced],
            },
            {
                label: 'Cumulative Data (Average)',
                backgroundColor: '#985575',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [allCO2Reduced, allCO2Produced],
            },
        ],
    };

    return (
        <Grid>
            <Grid.Column>
                <Bar data={stateAll}
                     height={300} width={500}
                     options={{
                         maintainAspectRatio: false,
                         title: {
                             display: true,
                             text: 'My CO2 Reduction Effort for ' + months[date.getMonth()] + ' ' + date.getFullYear(),
                             fontSize: 30,
                         },
                         scales: {
                             yAxes: [{
                                 scaleLabel: {
                                     display: true,
                                     labelString: 'Pounds of CO2',
                                 },
                             }],
                             xAxes: [{
                                 scaleLabel: {
                                     display: true,
                                     labelString: 'GHG Data',
                                 },
                             }],
                         },
                     }}
                />
            </Grid.Column>
        </Grid>
    );
};

ComparisonGraph.propTypes = {
    userData: PropTypes.array.isRequired,
};

export default withTracker(() => {
    const subscription1 = Meteor.subscribe(DailyUserData.userPublicationName);
    return {
        userData: DailyUserData.collection.find({}).fetch(),
        ready: subscription1.ready(),
    };
})(ComparisonGraph);
