import React from 'react';
import { Header, Image, Grid, Segment, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const paddingStyle = { padding: '20px' };

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingCumulativeData = () => (
        <div className='landing-data' style={paddingStyle}>
        <Header as='h1' >Cumulative Data in Hawaii</Header>
          <Grid columns={2} stackable >
            <Grid.Column>
              <Image src='/images/cumulative-page/graph.png'></Image>
            </Grid.Column>
            <Grid.Column>
              <Segment color='grey' > <Header as='h1'> Carbon Saved to Date: </Header>
                <Image src='/images/temp-graph.png' size='large'></Image>
              </Segment>
            </Grid.Column>
          </Grid>
          <Header as='h1' textAlign='center'> <u>Malama I Ka `Aina</u></Header>
          <Header as='h2' textAlign='center'> Do your part to save Hawai&apos;i and track your carbon footprint today.
            <br/>
            <Button className="ui massive black basic button" as={NavLink} activeClassName="active" exact to="/signup" >Sign Up</Button>
          </Header>
        </div>
    );

export default LandingCumulativeData;
