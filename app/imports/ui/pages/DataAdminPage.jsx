import React from 'react';
import { Container, Grid, Table, Button, Header } from 'semantic-ui-react';
import { Bar, Pie } from 'react-chartjs-2';

const paddingStyle = { padding: 20 };

class DataAdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transportation: ['Telework', 'Public Transportation', 'Biking',
        'Walk', 'Carpool', 'Electric Vehicle'],
      transportationDatasets: [
        {
          backgroundColor: ['blue', 'red', 'green', 'purple', 'light blue', 'orange'],
          borderColor: 'rgba(0,0,0,1)',
          data: [190, 9, 0, 0, 10, 7],
        },
      ],
      labels: ['January', 'February', 'March',
        'April', 'May'],
      datasets: [
        {
          label: 'Carbon Emission',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [65, 59, 80, 81, 56],
        },
      ],
    };
  }

  render() {
    return (
        <Container style={paddingStyle}>
          <Grid columns={2}>
            <Grid.Column>
              <Pie data={{ labels: this.state.transportation, datasets: this.state.transportationDatasets }}
                   height={200}
                   options={{
                     maintainAspectRatio: false,
                     title: {
                       display: true,
                       text: 'Mode of Transportation',
                       fontSize: 30,
                     },
                   }}
              />
            </Grid.Column>
            <Grid.Column>
              <Bar data={{ labels: this.state.labels, datasets: this.state.datasets }}
                   height={300} width={500}
                   options={{
                     maintainAspectRatio: false,
                     title: {
                       display: true,
                       text: 'Carbon Emissions per Month ',
                       fontSize: 30,
                     },
                     scales: {
                       yAxes: [{
                         scaleLabel: {
                           display: true,
                           labelString: 'Carbon Emissions',
                         },
                       }],
                       xAxes: [{
                         scaleLabel: {
                           display: true,
                           labelString: 'Months',
                         },
                       }],
                     },
                   }}
              />
            </Grid.Column>
          </Grid>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Mode of Transportation</Table.HeaderCell>
                <Table.HeaderCell>Carbon Emission</Table.HeaderCell>
                <Table.HeaderCell>Users</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Cars</Table.Cell>
                <Table.Cell>100.0</Table.Cell>
                <Table.Cell>20500</Table.Cell>
                <Table.Cell>
                  <Button fluid color='grey'>Edit</Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Bus</Table.Cell>
                <Table.Cell>500.0</Table.Cell>
                <Table.Cell>11800</Table.Cell>
                <Table.Cell>
                  <Button fluid color='grey'>Edit</Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

export default DataAdminPage;
