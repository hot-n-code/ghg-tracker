import React from 'react';
import { Input, Container, Image, Header, Grid, Segment, Button } from 'semantic-ui-react';

const paddingStyle = { padding: 20 };
class AdminPage extends React.Component {
  render() {
    return (
        <div style={paddingStyle}>
        <Container>
          <Input fluid icon='search' placeholder='Search...'>
          </Input>
          <br/>
          <br/>
          <Segment>
            <Grid>
              <Grid.Column width={2}>
                <Image size='small' rounded src='https://images-na.ssl-images-amazon.com/images/I/41LMQ-wZ2oL._AC_SY355_.jpg'/>
              </Grid.Column>
              <Grid.Column width={10}>
                <Header as='h1'>Name</Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Button fluid color='grey'>Edit</Button>
                <Button fluid color='red'>Remove</Button>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Column width={2}>
                <Image size='small' rounded src='https://images-na.ssl-images-amazon.com/images/I/41LMQ-wZ2oL._AC_SY355_.jpg'/>
              </Grid.Column>
              <Grid.Column width={10}>
                <Header as='h1'>Name</Header>
              </Grid.Column>
              <Grid.Column width={4}>
                <Button fluid color='grey'>Edit</Button>
                <Button fluid color='red'>Remove</Button>
              </Grid.Column>
            </Grid>
          </Segment>
        </Container>
        </div>
    );
  }
}

export default AdminPage;