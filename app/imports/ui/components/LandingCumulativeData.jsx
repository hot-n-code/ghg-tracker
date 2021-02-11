import React from 'react';
import { Header } from 'semantic-ui-react';

const paddingStyle = { padding: '20px' };

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class LandingCumulativeData extends React.Component {
  render() {
    return (
        <div className='landing-data'>
        <Header as='h1' style={paddingStyle}>Cumulative Data in Hawaii</Header>
        </div>
    );
  }
}

export default LandingCumulativeData;
