import React from 'react';
import { Header, Container } from 'semantic-ui-react';

const paddingStyle = { padding: '20px', paddingTop: '25px' };
/** A simple static component to render some text for the landing page. */
class Pcmore extends React.Component {
  render() {
    return (
        <div className='background-all-about' id='pcmore'>
        <Container>
            <Header style={paddingStyle} size='large' textAlign='center'>Pacific Current builds local partnerships and invests in clean energy
              and sustainability projects as part of HEI’s strategy to be a catalyst for a better Hawaii.</Header>
            <Header size='small' className='centered' >
              Pacific Current is a powerful investment platform focused on accelerating Hawaii’s clean energy future.
              We help develop projects that advance Hawaii’s ambitious environmental and economic goals.</Header>
        </Container>
        </div>
    );
  }
}

export default Pcmore;
