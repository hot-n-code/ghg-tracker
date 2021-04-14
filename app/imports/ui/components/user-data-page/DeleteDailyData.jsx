import React from 'react';
import swal from 'sweetalert';
import { Button, Icon, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { DailyUserData } from '../../../api/user/DailyUserDataCollection';

class DeleteDailyData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  // Handles the state of the modal (close or open)
  handleModalOpen = () => this.setState({ modalOpen: true });

  handleModalClose = () => this.setState({ modalOpen: false });

  // On successful deletion, delete data.
  delete(transportationID) {
    DailyUserData.collection.remove(transportationID, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Data deleted successfully', 'success').then(() => {
          this.handleModalClose();
          // eslint-disable-next-line no-undef
          window.location.reload();
        });
      }
    });
  }

  // Render delete modal.
  render() {
    return (
        <Modal size='tiny'
               dimmer
               closeIcon
               open={this.state.modalOpen}
               onClose={this.handleModalClose}
               onOpen={this.handleModalOpen}
               trigger={<Icon style={{ cursor: 'pointer' }} name='trash alternate outline'/>}
        >
          <Modal.Header>Delete Data</Modal.Header>
          <Modal.Content>Are you sure you want to delete selected data?</Modal.Content>
          <Modal.Actions>
            <Button icon
                    size='tiny'
                    negative
                    labelPosition='right'
                    onClick={() => this.delete(this.props.transportationID)}>
              Delete
              <Icon name='trash alternate outline'/>
            </Button>
            <Button icon
                    size='tiny'
                    labelPosition='right'
                    onClick={this.handleModalClose}>
              Cancel
              <Icon name='x'/>
            </Button>
          </Modal.Actions>
        </Modal>
    );
  }
}

DeleteDailyData.propTypes = {
  transportationID: PropTypes.string,
};

export default DeleteDailyData;
