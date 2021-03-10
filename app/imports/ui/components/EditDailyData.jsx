import React from 'react';
import { Button, Loader, Modal } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, DateField, ErrorsField, HiddenField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';

const bridge = new SimpleSchema2Bridge(DailyUserData.schema);

const altTransportation = ['Alternative Fuel Vehicle', 'Biking', 'Carpool', 'Electric Vehicle', 'Public Transportation', 'Telework', 'Walking'];

/** Renders the Page for editing daily data */
class EditDailyData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  /** Handles the state of the modal (close or open) */
  handleModalOpen = () => this.setState({ modalOpen: true });

  handleModalClose = () => this.setState({ modalOpen: false });

  /** Compute Reduced CO2 */
  computeCO2Reduced(milesTraveled, modeOfTransportation) {
    const email = Meteor.user().username;
    let autoMPG;
    let cO2Reduced;
    if (altTransportation.includes(modeOfTransportation)) {
      autoMPG = Vehicle.collection.findOne({ owner: email }).MPG;
      cO2Reduced = (milesTraveled / autoMPG) * 19.6;
    } else {
      autoMPG = Vehicle.collection.findOne({ owner: email, make: modeOfTransportation }).MPG;
      cO2Reduced = (milesTraveled / autoMPG) * -19.6;
    }
    return cO2Reduced.toFixed(2);
  }

  /** Get modeOfTransportation Options */
  getModeOfTransportation() {
    const email = Meteor.user().username;
    const userVehicles = [];
    Vehicle.collection.find({ owner: email }).forEach(
        function (vehicle) {
          userVehicles.push(vehicle.make);
        },
    );
    return userVehicles.concat(altTransportation);
  }

  /** On successful submit, update data. */
  submit(data) {
    const { inputDate, modeOfTransportation, milesTraveled, _id } = data;
    const cO2Reduced = this.computeCO2Reduced(milesTraveled, modeOfTransportation);
    DailyUserData.collection.update(_id, { $set: { inputDate, modeOfTransportation, milesTraveled, cO2Reduced } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Data updated successfully', 'success');
        this.handleModalClose();
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting your data</Loader>;
  }

  /** Render the form. Uses Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Modal size='mini'
               closeIcon
               open={this.state.modalOpen}
               onClose={this.handleModalClose}
               onOpen={this.handleModalOpen}
               trigger={<Button>Edit</Button>}
        >
          <Modal.Header>Edit Data</Modal.Header>
          <Modal.Content>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <DateField name='inputDate' max={new Date(Date.now())}/>
              <SelectField name='modeOfTransportation' allowedValues={this.getModeOfTransportation()}/>
              <NumField name='milesTraveled'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='cO2Reduced'/>
              <HiddenField name='owner'/>
            </AutoForm>
          </Modal.Content>
        </Modal>
    );
  }
}

/** Require the presence of a DailyData document in the props object. Uniforms adds 'model' to the props, which we use. */
EditDailyData.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing : _id.
  const documentId = match.params._id;
  // Get access to Edit data.
  const subscription = Meteor.subscribe(DailyUserData.userPublicationName);
  return {
    doc: DailyUserData.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditDailyData);
