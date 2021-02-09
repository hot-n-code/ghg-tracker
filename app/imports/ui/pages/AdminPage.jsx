import React from 'react';
import { Image, Input, Container, Grid, Segment, Header } from 'semantic-ui-react';

class AdminPage extends React.Component {
  render() {
    return (
        <Container>
          <Input fluid icon='search' placeholder='Search...'>
          </Input>
        </Container>
    );
  }
}

export default AdminPage;
