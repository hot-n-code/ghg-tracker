import React from 'react';
import { Grid, Header, Button, Image, Container, Table } from 'semantic-ui-react';

/** Renders the Page for displaying the user's data: Their numbers for the day, overview of their carbon footprint, and
 * users may also edit their data of their entries.
 * */
class UserPage extends React.Component {
    render() {
        return (
            <Container>
                <Grid columns={2}>
                    <Grid.Column width={8}>
                        <h1>My Progress</h1>
                        <div id='graph-buttons'>
                            <Button size='large' color='gray'>Today</Button>
                            <Button size='large' color='gray'>This Week</Button>
                            <Button size='large' color='gray'>This Month</Button>
                        </div>
                        <Image src="/images/chart.png"
                               floated='left' size='massive' alt="filler placement for eventual graph"/>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h1' textAlign='center'>My Carbon Footprint</Header>
                        <Image floated='right' src="/images/carbonmeter.png" size='medium'
                               alt="filler placement for eventual meter"/>
                    </Grid.Column>
                </Grid>
                <Grid columns={3}>
                    <Grid.Column width={16}>
                        <Header as='h1' textAlign='center'>
                            My Numbers for February 9, 2021</Header>
                    </Grid.Column>
                </Grid>
                <Grid columns={3}>
                    <Grid.Column>
                        {/* eslint-disable-next-line max-len */}
                        <Image className='images' src="/images/gas.png"
                               floated='left' size='large' alt="filler placement for eventual graph"/>
                    </Grid.Column>
                    <Grid.Column>
                        {/* eslint-disable-next-line max-len */}
                        <Image className='images' src="/images/speedometer.png"
                               size='medium' alt="filler placement for eventual graph"/>
                    </Grid.Column>
                    <Grid.Column>
                        {/* eslint-disable-next-line max-len */}
                        <Image className='images' src="/images/co2.png"
                               floated='right' size='medium' alt="filler placement for eventual graph"/>
                    </Grid.Column>
                </Grid>
                <Grid columns={3}>
                    <Grid.Column>
                        <Header as='h1' textAlign='center'>Fuel Saved</Header>
                        <Header as='h2' textAlign='center'>XX gal</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h1' textAlign='center'>Total Miles</Header>
                        <Header as='h2' textAlign='center'>XX mi</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h1' textAlign='center'>CO2 Reduced</Header>
                        <Header as='h2' textAlign='center'>XX</Header>
                    </Grid.Column>
                </Grid>
                <Grid columns={3}>
                    <Grid.Column width={16}>
                        <Header as='h1' textAlign='center'>Your CO2 Emission was up 2.6% from yesterday.</Header>
                        <Header as='h2' textAlign='center'>My Transportation History</Header>
                    </Grid.Column>
                </Grid>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Mode of Transportation</Table.HeaderCell>
                            <Table.HeaderCell>Total Miles</Table.HeaderCell>
                            <Table.HeaderCell>CO2 Emission</Table.HeaderCell>
                            <Table.HeaderCell>Edit Data</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>February 8, 2021 5:50 PM</Table.Cell>
                            <Table.Cell>Tesla Model 3</Table.Cell>
                            <Table.Cell>5.1</Table.Cell>
                            <Table.Cell>XX</Table.Cell>
                            <Table.Cell><Button size='large' color='gray'>Edit</Button></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>February 8, 2021 2:30 PM</Table.Cell>
                            <Table.Cell>Tesla Model 3</Table.Cell>
                            <Table.Cell>2.3</Table.Cell>
                            <Table.Cell>XX</Table.Cell>
                            <Table.Cell><Button size='large' color='gray'>Edit</Button></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default UserPage;
