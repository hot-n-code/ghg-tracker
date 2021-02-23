import React from 'react';
import { Grid, Header, Button, Image, Container, Table, Card } from 'semantic-ui-react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff';

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
                <Header as='h1' textAlign='center'>Hi John! Your CO2 Emission was up 2.6% from yesterday.</Header>
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <Card fluid>
                            <Card.Content textAlign='center'>
                                <Image circular style={{ display: 'block',
                                    margin: '0 auto' }}
                                       src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium'/>
                                <Card.Header style={{ margin: '9px' }}>
                                    <Header as='h1'>John Smith</Header>
                                </Card.Header>
                                <Card.Header>
                                    <Header as='h4'>Date joined: February 7, 2021</Header>
                                </Card.Header>
                                <Card.Meta>
                                    <Header as='h4'>My Overall CO2 Emissions: 5 lbs</Header>
                                </Card.Meta>
                                <Card.Meta>
                                    <Header as='h4'>Number of Trees Planted: 0.792</Header>
                                </Card.Meta>
                                <Button style={{ margin: '20px' }} size='medium' color='gray'>Edit Profile</Button>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid>
                            <Card.Content>
                                <Header as='h1' textAlign='center'>My Summary</Header>
                                <div id='graph-buttons'>
                                    <Button size='large' color='gray'>Today</Button>
                                    <Button size='large' color='gray'>This Week</Button>
                                    <Button size='large' color='gray'>This Month</Button>
                                </div>
                                <Pie data={{ labels: this.state.labels, datasets: this.state.datasets }} height='200px'/>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
                <Grid stackable columns={3}>
                    <Grid.Column width={16}>
                        <Header as='h1' textAlign='center'>
                            My Numbers for February 8, 2021</Header>
                    </Grid.Column>
                </Grid>
                <Grid stackable columns={5}>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/gas.png"
                               size='small' alt="filler placement for eventual graph"/>
                        <Header as='h1' textAlign='center'>Total Fuel Saved</Header>
                        <Header as='h2' textAlign='center'>0.9 gal</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/speedometer.png"
                               size='small' alt="filler placement for eventual graph"/>
                        <Header as='h1' textAlign='center'>Total Miles Traveled</Header>
                        <Header as='h2' textAlign='center'>7.4 miles</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/co2.png"
                               size='small' alt="CO2"/>
                        <Header as='h1' textAlign='center'>Total CO2 Reduced</Header>
                        <Header as='h2' textAlign='center'>15.2 lbs</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/home.png"
                               size='small' alt="home"/>
                        <Header as='h1' textAlign='center'>Days Worked at Home</Header>
                        <Header as='h2' textAlign='center'>206 days</Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image style={{ display: 'block',
                            margin: '0 auto' }} src="/images/Biking.png"
                               size='small' alt="biking"/>
                        <Header as='h1' textAlign='center'>Days Biked to Work</Header>
                        <Header as='h2' textAlign='center'>10 days</Header>
                    </Grid.Column>
                </Grid>
                <Grid stackable columns={3}>
                    <Grid.Column width={16}>
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

UserPage.propTypes = {
    ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
     // template to connect data
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    return {
        ready: subscription.ready(),
    };
})(UserPage);
