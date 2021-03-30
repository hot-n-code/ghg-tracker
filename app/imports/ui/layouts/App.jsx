import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import MyVehicles from '../pages/MyVehicles';
import ListStuff from '../pages/ListStuff';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddStuff from '../pages/AddStuff';
import AboutPage from '../pages/AboutPage';
import FeedBack from '../pages/FeedBack';
import UsersCumulativePage from '../pages/UsersCumulativePage';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import AdminUserList from '../pages/AdminUserList';
import DataAdminPage from '../pages/DataAdminPage';
import CreateUser from '../pages/CreateUser';
import UserPage from '../pages/UserPage';
import AltTransportation from '../pages/AltTransportation';
import CreateVehicle from '../pages/CreateVehicle';
import HEmore from '../pages/HEmore';
import Asbmore from '../pages/Asbmore';
import Pcmore from '../pages/Pcmore';
import UserDataPage from '../pages/UserDataPage';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/user-data-page' component={UserDataPage} />
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route path='/signout' component={Signout} />
            <Route path='/about' component={AboutPage} />
            <Route path='/hemore' component={HEmore} />
            <Route path='/asbmore' component={Asbmore} />
            <Route path='/pcmore' component={Pcmore} />
            <ProtectedRoute path='/admin-data' component={DataAdminPage} />
            <ProtectedRoute path='/admin' component={AdminUserList} />
            <Route path='/cumulative' component={UsersCumulativePage} />
            <ProtectedRoute path='/user-page/' component={UserPage} />
            <ProtectedRoute path='/alt' component={AltTransportation} />
            <ProtectedRoute path='/my-vehicles' component={MyVehicles} />
            <ProtectedRoute path='/list' component={ListStuff} />
            <ProtectedRoute path='/add' component={AddStuff} />
            <ProtectedRoute path='/create-user' component={CreateUser} />
            <ProtectedRoute path='/create-vehicle' component={CreateVehicle} />
            <ProtectedRoute path='/feedback' component={FeedBack} />
            <ProtectedRoute path='/edit/:_id' component={EditStuff} />
            <AdminProtectedRoute path='/admin' component={ListStuffAdmin} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        />
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return isLogged && isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        />
      );
    }}
  />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
