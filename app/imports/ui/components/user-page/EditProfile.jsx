import React from 'react';
import { Loader, Modal, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import {
    AutoForm,
    ErrorsField,
    SubmitField,
    HiddenField,
    TextField,
} from 'uniforms-semantic';
import { Users } from '../../../api/user/UserCollection';
import { userUpdateMethod } from '../../../api/user/UserCollection.methods';

const bridge = new SimpleSchema2Bridge(Users.getSchema());

// Modal for editing user's profile data
class EditProfile extends React.Component {
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
        const updateData = {};
        updateData.name = data.name;
        updateData.image = data.image;
        updateData.goal = data.goal;
        updateData._id = data._id;
        userUpdateMethod.call(updateData, (error) => {
            if (error) {
                swal('Error', error.message, 'error');
            } else {
                swal('Success', 'Profile edited successfully!', 'success').then(() => {
                    this.handleModalClose();
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
        const doc = this.props.users.find(({ _id }) => _id === this.props.profileID);
        return (
            <Modal size='mini'
                   closeIcon
                   open={this.state.modalOpen}
                   onClose={this.handleModalClose}
                   onOpen={this.handleModalOpen}
                   trigger={<Button color='black'>Edit Profile</Button>}
            >
                <Modal.Header>Edit My Profile</Modal.Header>
                <Modal.Content>
                    <AutoForm schema={bridge}
                              onSubmit={data => this.submit(data)}
                              model={doc}>
                    <TextField name='name' placeholder={'Name'}/>
                     <TextField name='goal' placeholder={'My Goal'}/>
                     <TextField name='image' placeholder={'Link to Image'}/>
                     <SubmitField value='Submit'/>
                     <ErrorsField/>
                     <HiddenField name='email'/>
                    </AutoForm>
                </Modal.Content>
            </Modal>
        );
    }
}

// Require the presence of a DailyData document in the props object.
EditProfile.propTypes = {
    users: PropTypes.array.isRequired,
    profileID: PropTypes.string,
    ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components.
export default withTracker(() => {
    const subscription = Users.subscribeUser();
    return {
        users: Users.find({}).fetch(),
        ready: subscription.ready(),
    };
})(EditProfile);
