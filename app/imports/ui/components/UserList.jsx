import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { Users } from '../../api/user/UserCollection';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserList extends React.Component {
  render() {
    console.log(this.props.list.email);

    return (
        <Table.Row>
          <Table.Cell>{this.props.list.name}</Table.Cell>
          <Table.Cell>{this.props.list.email}</Table.Cell>
          <Table.Cell>{this.props.list.password}</Table.Cell>
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
