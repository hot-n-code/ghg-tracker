import React from 'react';
import { Grid, Header, Container } from 'semantic-ui-react';
import CumulativeDataCard from '../components/CumulativeDataCard';
import CumulativeDataChart from '../components/CumulativeDataChart';

class UsersCumulativePage extends React.Component {

    render() {

      return (
        <div className='background-all'>
          <div style={{ paddingBottom: '80px' }}>
            <Container>
              <Grid.Column>
                <div>
                  <Header as='h1' textAlign='center'> Cumulative Data Of Users</Header>
                  <br/>
                </div>
                <CumulativeDataChart/>
              </Grid.Column>
              <CumulativeDataCard/>
            </Container>
          </div>
        </div>
      );
  }
}

export default UsersCumulativePage;
