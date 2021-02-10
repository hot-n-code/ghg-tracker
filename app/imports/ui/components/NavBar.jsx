import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

const cornerLogo = '../images/hei.png';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginRight: '0px' };
    return (
      <Menu style={menuStyle} attached="top" borderless stackable>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image src={cornerLogo} size="small" padding={0}/>
        </Menu.Item>
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>My Vehicles</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/userPage" key='about'>MY DATA</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List Stuff</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/feedback" key='add'>Feedback</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} activeClassName="active" exact to="/admindata" key='admin'>Cumulative Data(Admin)</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
              <Menu.Item position="right"> {/* zero padding!!! */}
                <Menu secondary stackable id="right-nav-bar">
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/cumulative" key='cumulative' >CUMULATIVE<br />
                  DATA <br />
                  </Menu.Item>
                  <Menu.Item as={NavLink} activeClassName="active" exact to="/about" key='about'>ABOUT HEI</Menu.Item>
                  <Menu.Item id="login-dropdown-sign-up" name='Join' as={NavLink} exact to="/signup" content='JOIN'/>
                  <Menu.Item id="login-dropdown-sign-in" name='Signin' as={NavLink} exact to="/signin" content='SIGN IN'/>
                </Menu>
              </Menu.Item>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
