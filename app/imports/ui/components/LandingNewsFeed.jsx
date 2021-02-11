import React from 'react';
import { Grid, Header, Segment, Item, List } from 'semantic-ui-react';

const paddingStyle = { padding: '20px' };

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingNewsFeed = () => (
    <div style={paddingStyle}>
        <Header as='h3'>Stay in the Loop and Check Out the Latest News on Green House Gasses.. </Header>
    <Grid relaxed columns={3}>
      <Grid.Column>
        <Segment>
        <Item>
          <Item.Image size='large' src='/images/landing-page/footprint.jpg' />
          <Header as='h2'>GHG in Hawai&apos;i</Header>
          <List bulleted>
            <List.Item>
              <a href="https://health.hawaii.gov/cab/hawaii-greenhouse-gas-program/">State of Hawaii Greenhouse Gas Program</a>
            </List.Item>
            <List.Item>
              <a href="http://actrees.org/archive/energy-climate-water-archive/hawaii_is_second_state_to_limit_greenhouse_ga/">Hawaii is Second State to Limit Greenhouse Gas Emissions</a>
            </List.Item>
            <List.Item>
              <a href="https://www.hawaii.edu/news/2021/02/05/climate-change-bats-covid19/">Climate change, bats linked to COVID-19 pandemic
              </a>
            </List.Item>
          </List>
        </Item>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Item>
            <Item.Image size='large' src='/images/landing-page/global-gas.jpg' />
            <Header as='h2'>GHG Global</Header>
            <List bulleted>
              <List.Item>
                <a href="https://www.epa.gov/ghgemissions/sources-greenhouse-gas-emissions">Sources of Greenhouse Gas Emissions</a>
              </List.Item>
              <List.Item>
                <a href="https://www.epa.gov/greenvehicles/fast-facts-transportation-greenhouse-gas-emissions">Fast Facts on Transportation Greenhouse Gas Emissions</a>
              </List.Item>
              <List.Item>
                <a href="https://www.biologicaldiversity.org/programs/climate_law_institute/transportation_and_global_warming/">Transportation and Climate Change</a>
              </List.Item>
            </List>
          </Item>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Item>
            <Item.Image size='large' src='/images/landing-page/oahu-2.jpg' />
            <Header as='h2'>HEI Updates</Header>
            <List bulleted>
              <List.Item>
                <a href="https://www.hei.com/sustainability/esg-report/default.aspx">ESG Report</a>
              </List.Item>
              <List.Item>
                <a href="https://www.hei.com/sustainability/project-footprint/default.aspx">
                  Project Footprint</a>
              </List.Item>
              <List.Item>
                <a href="https://www.hei.com/investor-relations/contact-us/default.aspx">
                  Contact HEI</a>
              </List.Item>
            </List>
          </Item>
        </Segment>
      </Grid.Column>
    </Grid>
    </div>
    );

export default LandingNewsFeed;
