import React from 'react';
import { Grid, Header, Container, Embed } from 'semantic-ui-react';

const paddingStyle = { padding: '20px', paddingTop: '25px' };
const pageStyle = { paddingLeft: '50px', paddingRight: '50px', paddingBottom: '60px' };
/** A simple static component to render some text for the landing page. */
class Asbmore extends React.Component {
  render() {
    return (
        <div className='background-all-about'>
        <Container>
            <Header style={paddingStyle} size='large' textAlign='center'>American Savings Bank strives to make banking easy for customers,
              deliver high performance, create a great place to work
              , and bring real impact to our community.</Header>
            <Header size='small' className='centered' >
              With roots going back to 1925, American Savings Bank is committed to serving its customers with a range of financial products and services anytime,
              anywhere. As one of Hawaii’s leading financial institutions, American Savings Bank offers business and consumer banking, home loans, insurance and investments.
              Dedicated to making banking easy, the bank offers a comprehensive online banking platform
              , in addition to branch locations across the state offering more extended weekday and weekend hours than other similarly sized local banks.</Header>
            <Grid columns={2} style={pageStyle}>
            <Grid.Column>
              <Header size='huge' textAlign='center'>Sharing Hawaii with the World</Header>
              <Embed
                  id='L6XFykkpkvQ'
                  placeholder='images/v3.jpg'
                  source='youtube'
              />
            </Grid.Column>
            <Grid.Column>
              <Header size='huge' textAlign='center'>Opening Our Doors to Everyone</Header>
              <Embed
                  id='Su4YW-0zl2A'
                  placeholder='images/v4.jpg'
                  source='youtube'
              />
            </Grid.Column>
          </Grid>
        </Container>
        </div>
    );
  }
}

export default Asbmore;
