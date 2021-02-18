import React from 'react';
import { Grid, Header, Button, Image, Container, Table } from 'semantic-ui-react';
import { Pie } from 'react-chartjs-2';

const paddingStyle = { padding: 20 };
/** Renders the Page for displaying the user's data: Their numbers for the day, overview of their carbon footprint, and
 * users may also edit their data of their entries.
 * */
class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            labels: ['Telework', 'Public Transportation', 'Biking', 'Walk', 'Carpool', 'Electric Vehicle'],
            datasets: [{ data: [50, 40, 2, 2, 1, 5], backgroundColor: ['red', 'blue', 'green', 'yellow', 'orange', 'purple'],
            }],
        };
    }

    render() {
        return (
            <Container style={paddingStyle}>
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <h1>My Progress</h1>
                        <div id='graph-buttons'>
                            <Button size='large' color='gray'>Today</Button>
                            <Button size='large' color='gray'>This Week</Button>
                            <Button size='large' color='gray'>This Month</Button>
                        </div>
                        <Pie data={{ labels: this.state.labels, datasets: this.state.datasets }} height='200px'/>
                    </Grid.Column>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/home.png"
                                size='small' alt="home"/>
                        <Header as='h1' textAlign='center'>Days Worked at Home:</Header>
                        <Header as='h2' textAlign='center'>206 days</Header>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/Biking.png"
                               size='small' alt="biking"/>
                        <Header as='h1' textAlign='center'>Days Biked to Work:</Header>
                        <Header as='h2' textAlign='center'>10 days</Header>
                    </Grid.Column>
                </Grid>
                <Grid stackable columns={3}>
                    <Grid.Column width={16}>
                        <Header as='h1' textAlign='center'>
                            My Numbers for February 8, 2021</Header>
                    </Grid.Column>
                </Grid>
                <Grid stackable columns={3}>
                    <Grid.Column>
                        <Image className='images' src="/images/gas.png"
                               floated='left' size='medium' alt="filler placement for eventual graph"/>
                        <Header as='h1' textAlign='center'>Fuel Saved</Header>
                        <Header as='h2' textAlign='center'>0.9 gal</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image className='images' src="/images/speedometer.png"
                               size='medium' alt="filler placement for eventual graph"/>
                        <Header as='h1' textAlign='center'>Total Miles</Header>
                        <Header as='h2' textAlign='center'>7.4</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image className='images' src="/images/co2.png"
                               floated='right' size='medium' alt="filler placement for eventual graph"/>
                        <Header as='h1' textAlign='center'>CO2 Reduced</Header>
                        <Header as='h2' textAlign='center'>15.2 lbs</Header>
                    </Grid.Column>
                </Grid>
                <Grid stackable columns={3}>
                    <Grid.Column width={16}>
                        <Header as='h1' textAlign='center'>Your CO2 Emission was up 2.6% from yesterday.</Header>
                        <Header as='h2' textAlign='center'>My Transportation History</Header>
                    </Grid.Column>
                </Grid>
                <Table stackable striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Mode of Transportation</Table.HeaderCell>
                            <Table.HeaderCell>Total Miles</Table.HeaderCell>
                            <Table.HeaderCell>Edit Data</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>February 8, 2021 5:50 PM</Table.Cell>
                            <Table.Cell>Public Transportation</Table.Cell>
                            <Table.Cell>5.1</Table.Cell>
                            <Table.Cell><Button size='large' color='gray'>Edit</Button></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>February 8, 2021 2:30 PM</Table.Cell>
                            <Table.Cell>Public Transportation</Table.Cell>
                            <Table.Cell>2.3</Table.Cell>
                            <Table.Cell><Button size='large' color='gray'>Edit</Button></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default UserPage;
