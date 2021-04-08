import React from 'react';
import { Grid } from 'semantic-ui-react';
import { HorizontalBar } from 'react-chartjs-2';
import { _ } from 'meteor/underscore';
import { getCumulativeGHG } from '../utilities/CumulativeGHGData';
import PropTypes from "prop-types";

// Displaying a pie chart of the mode of transportation from DailyUserData collection
const ComparisonGraph = (props) => {
    // NEXT: ADD CUMULATIVE, ADD POPUP THAT WARNS/CONGRATULATES USER BASED ON COMPARISON
    const date = new Date();
    const getByMonthIndividual = _.filter(props.userData, (userTrip) => { return (userTrip.inputDate.getMonth() ===
        date.getMonth() && userTrip.inputDate.getFullYear() === date.getFullYear()) });
    const userGHGData = getCumulativeGHG(getByMonthIndividual);
    export const totalCO2Reduced = userGHGData.cO2Reduced;
    export const totalCO2Produced = userGHGData.cO2Produced;
    const stateAll = {
        labels: ['Carbon Reduced', 'Carbon Produced'],
        datasets: [
            {
                label: 'Me',
                backgroundColor: '#5c8d89',
                barThickness: 30,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [totalCO2Reduced, totalCO2Produced],
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
                             display: true,
                             text: 'My GHG Statistics',
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

ComparisonGraph.propTypes = {
    userData: PropTypes.array.isRequired,
};

export default (ComparisonGraph);

