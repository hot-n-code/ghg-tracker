import React from 'react';
import { Icon, Loader, Modal } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, DateField, ErrorsField, HiddenField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import { getAltTransportation, getDailyGHG } from '../utilities/DailyGHGData';

const bridge = new SimpleSchema2Bridge(DailyUserData.schema);

// Renders modal for editing daily data
class EditDailyData extends React.Component {
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
    const { inputDate, modeOfTransportation, milesTraveled, _id } = data;
    const dailyGHG = getDailyGHG(milesTraveled, modeOfTransportation, this.props.vehicles);
    const cO2Reduced = dailyGHG.cO2Reduced;
    const fuelSaved = dailyGHG.fuelSaved;
    DailyUserData.collection.update(_id, { $set: { inputDate, modeOfTransportation, milesTraveled, cO2Reduced, fuelSaved } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Data edited successfully', 'success').then(() => {
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
    const doc = this.props.dailies.find(({ _id }) => _id === this.props.transportationID);
    return (
        <Modal size='mini'
               closeIcon
               open={this.state.modalOpen}
               onClose={this.handleModalClose}
               onOpen={this.handleModalOpen}
               trigger={<Icon style={{ cursor: 'pointer' }} name='edit outline'/>}
        >
          <Modal.Header>Edit Data</Modal.Header>
          <Modal.Content>
            <AutoForm schema={bridge}
                      onSubmit={data => this.submit(data)}
                      model={doc}>
              <DateField name='inputDate'
                         max={new Date(Date.now())}/>
              <SelectField name='modeOfTransportation'
                           allowedValues={this.props.vehicles.map((vehicle) => `${vehicle.make} ${vehicle.model}`).concat(getAltTransportation())}/>
              <NumField name='milesTraveled'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='cO2Reduced'/>
              <HiddenField name='fuelSaved'/>
              <HiddenField name='owner'/>
            </AutoForm>
          </Modal.Content>
        </Modal>
    );
  }
}

// Require the presence of a DailyData document in the props object.
EditDailyData.propTypes = {
  transportationID: PropTypes.string,
  dailies: PropTypes.array.isRequired,
  model: PropTypes.object,
  vehicles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components.
export default withTracker(() => {
  const subscription = Meteor.subscribe(DailyUserData.userPublicationName);
  const subscription2 = Meteor.subscribe(Vehicle.userPublicationName);
  const email = Meteor.user().username;
  return {
    vehicles: Vehicle.collection.find({ owner: email }).fetch(),
    dailies: DailyUserData.collection.find({ owner: email }).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(EditDailyData);
