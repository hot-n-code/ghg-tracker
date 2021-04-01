import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Table, Container, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Users } from '../../../api/user/UserCollection';
import UserList from '../../components/admin-users-page/UserList';

const paddingStyle = { padding: 20 };
class AdminUserList extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const test = this.props.doc;
    return (
        <div className='background-all'>
          <div style={paddingStyle}>
            <Container>
              <Input fluid icon='search' placeholder='Search...'/>
              <br/>
              <br/>
              <Table>
                <Table.Header>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>E-mail address</Table.HeaderCell>
                  <Table.HeaderCell>Password</Table.HeaderCell>
                  <Table.HeaderCell/>
                </Table.Header>
                <Table.Body>
                    {_.map(test, (list, index) => (
                          <UserList key={index} list={list} />
                    ))}
                </Table.Body>
              </Table>
            </Container>
          </div>
        </div>
    );
  }
}

AdminUserList.propTypes = {
  // KEEP FOR REFERENCE: stuffs: PropTypes.array.isRequired,
  doc: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(Users.adminPublicationName);
  return {
    doc: Users.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AdminUserList);
