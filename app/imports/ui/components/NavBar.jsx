import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

const cornerLogo = '../images/Logo.png';
/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  contextRef = createRef()

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const menuStyle = { background: '#4abdac' };
    const menuItem = { bottom: '28px' };
    const menuItem2 = { bottom: '14px' };
    return (
        <div>
        <Menu pointing secondary stackable borderless attached='top' style={menuStyle}>
        <Menu.Item as={NavLink} activeClassName='' exact to='/'>
          <Image src={cornerLogo} size='small' padding={0} />
        </Menu.Item>
        {this.props.currentUser && Roles.userIsInRole(Meteor.userId(), 'admin') === false ? (
            // eslint-disable-next-line react/jsx-key
            [
              <Menu.Item style={menuItem} as={NavLink} activeClassName='active' exact to='/user-page' key='user-page' onClick={this.handleItemClick}>Profile</Menu.Item>,
              <Menu.Item style={menuItem} as={NavLink} activeClassName='active' exact to='/my-vehicles' key='my-vehicles' onClick={this.handleItemClick}>Vehicles</Menu.Item>,
              <Menu.Item style={menuItem} as={NavLink} activeClassName='active' exact to='/user-react-page' key='user-react-page' onClick={this.handleItemClick}>Transportation History</Menu.Item>,
              <Menu.Item style={menuItem} as={NavLink} activeClassName='active' exact to='/cumulative' key='cumulative' onClick={this.handleItemClick}>Cumulative Data</Menu.Item>,
            ]
        ) : ''}
          {this.props.currentUser && Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [<Menu.Item style={menuItem} as={NavLink} activeClassName='active' exact to='/admin' key='admin' onClick={this.handleItemClick}>User List</Menu.Item>,
            <Menu.Item style={menuItem} as={NavLink} activeClassName='active' exact to='/cumulative' key='cumulative' onClick={this.handleItemClick}>Cumulative Data</Menu.Item>]
          ) : ''}
          <Menu.Item position='right'>
            <Menu.Item>
            {this.props.currentUser === '' ? (
                <Menu pointing secondary borderless stackable style={menuStyle}>
                  <Menu.Item as={NavLink} activeClassName='active' exact to='/cumulative' key='cumulative' onClick={this.handleItemClick}>CUMULATIVE DATA</Menu.Item>
                  <Menu.Item as={NavLink} activeClassName='active' exact to='/about' key='about' onClick={this.handleItemClick}>ABOUT HEI</Menu.Item>
                  <Menu.Item id='login-dropdown-sign-up' name='Join' as={NavLink} exact to='/signup' content='JOIN' onClick={this.handleItemClick}/>
                  <Menu.Item id='login-dropdown-sign-in' name='Signin' as={NavLink} exact to='/signin' content='SIGN IN' onClick={this.handleItemClick}/>
                </Menu>
            ) : (
                <Dropdown style={menuItem2} id='navbar-current-user' text={this.props.currentUser} pointing='top right' icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item id='navbar-sign-out' icon='sign out' text='Sign Out' as={NavLink} exact to='/signout'/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu.Item>
        </Menu>
        </div>
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
