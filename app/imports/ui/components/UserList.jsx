import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserList extends React.Component {
  render() {
    console.log(this.props.data);
    return (
        <Table.Row>
          <Table.Cell>{this.props.data.name}</Table.Cell>
          <Table.Cell>{this.props.data.email}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
UserList.propTypes = {
  data: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default (UserList);
