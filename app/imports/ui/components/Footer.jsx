import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import { Grid, GridColumn, Image, List } from 'semantic-ui-react';
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
                  <GridColumn className="inverted" verticalAlign='middle'>
                      {(this.props.currentUser === '' ||
                          (this.props.currentUser
                          && Roles.userIsInRole(Meteor.userId(), 'admin'))) ? (
                          <List inverted>
                            <List.Item as={NavLink} activeClassName='' exact to='/'>Home</List.Item>
                            <List.Item as={NavLink} activeClassName='active' exact to='/cumulative'>Cumulative Data</List.Item>
                            <List.Item as={NavLink} activeClassName='active' exact to='/about'>About HEI</List.Item>
                            <List.Item as={NavLink} exact to='/signup'>Join</List.Item>
                            <List.Item as={NavLink} exact to='/signin'>Sign In</List.Item>
                          </List>
                      ) : (
                          <List inverted>
                            <List.Item as={NavLink} activeClassName='' exact to='/'>Home</List.Item>
                            <List.Item as={NavLink} activeClassName='active' exact to='/user-page' >My Data</List.Item>
                            <List.Item as={NavLink} activeClassName='active' exact to='/my-vehicles'>My Vehicles</List.Item>
                            <List.Item as={NavLink} activeClassName='active' exact to='/user-react-page'>Transportation History</List.Item>
                            <List.Item as={NavLink} activeClassName='active' exact to='/cumulative'>Cumulative Data</List.Item>
                            <List.Item as={NavLink} activeClassName='active' exact to='/about'>About HEI</List.Item>
                          </List>
                      )}
                  </GridColumn>
                  <GridColumn verticalAlign='middle'>
                    <List inverted>
                      <List.Item className="footer-text"><Image src={logo} size="tiny" padding={0}/></List.Item>
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
