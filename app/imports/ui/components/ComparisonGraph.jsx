import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid } from 'semantic-ui-react';
import { Bar } from 'react-chartjs-2';
import { withTracker } from 'meteor/react-meteor-data';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import PropTypes from "prop-types";
import { getCumulativeGHG } from '../utilities/CumulativeGHGData';

// Displaying a pie chart of the mode of transportation from DailyUserData collection
const ComparisonGraph = (props) => {
    const ghgData = getCumulativeGHG(props.userData);
    const totalCO2Reduced = ghgData.cO2Reduced;
    // NOTE: NEED CUMULATIVE GHG COLLECTION FOR OVERALL
    const stateAll = {
        labels: ['Me', 'Cumulative CO2 Reduced (Average)'],
        datasets: [
            {
                label: 'Carbon Emission',
                backgroundColor: '#5c8d89',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [totalCO2Reduced, 0],
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
                             text: 'My CO2 Reduction Effort',
                             fontSize: 30,
                         },
                         scales: {
                             yAxes: [{
                                 scaleLabel: {
                                     display: true,
                                     labelString: 'CO2 Reduced',
                                 },
                             }],
                             xAxes: [{
                                 scaleLabel: {
                                     display: true,
                                     labelString: 'Groups',
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
