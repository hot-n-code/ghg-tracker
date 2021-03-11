import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Loader, Table, Container, Input } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Users } from '../../api/user/UserCollection';
import UserList from '../components/UserList';

const paddingStyle = { padding: 20 };
class AdminUserList extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    console.log(this.props.doc);
    return (
        <div className='background-all'>
          <div style={paddingStyle}>
            <Container>
              <Input fluid icon='search' placeholder='Search...'/>
              <br/>
              <br/>
              <Table>
                <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>E-mail address</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.doc.map((list) => <UserList key={list._id} list={list}/>)}
                  <Table.Row>
                    <Button className="ui green button">Edit</Button>
                    <Button className="ui red button">Remove</Button>
                  </Table.Row>
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
