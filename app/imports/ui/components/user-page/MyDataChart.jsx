import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid } from 'semantic-ui-react';
import { Pie } from 'react-chartjs-2';
import { withTracker } from 'meteor/react-meteor-data';
import { DailyUserData } from '../../../api/user/ghg-data/DailyUserDataCollection';
import { getCumulativePerMode } from '../../utilities/CumulativeGHGData';
import PropTypes from 'prop-types';

// Pie chart of the mileage for each mode of transportation for a specific user
const MyDataChart = (props) => {
    const teleworkData = getCumulativePerMode(props.userData, 'Telework');
    const totalTelework = teleworkData.VMTReduced;
    const aVData = getCumulativePerMode(props.userData, 'EV/Hybrid');
    const totalAV = aVData.VMTReduced;
    const bikingData = getCumulativePerMode(props.userData, 'Biking');
    const totalBiking = bikingData.VMTReduced;
    const walkingData = getCumulativePerMode(props.userData, 'Walking');
    const totalWalking = walkingData.VMTReduced;
    const carpoolData = getCumulativePerMode(props.userData, 'Carpool');
    const totalCarpool = carpoolData.VMTReduced;
    const ptData = getCumulativePerMode(props.userData, 'Public Transportation');
    const totalPT = ptData.VMTReduced;
    const stateAll = {
        labels: ['Telework', 'Public Transportation', 'Biking', 'Walk', 'Carpool', 'EV/Hybrid'],
        datasets: [{ data: [totalTelework, totalPT, totalBiking, totalWalking, totalCarpool, totalAV],
            backgroundColor: ['#5c8d89', '#4b8796', '#4f7fa0', '#6872a0', '#846391', '#985575'],
        }],
    };

    return (
        <Grid>
            <Grid.Column>
                <Pie data={stateAll} height='250px'/>
            </Grid.Column>
        </Grid>
    );
};

MyDataChart.propTypes = {
    userData: PropTypes.array.isRequired,
};

export default withTracker(() => {
    const subscription1 = Meteor.subscribe(DailyUserData.userPublicationName);
    const ready = subscription1.ready();
    const userData = DailyUserData.collection.find({}).fetch();
    return {
        userData,
        ready,
    };
})(MyDataChart);
