import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { DailyUserData } from '../../api/user/ghg-data/DailyUserDataCollection';
import { getCumulativeGHG } from '../utilities/CumulativeGHGData';
import { getDateToday } from '../utilities/DailyGHGData';

/** Renders the Page for displaying the user's data: Their numbers for the day, overview of their carbon footprint, and
 * users may also edit their data of their entries.
 * */
const MyNumbers = (props) => {
    const today = getDateToday().toDateString();
    const hoursTelework = _.size(_.where(props.dailyData, { modeOfTransportation: 'Telework' }));
    const ghgData = getCumulativeGHG(props.dailyData);
    const totalCO2Reduced = ghgData.cO2Reduced;
    const totalMiles = ghgData.VMTReduced;
    const totalFuelSaved = ghgData.fuelSaved;
    const totalGHGProduced = ghgData.cO2Produced;
    return (
            <div className='background-total-user-data'>
                <Grid stackable columns={3}>
                    <Grid.Column width={16}>
                        <Header as='h1' textAlign='center'>
                            My numbers as of
                            <br/>
                            {today}</Header>
                        <hr/>
                    </Grid.Column>
                </Grid>
                <div style={{ paddingBottom: '50px' }}/>
                <div>
                    <Grid stackable columns={5} divided>
                        <Grid.Column>
                            <Image style={{ display: 'block',
                                margin: '0 auto' }} src="/images/gas.png"
                                   size='small' alt="filler placement for eventual graph"/>
                            <Header as='h1' textAlign='center'>Total Fuel Saved</Header>
                            <Header as='h2' textAlign='center'>{totalFuelSaved} gallons</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Image style={{ display: 'block',
                                margin: '0 auto' }} src="/images/speedometer.png"
                                   size='small' alt="filler placement for eventual graph"/>
                            <Header as='h1' textAlign='center'>Alternative Miles</Header>
                            <Header as='h2' textAlign='center'>{totalMiles} miles</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Image style={{ display: 'block',
                                margin: '0 auto' }} src="https://img.icons8.com/ios/100/000000/potted-plant.png"
                                   size='small' alt="CO2"/>
                            <Header as='h1' textAlign='center'>Total CO2 Reduced</Header>
                            <Header as='h2' textAlign='center'>{totalCO2Reduced} lbs</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Image style={{ display: 'block',
                                margin: '0 auto' }} src="/images/home.png"
                                   size='small' alt="home"/>
                            <Header as='h1' textAlign='center'>Days Worked at Home</Header>
                            <Header as='h2' textAlign='center'>{hoursTelework} day(s)</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Image style={{ display: 'block',
                                margin: '0 auto' }} src="/images/co2.png"
                                   size='small' alt="biking"/>
                            <Header as='h1' textAlign='center'>Total CO2 Produced</Header>
                            <Header as='h2' textAlign='center'>{totalGHGProduced} lb(s)</Header>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
    );
};

MyNumbers.propTypes = {
    dailyData: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
    const subscription1 = Meteor.subscribe(DailyUserData.userPublicationName);
    return {
        dailyData: DailyUserData.collection.find({}).fetch(),
        ready: subscription1.ready(),
    };
})(MyNumbers);
