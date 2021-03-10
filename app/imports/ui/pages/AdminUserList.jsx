import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Input, Container, Table, Button, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/UserCollection';

const paddingStyle = { padding: 20 };
class AdminUserList extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <div className='background-all'>
        <div style={paddingStyle}>
        <Container>
          <Input fluid icon='search' placeholder='Search...'>
          </Input>
          <br/>
          <br/>
            <Table className="ui single line table">
              <thead>
              <tr>
                <th>Name</th>
                <th>E-mail address</th>
                <th>Edit</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email}</td>
                <td>
                  <Button className="ui green button">Edit</Button>
                  <Button className="ui red button">Remove</Button>
                </td>
              </tr>
              </tbody>
            </Table>
        </Container>
        </div>
        </div>
    );
  }
}
/** Require an array of Vehicle documents in the props. */
AdminUserList.propTypes = {
  user: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const sub1 = Meteor.subscribe(Users.userPublicationName);
  return {
    user: Users.collection.find({}).fetch(),
    ready: sub1.ready(),
  };
})(AdminUserList);
