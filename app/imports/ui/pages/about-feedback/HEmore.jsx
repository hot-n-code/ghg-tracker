import React from 'react';
import { Grid, Header, Container, Embed } from 'semantic-ui-react';

const paddingStyle = { padding: '20px', paddingTop: '25px' };
const pageStyle = { paddingLeft: '50px', paddingRight: '50px', paddingBottom: '60px' };
/** A simple static component to render some text for the landing page. */
class HEmore extends React.Component {
  render() {
    return (
        <div className='background-all-about'>
        <Container>
            <Header style={paddingStyle} size='large' textAlign='center'>Hawaiian Electric strives to be one of the most progressive and highest performing companies in the world
              , serving the energy needs of each person in Hawaii with purpose, compassion, empathy
              , and aloha for our fellow humans and our natural environment.</Header>
            <Header size='small' className='centered' >
              We commit to be the best in all we do. We turn our Hawaii spirit and our connectedness with others to our community’s advantage. We act with boldness and urgency,
              without fear of failure. Our highest priority is to build a sustainable Hawaii in which our children and grandchildren, our communities, our customers
              , and employees will thrive, together.</Header>
            <Grid columns={2} style={pageStyle}>
            <Grid.Column>
              <Header size='huge' textAlign='center'>Empowering Hawaii</Header>
              <Embed
                  id='PA24iJ_bJJk'
                  placeholder='images/v1.jpg'
                  source='youtube'
              />
            </Grid.Column>
            <Grid.Column>
              <Header size='huge' textAlign='center'>Moving Forward, Together</Header>
              <Embed
                  id='flHbg0vdTTk'
                  placeholder='images/v2.jpg'
                  source='youtube'
              />
            </Grid.Column>
          </Grid>
        </Container>
        </div>
    );
  }
}

export default HEmore;
