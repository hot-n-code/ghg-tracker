import React from 'react';
import { Loader, Table, Container, Input, Header, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SmartDataTable from 'react-smart-data-table';
import { Users } from '../../../api/user/UserCollection';
import 'react-smart-data-table/dist/react-smart-data-table.css';
import DeleteUser from '../../components/admin-users-page/DeleteUser';

/** Renders a table containing all of the users profiles. Use <User> to render each row. */
class AdminProfileList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // vehicles: users.vehicles
  getColumns(users) {
    return { _id: users._id, user: users.image, name: users.name, email: users.email, goal: users.goal };
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

  renderPage() {
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
        transform: (value, index, row) => <div>
          <DeleteUser userID={row._id}/>
        </div>,
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
             className="ui compact table"
             sortable
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
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};
export default withTracker(() => {
  const ready = Users.subscribeUserAdmin().ready();
  const users = Users.find({}, { sort: { lastName: 1 } }).fetch();
  return {
    users,
    ready,
  };
})(AdminProfileList);
