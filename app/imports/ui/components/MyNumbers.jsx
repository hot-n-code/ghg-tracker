import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { getCumulativeGHG } from '../utilities/CumulativeGHGData';

/** Renders the Page for displaying the user's data: Their numbers for the day, overview of their carbon footprint, and
 * users may also edit their data of their entries.
 * */
const MyNumbers = (props) => {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];
    const getByMonthIndividual = _.filter(props.dailyData, (userTrip) => (userTrip.inputDate.getMonth() ===
        date.getMonth() && userTrip.inputDate.getFullYear() === date.getFullYear()));
    const hoursTelework = _.size(_.where(getByMonthIndividual, { modeOfTransportation: 'Telework' }));
    const ghgData = getCumulativeGHG(getByMonthIndividual, props.vehicles);
    const totalCO2Reduced = ghgData.cO2Reduced;
    const totalMiles = ghgData.VMTReduced;
    const totalFuelSaved = ghgData.fuelSaved;
    const totalGHGProduced = ghgData.cO2Produced;
    return (
        <div className='background-total-user-data'>
            <Grid stackable columns={3}>
                <Grid.Column width={16}>
                    <Header as='h1' textAlign='center'>
                        My {months[date.getMonth()]} {date.getFullYear()} GHG Breakdown</Header>
                    <hr/>
                </Grid.Column>
            </Grid>
            <div style={{ paddingBottom: '50px' }}/>
            <div>
                <Grid stackable columns={5} divided>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/colored-clipart/3.png"
                               size='small' alt="filler placement for eventual graph"/>
                        <Header as='h1' textAlign='center'>Total Fuel Saved</Header>
                        <Header as='h2' textAlign='center'>{totalFuelSaved.toFixed(2)} gallons</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/colored-clipart/1.png"
                               size='small' alt="filler placement for eventual graph"/>
                        <Header as='h1' textAlign='center'>Alternative Miles</Header>
                        <Header as='h2' textAlign='center'>{totalMiles} miles</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/colored-clipart/2.png"
                               size='small' alt="CO2"/>
                        <Header as='h1' textAlign='center'>Total CO2 Reduced</Header>
                        <Header as='h2' textAlign='center'>{totalCO2Reduced.toFixed(2)} lbs</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/colored-clipart/4.png"
                               size='small' alt="home"/>
                        <Header as='h1' textAlign='center'>Days Worked at Home</Header>
                        <Header as='h2' textAlign='center'>{hoursTelework} day(s)</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/colored-clipart/5.png"
                               size='small' alt="biking"/>
                        <Header as='h1' textAlign='center'>Total CO2 Produced</Header>
                        <Header as='h2' textAlign='center'>{totalGHGProduced.toFixed(2)} lb(s)</Header>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    );
};

MyNumbers.propTypes = {
    dailyData: PropTypes.array.isRequired,
    vehicles: PropTypes.array.isRequired,
};

export default (MyNumbers);
