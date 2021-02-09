import React from 'react';
import { Grid, Header, Image, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class CumulativePage extends React.Component {
  render() {
    return (
        <Container>
          <Grid.Column>
            <div>
              <Header size='huge' textAlign='center'> Cumulative Data Of Users </Header>
            </div>
            <Grid>
              <Grid.Column width={8}>
                <Image src="/images/cumulative-page/graph.png"/>
              </Grid.Column>
              <Grid.Column textAlign='right' width={8}>
                <Header as='h1'>MODES OF TRAVEL COUNT</Header>
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column textAlign='left' width={8}>
                <Header as='h1'>MODES OF TRAVEL COUNT</Header>
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src="/images/cumulative-page/graph2.png"/>
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid relaxed columns={4}>
          </Grid>
        </Container>
    );
  }
}

export default CumulativePage;
