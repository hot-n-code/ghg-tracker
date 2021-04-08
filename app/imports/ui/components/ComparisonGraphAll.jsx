import React from 'react';
import { Grid } from 'semantic-ui-react';
import { HorizontalBar } from 'react-chartjs-2';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { getCumulativeGHG } from '../utilities/CumulativeGHGData';

// Displaying a pie chart of the mode of transportation from DailyUserData collection
const ComparisonGraphAll = (props) => {
    // NEXT: ADD CUMULATIVE, ADD POPUP THAT WARNS/CONGRATULATES USER BASED ON COMPARISON
    const date = new Date();
    const numUsers = _.size(props.users);
    const getByMonthAll = _.filter(props.userData, (userTrip) => { return (userTrip.inputDate.getMonth() ===
        date.getMonth() && userTrip.inputDate.getFullYear() === date.getFullYear()) });
    const allGHGData = getCumulativeGHG(getByMonthAll);
    export const allCO2Reduced = (allGHGData.cO2Reduced / numUsers).toFixed(2);
    export const allCO2Produced = (allGHGData.cO2Produced / numUsers).toFixed(2);
    const stateAll = {
        labels: ['Carbon Reduced', 'Carbon Produced'],
        datasets: [
            {
                label: 'Cumulative User GHG Data (Average)',
                barThickness: 30,
                backgroundColor: '#5c8d89',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [allCO2Reduced, allCO2Produced],
            },
        ],
    };

    return (
        <Grid>
            <Grid.Column>
                <HorizontalBar data={stateAll}
                     height={300}
                     width={100}
                     options={{
                         maintainAspectRatio: false,
                         title: {
                             display: true,
                             text: 'Community GHG Statistics',
                             fontSize: 30,
                         },
                         scales: {
                             yAxes: [{
                                 scaleLabel: {
                                     display: true,
                                     labelString: '',
                                 },
                                 ticks: {
                                     beginAtZero: true
                                 },
                             }],
                             xAxes: [{
                                 scaleLabel: {
                                     display: true,
                                     labelString: 'Pounds of CO2',
                                 },
                             }],
                         },
                     }}
                />
            </Grid.Column>
        </Grid>
    );
};

ComparisonGraphAll.propTypes = {
    userData: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
};

export default (ComparisonGraphAll);
