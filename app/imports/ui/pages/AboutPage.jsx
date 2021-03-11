import React from 'react';
import { Grid, Image, Header, Container, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import FeedBack from './FeedBack';

const menuStyle = { height: '350px' };
const paddingStyle = { padding: '20px', paddingTop: '100px' };
const infoStyleTop = { paddingTop: '50px' };
const infoStyleBottom = { paddingTop: '100px' };
const button = { marginLeft: '33%', marginRight: '33%', marginTop: '35px' };
/** A simple static component to render some text for the landing page. */
class AboutPage extends React.Component {
  render() {
    return (
        <div className='background-all-about'>
        <Container fluid>
        <Container fluid className='background-about' style={menuStyle}>
            <Header style={paddingStyle} inverted size='huge' textAlign='center'>At HEI, our family of Hawaii-based companies provides the energy and
              financial infrastructure that empowers much of the economic and community activity of our state.</Header>
            <Header inverted size='small' className='centered' >
              Accelerating a Sustainable Future for Hawaii, Enhancing the Lives of Our Communities and Creating Value for Our Shareholders</Header>
        </Container>
            <Container style={infoStyleTop}>
            <Grid columns={3} divided>
            <Grid.Column>
              <Image src="/images/HE.png" centered/>
              <Header size='small'>For 130 years, Hawaiian Electric has provided the energy that fuels our islands growth and prosperity.
                Now, we are spearheading the way toward a 100 clean energy, carbon neutral future.
                Hawaiian Electric serves 95 of Hawaii, creating a strong partnership with our communities, and sustainable economics for our shareholders and stakeholders.</Header>
              <Button inverted color='green' content='Learn More' style={button} as={NavLink} activeClassName='active' exact to='/hemore'/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/ASB.jpg" size='medium' centered/>
              <Header size='small'>American Savings Bank provides the capital to help Hawaii grow. It has been serving and investing in Hawaii’s families,
                businesses and communities since 1925.
                Our ability to finance a sustainable Hawaii economy supports Hawaiian Electric’s efforts to create clean, energy-efficient communities.
              </Header>
              <Button inverted color='green' content='Learn More' style={button} as={NavLink} activeClassName='active' exact to='/asbmore' />
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/CE.png" centered/>
              <Header size='small'>Pacific Current is our newest subsidiary, and a powerful investment platform focused on accelerating
                Hawaii’s sustainable future.
                Through Pacific Current we are able to invest in projects that advance Hawaii’s ambitious environmental and economic goals.
              </Header>
              <Button inverted color='green' content='Learn More' style={button} as={NavLink} activeClassName='active' exact to='/pcmore' />
            </Grid.Column>
          </Grid>
            </Container>
          <div style={infoStyleBottom}>
          </div>
          <FeedBack/>
          <div style={{ paddingBottom: '220px' }}>
          </div>
          {/* <Header as='h1' className='centered'> */}
          {/*  Contact Information */}
          {/* </Header> */}
          {/* <Header as='h5' className='centered'> */}
          {/*  HAWAIIAN ELECTRIC INDUSTRIES */}
          {/* </Header> */}
          <Grid columns={3} padded>
            <Grid.Column>
              <Header as='h4' className='centered'>
                CORPORATE HEADQUARTERS
              </Header>
              <Header sub className='centered'>1001 Bishop Street, Suite 2900
                Honolulu, Hawaii 96813
                Telephone: (808) 543-5662</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h4' className='centered'>
                Contact Information
              </Header>
              <Header as='h5' className='centered'>
                HAWAIIAN ELECTRIC INDUSTRIES
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h4' className='centered'>
                MAILING ADDRESS
              </Header>
              <Header sub className='centered'>
                P.O. Box 730
                Honolulu, HI 96808-0730
              </Header>
            </Grid.Column>
          </Grid>
        </Container>
        </div>
    );
  }
}

export default AboutPage;
