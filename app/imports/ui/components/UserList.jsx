import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DeleteUser from './DeleteUser';
import EditUserAdmin from './EditUserAdmin';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserList extends React.Component {
  render() {
    console.log(this.props.list.password);

    return (
        <Table.Row>
          <Table.Cell>{this.props.list.name}</Table.Cell>
          <Table.Cell>{this.props.list.email}</Table.Cell>
          <Table.Cell>{this.props.list.password}</Table.Cell>
          <Table.Cell>
            <EditUserAdmin userID={this.props.list._id}/>
            <DeleteUser userID={this.props.list._id}/>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
UserList.propTypes = {
  list: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default (UserList);
