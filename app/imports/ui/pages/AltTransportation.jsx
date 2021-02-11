import React from 'react';
import { Image, Card, CardGroup, Header, Button, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class AltTransportation extends React.Component {
  render() {
    return (
        <Container>
          <Header textAlign='center' as="h1">
            Alternative Transportation
          </Header>
          <CardGroup centered itemsPerRow={3}>
            <Card>
              <Image
                  src='images/Walking.png' wrapped ui={false}/>
              <Card.Content>
                <Header textAlign='center' size='large'>Walking</Header>
              </Card.Content>
              <Card.Content textAlign="center">
                <Button color='green' size='large'> Calculate </Button>
                <br/>
                <br/>
                <Button color='green' size='large'> Compare </Button>
                <br/>
                <br/>
                <Button color='green' size='large'> Info </Button>
              </Card.Content>
            </Card>
            <Card>
              <Image
                  src='images/Biking.png' wrapped ui={false}/>
              <Card.Content>
                <Header textAlign='center' size='large'>Biking</Header>
              </Card.Content>
              <Card.Content textAlign="center">
                <Button color='green' size='large'> Calculate </Button>
                <br/>
                <br/>
                <Button color='green' size='large'> Compare </Button>
                <br/>
                <br/>
                <Button color='green' size='large'> Info </Button>
              </Card.Content>
            </Card>
            <Card>
              <Image
                  src='images/Bussing.jpg' wrapped ui={false}/>
              <Card.Content>
                <Header textAlign='center' size='large'>Bussing</Header>
              </Card.Content>
              <Card.Content textAlign="center">
                <Button color='green' size='large'> Calculate </Button>
                <br/>
                <br/>
                <Button color='green' size='large'> Compare </Button>
                <br/>
                <br/>
                <Button color='green' size='large'> Info </Button>
              </Card.Content>
            </Card>
            <Card>
              <Image
                  src='images/AltFuel.png' wrapped ui={false}/>
              <Card.Content>
                <Header textAlign='center' size='large'>Alternative Fuel Vehicles</Header>
              </Card.Content>
              <Card.Content textAlign="center">
                <Button color='green' size='large'> Calculate </Button>
                <br/>
                <br/>
                <Button color='green' size='large'> Compare </Button>
                <br/>
                <br/>
                <Button color='green' size='large'> Info </Button>
              </Card.Content>
            </Card>
            <Card>
              <Image
                  src='images/Carpool.png' wrapped ui={false}/>
              <Card.Content>
                <Header textAlign='center' size='large'>Car-pooling</Header>
              </Card.Content>
              <Card.Content textAlign="center">
                <Button color='green' size='large'> Calculate </Button>
                <br/>
                <br/>
                <Button color='green' size='large'> Compare </Button>
                <br/>
                <br/>
                <Button color='green' size='large'> Info </Button>
              </Card.Content>
            </Card>
          </CardGroup>
        </Container>
    );
  }
}

export default AltTransportation;
