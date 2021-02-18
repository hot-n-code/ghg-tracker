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
    const menuStyle = { background: '#5c8d89' };
    const menuItem = { bottom: '28px' };
    const menuItem2 = { bottom: '14px' };
    return (
        <div>
        <Menu pointing secondary stackable borderless attached='top' style={menuStyle}>
        <Menu.Item as={NavLink} activeClassName='' exact to='/'>
          <Image src={cornerLogo} size='small' padding={0} />
        </Menu.Item>
<<<<<<< Updated upstream
        {this.props.currentUser && !Roles.userIsInRole(Meteor.userId(), 'admin')
          ? [
              <Menu.Item
                as={NavLink}
                activeClassName='active'
                exact
                to='/my-vehicles'
                key='my-vehicles'
              >
                My Vehicles
              </Menu.Item>,
              <Menu.Item
                as={NavLink}
                activeClassName='active'
                exact
                to='/user-page'
                key='user-page'
              >
                My Data
              </Menu.Item>,
              <Menu.Item
                as={NavLink}
                activeClassName='active'
                exact
                to='/input-daily-data'
                key='input-daily-data'
              >
                Input Data
              </Menu.Item>,
              <Menu.Item
                  as={NavLink}
                  activeClassName='active'
                  exact
                  to='/alt'
                  key='alt'
              >
                Alternative Transportation
              </Menu.Item>,
              <Menu.Item
                as={NavLink}
                activeClassName='active'
                exact
                to='/feedback'
                key='feedback'
              >
                Feedback
              </Menu.Item>,
=======
        {this.props.currentUser && Roles.userIsInRole(Meteor.userId(), 'admin') === false ? (
            // eslint-disable-next-line react/jsx-key
            [
              <Menu.Item header='h1' style={menuItem} as={NavLink} activeClassName='active' exact to='/my-vehicles' key='my-vehicles' onClick={this.handleItemClick}>My Vehicles</Menu.Item>,
              <Menu.Item header='h1' style={menuItem} as={NavLink} activeClassName='active' exact to='/userPage' key='about' onClick={this.handleItemClick}>My Data</Menu.Item>,
              <Menu.Item header='h1' style={menuItem} as={NavLink} activeClassName='active' exact to='/inputdailydata' key='inputdailydata' onClick={this.handleItemClick}>Input Data</Menu.Item>,
              <Menu.Item header='h1' style={menuItem} as={NavLink} activeClassName='active' exact to='/alt' key='alt' onClick={this.handleItemClick}>Alternative Transportation</Menu.Item>,
              <Menu.Item header='h1' style={menuItem} as={NavLink} activeClassName='active' exact to='/feedback' key='add' onClick={this.handleItemClick}>Feedback</Menu.Item>,
>>>>>>> Stashed changes
            ]
        ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [<Menu.Item header='h1' as={NavLink} activeClassName='active' exact to='/admin' key='admin' onClick={this.handleItemClick}>User List</Menu.Item>,
           <Menu.Item header='h1' as={NavLink} activeClassName='active' exact to='/admindata' key='admin'> Admin onClick={this.handleItemClick}Cumulative Data</Menu.Item>]
          ) : ''}
          <Menu.Item position='right'>
          <Menu.Item>
            {this.props.currentUser === '' ? (
                <Menu pointing secondary borderless stackable style={menuStyle}>
                  <Menu.Item header='h1' as={NavLink} activeClassName='active' exact to='/cumulative' key='cumulative' onClick={this.handleItemClick}>CUMULATIVE DATA</Menu.Item>
                  <Menu.Item header='h1' as={NavLink} activeClassName='active' exact to='/about' key='about' onClick={this.handleItemClick}>ABOUT HEI</Menu.Item>
                  <Menu.Item header='h1' id='login-dropdown-sign-up' name='Join' as={NavLink} exact to='/signup' content='JOIN' onClick={this.handleItemClick}/>
                  <Menu.Item header='h1' id='login-dropdown-sign-in' name='Signin' as={NavLink} exact to='/signin' content='SIGN IN' onClick={this.handleItemClick}/>
                </Menu>
            ) : (
                <Dropdown style={menuItem2} header='h1' id='navbar-current-user' text={this.props.currentUser} pointing='top right' icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item header='h1' id='navbar-sign-out' icon='sign out' text='Sign Out' as={NavLink} exact to='/signout'/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
<<<<<<< Updated upstream
        ) : (
          ''
        )}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item
            as={NavLink}
            activeClassName='active'
            exact
            to='/admin-data'
            key='admin-data'> Admin
            <br />
            Cumulative Data
=======
>>>>>>> Stashed changes
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
