import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { Button, Loader, Modal } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  inputDate: Date,
  modeOfTransportation: String,
  milesTraveled: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const altTransportation = ['Alternative Fuel Vehicle', 'Biking', 'Carpool', 'Electric Vehicle', 'Public Transportation', 'Telework', 'Walking'];

/** Renders the Page for inputting daily data */
class AddDailyData extends React.Component {
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

  /** On submit, insert data. */
  submit(data, formRef) {
    const { inputDate, modeOfTransportation, milesTraveled } = data;
    const owner = Meteor.user().username;
    const cO2Reduced = this.computeCO2Reduced(milesTraveled, modeOfTransportation);
    DailyUserData.collection.insert({ inputDate, modeOfTransportation, milesTraveled, owner, cO2Reduced }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Data added successfully', 'success');
        this.handleModalClose();
        formRef.reset();
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderModal() : <Loader active>Getting your data</Loader>;
  }

  /** Render the form. Uses Uniforms: https://github.com/vazco/uniforms */
  renderModal() {
    let fRef = null;
    return (
      <Modal size='mini'
             closeIcon
             open={this.state.modalOpen}
             onClose={this.handleModalClose}
             onOpen={this.handleModalOpen}
             trigger={<Button>Add Data</Button>}
      >
        <Modal.Header>Add Daily Data</Modal.Header>
        <Modal.Content>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge}
                    onSubmit={data => { this.submit(data, fRef); }}>
            <DateField name='inputDate' max={new Date(Date.now())}/>
            <SelectField name='modeOfTransportation' allowedValues={this.getModeOfTransportation()}/>
            <NumField name='milesTraveled'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </AutoForm>
        </Modal.Content>
      </Modal>
    );
  }
}

AddDailyData.propTypes = {
  ready: PropTypes.object,
};

export default withTracker(() => {
  const vehicles = Meteor.subscribe(Vehicle.userPublicationName);
  return {
    ready: vehicles.ready(),
  };
})(AddDailyData);
