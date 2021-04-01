import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Dropdown, Grid, GridColumn, Image, List, Menu } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

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
                      {this.props.currentUser === '' ? (
                          <List inverted>
                            <List.Item href='/' className="footer-text">Home</List.Item>
                            <List.Item href='/cumulative' className="footer-text">Cumulative Data</List.Item>
                            <List.Item href='/about' className="footer-text">About HEI</List.Item>
                            <List.Item href='/signup#/signup' className="footer-text">Join</List.Item>
                            <List.Item href='/signin' className="footer-text">Sign In</List.Item>
                            <List.Item href='/feedback' className="foot-text">Submit Feedback</List.Item>
                          </List>
                      ) : (
                          <List inverted>
                            <List.Item href='/' className="footer-text">Home</List.Item>
                            <List.Item href='/user-page' className="foot-text">My Data</List.Item>
                            <List.Item href='/my-vehicles' className="foot-text">My Vehicles</List.Item>
                            <List.Item href='/alt' className="foot-text">Alternative</List.Item>
                            <List.Item href='/cumulative' className="footer-text">Cumulative Data</List.Item>
                            <List.Item href='/user-data-page' className="footer-text">Transportation History</List.Item>
                            <List.Item href='/feedback' className="foot-text">Submit Feedback</List.Item>
                          </List>
                      )}
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

/** Declare the types of all properties. */
Footer.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const FooterContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Footer);

export default withRouter(FooterContainer);
