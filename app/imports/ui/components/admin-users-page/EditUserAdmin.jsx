import React from 'react';
import { Loader, Modal, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SubmitField, HiddenField, TextField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import { Users } from '../../../api/user/UserCollection';

const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: String,
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

// Modal for editing a user
class EditUserAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  // Handles the state of the modal (close or open)
  handleModalOpen = () => this.setState({ modalOpen: true });

  handleModalClose = () => this.setState({ modalOpen: false });

  // On successful submit, update data.
  submit(data) {
    const name = `${data.firstName} ${data.lastName}`;
    const { email, _id } = data;
    Users.collection.update(_id, { $set: { name, email } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'User edited successfully!', 'success').then(() => {
          this.handleModalClose();
          // eslint-disable-next-line no-undef
          window.location.reload();
        });
      }
    });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderModal() : <Loader active>Getting your data</Loader>;
  }

  // Render the form.
  renderModal() {
    const doc = this.props.users.find(({ _id }) => _id === this.props.userID);
    return (
        <Modal size='mini'
               closeIcon
               open={this.state.modalOpen}
               onClose={this.handleModalClose}
               onOpen={this.handleModalOpen}
               trigger={<Icon style={{ cursor: 'pointer' }} name='edit outline'/>}
        >
          <Modal.Header>Edit User</Modal.Header>
          <Modal.Content>
            <AutoForm schema={bridge}
                      onSubmit={data => this.submit(data)}
                      model={doc}>
              <TextField name='firstName' placeholder={'First Name'}/>
              <TextField name='lastName' placeholder={'Last Name'}/>
              <TextField name='email' placeholder={'Email'}/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='email'/>
              <HiddenField name='vehicles'/>
            </AutoForm>
          </Modal.Content>
        </Modal>
    );
  }
}

// Require the presence of a User document in the props object.
EditUserAdmin.propTypes = {
  users: PropTypes.array.isRequired,
  userID: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components.
export default withTracker(() => {
  const subscription = Meteor.subscribe(Users.adminPublicationName);
  return {
    users: Users.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(EditUserAdmin);
