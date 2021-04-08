import React from 'react';
import { Grid } from 'semantic-ui-react';
import { HorizontalBar } from 'react-chartjs-2';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { getCumulativeGHG } from '../utilities/CumulativeGHGData';

// Displaying a pie chart of the mode of transportation from DailyUserData collection
const ComparisonGraph = (props) => {
    // NEXT: ADD CUMULATIVE, ADD POPUP THAT WARNS/CONGRATULATES USER BASED ON COMPARISON
    const date = new Date();
    const getByMonthIndividual = _.filter(props.userData, (userTrip) => {
        return (userTrip.inputDate.getMonth() ===
            date.getMonth() && userTrip.inputDate.getFullYear() === date.getFullYear());
    });
    const userGHGData = getCumulativeGHG(getByMonthIndividual);
    const totalCO2Reduced = userGHGData.cO2Reduced;
    const totalCO2Produced = userGHGData.cO2Produced;

    const getByMonthAll = _.filter(props.userDataAll, (userTrip) => {
        return (userTrip.inputDate.getMonth() ===
            date.getMonth() && userTrip.inputDate.getFullYear() === date.getFullYear());
    });
    const usersGHGData = getCumulativeGHG(getByMonthAll);
    const allCO2Reduced = (usersGHGData.cO2Reduced / _.size(props.users)).toFixed(2);
    const allCO2Produced = (usersGHGData.cO2Produced / _.size(props.users)).toFixed(2);
    const stateAll = {
        labels: ['Carbon Reduced', 'Carbon Produced'],
        datasets: [
            {
                label: 'Me',
                backgroundColor: '#5c8d89',
                barThickness: 35,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [totalCO2Reduced, totalCO2Produced],
            },
            {
                label: 'Cumulative Data (Average)',
                backgroundColor: '#985575',
                barThickness: 35,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [allCO2Reduced, allCO2Produced],
            },
        ],
    };

    return (
        <Grid>
            <Grid.Column>
                <HorizontalBar data={stateAll}
                               height={300} width={100}
                               options={{
                                   maintainAspectRatio: false,
                                   title: {
                                       display: false,
                                   },
                                   scales: {
                                       yAxes: [{
                                           scaleLabel: {
                                               display: true,
                                               labelString: '',
                                           },
                                           ticks: {
                                               beginAtZero: true,
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

ComparisonGraph.propTypes = {
    userData: PropTypes.array.isRequired,
    userDataAll: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
};

export default (ComparisonGraph);
