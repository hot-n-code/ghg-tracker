import React from 'react';
import { Grid, GridColumn, Image, List } from 'semantic-ui-react';

const logo = '../images/hei.png';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <footer>
          <div className="footer">
            <footer>
              <div className="ui container">
                <Grid columns={2}>
                  <GridColumn className="inverted">
                    <hr />
                    <List inverted>
                      <List.Item href='/#/' className="footer-text">Home</List.Item>
                      <List.Item href='/#/cumulative' className="footer-text">Cumulative Data</List.Item>
                      <List.Item href='/#/about' className="footer-text">About HEI</List.Item>
                      <List.Item href='/signup#/signup' className="footer-text">Join</List.Item>
                      <List.Item href='/#/signin' className="footer-text">Sign In</List.Item>
                      <List.Item href='/#/feedback' className="foot-text">Submit Feedback</List.Item>
                    </List>
                  </GridColumn>

                  <GridColumn>
                    <hr />
                    <List inverted>
                      <List.Item className="footer-text"><Image src={logo} size="tiny" padding={0}/></List.Item>
                      <List.Item className="footer-text"></List.Item>
                      <List.Item className="footer-text">CORPORATE HEADQUARTERS</List.Item>
                      <List.Item className="footer-text">1001 Bishop Street, Suite 2900
                        Honolulu, Hawaii 96813
                        </List.Item>
                      <List.Item className="footer-text">Telephone: (808) 543-5662</List.Item>
                    </List>
                  </GridColumn>
                </Grid>
              </div>
            </footer>
          </div>
        </footer>
    );
  }
}

export default Footer;
