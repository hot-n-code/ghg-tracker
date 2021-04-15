import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Table, Container, Input, Header, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SmartDataTable from 'react-smart-data-table';
import { Redirect } from 'react-router-dom';
// Collection that we are accessing
import { Users } from '../../../api/user/UserCollection';
// import { UserVehicle } from '../../../api/user/UserVehicleCollection';
import 'react-smart-data-table/dist/react-smart-data-table.css';
import DeleteDailyData from '../../components/user-data-page/DeleteDailyData';

/** Renders a table containing all of the users profiles. Use <User> to render each row. */
class AdminProfileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: '',
      redirectToProfile: false,
      profileId: undefined,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // vehicles: users.vehicles
  getColumns(users) {
    return { user: users.image, name: users.name, email: users.email, goal: users.goal };
  }

  getVehicles(userVehicles) {
    return { vehicles: userVehicles.vehicles };
  }

  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      if (name === 'numResults') this.setNewData();
    });
  }

  setNewData() {
    const { data } = this.state;
    this.setState({
      data: data,
    });
  }

  onRowClick = (event, { rowData }) => {
    const profileId = Users.collection.findOne({ username: rowData.email })._id;
    this.setState({ profileId: profileId, redirectToProfile: true });
  }

  renderPage() {
    // if row has been clicked, redirect to user page
    if (this.state.redirectToProfile) {
      return <Redirect to={`/admin-profile/${this.state.profileId}/`}/>;
    }
    const {
      filterValue,
    } = this.state;
    const otherHeaders = {
      _id: {
        invisible: true,
      },
      delete: {
        text: ' ',
        sortable: false,
        filterable: false,
        transform: (value, index, row) => <DeleteDailyData transportationID={row._id}/>,
      },
    };
   return (
       <Container id="profileList-page">
         <Divider hidden/>
         <Input
             list='filter'
             placeholder='Filter results...'
             icon='search'
             type='text'
             name='filterValue'
             value={filterValue}
             onChange={this.handleOnChange}
         />
         <Table size='large' celled padded striped stackable>
           <Table.Header fullWidth>
             <Table.Row>
               <Table.HeaderCell textAlign='center'>
                 <Header>User List</Header>
               </Table.HeaderCell>
             </Table.Row>
           </Table.Header>
         </Table>
         <SmartDataTable
             data={this.props.users.map(this.getColumns) }
             name="profile-list"
             className="ui compact selectable table"
             sortable
             onRowClick={this.onRowClick}
             withToggles
             perPage={10}
             filterValue={filterValue}
             headers={otherHeaders}
             parseImg={{
               style: {
                 border: '1px solid #ddd',
                 borderRadius: '2px',
                 padding: '3px',
                 width: '100px',
                 height: '100px',
               },
               className: 'ui avatar image',
             }}
         />
         <Divider hidden/>
       </Container>
    );
  }
}

AdminProfileList.propTypes = {
  // KEEP FOR REFERENCE: stuffs: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
//  userVehicles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};
export default withTracker(() => {
  const ready = Meteor.subscribe(Users.adminPublicationName).ready();
  const users = Users.collection.find({}, { sort: { lastName: 1 } }).fetch();
 // const userVehicles = UserVehicle.collection.find({}, { sort: { owner: 1 } }).fetch();
  return {
    users,
 //   userVehicles,
    ready,
  };
})(AdminProfileList);
