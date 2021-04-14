import React from 'react';
import { Header, Grid, Embed } from 'semantic-ui-react';

const paddingStyle = { padding: '20px' };

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingDescription = () => (
    <div>
      <Grid columns={2} stackable style={paddingStyle} divided>
        <Grid.Column>
          <div className='landing-heading'>
            <Header textAlign='center' > <u>WHO ARE WE?</u> </Header>
          </div>
          <Header as='h2' textAlign='center' className='landing-description'>
            <p>Our focus is on Greenhouse Gas Emissions (GHG) and how it is everyone’s responsibility.
            </p>
           <p> This Project Focuses on Tackling GHG from Transportation</p>
           <p> Climate change has the potential to increase the severity and frequency of hurricanes, flooding, and droughts, and is expected to
            lead to increasing sea level rise.
           </p>
              GHG is the most significant factor in climate change.
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Learn about the impact of cars carbon emission on the planet by watching the following video</Header>
          <Embed
              id='r-qZ4qxLgDc'
              placeholder='images/video-prev.png'
              source='youtube'
          />
          <Header as='h3'><i>Source: Cars (CISL Version). YouTube, uploaded by Real World Visuals.</i>
          </Header>
        </Grid.Column>
      </Grid>
    </div>
    );

export default LandingDescription;
