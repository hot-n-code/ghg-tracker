import React from 'react';
import { Container, Image, Header, Grid, Table, Button } from 'semantic-ui-react';

class DataAdminPage extends React.Component {
  render() {
    return (
        <Container>
          <Grid.Column>
            <Header as='h1' textAlign='center'>Community Data</Header>
            <Image floated='left' src="https://www.iconpacks.net/icons/1/free-pie-chart-icon-683-thumb.png" size='large'/>
            <Image floated='right' src="https://globuswarwick.files.wordpress.com/2020/02/screen-shot-2020-02-11-at-21.50.22.png?w=663" size='large'/>
          </Grid.Column>
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
                <Table.Cell>0.0</Table.Cell>
                <Table.Cell>20500</Table.Cell>
                <Table.Cell>
                  <Button fluid color='grey'>Edit</Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Bus</Table.Cell>
                <Table.Cell>0.0</Table.Cell>
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