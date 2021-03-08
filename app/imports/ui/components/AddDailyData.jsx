import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { Button, Loader, Modal } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';

// Initializes a schema that specifies the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  inputDate: Date,
  modeOfTransportation: String,
  milesTraveled: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const altTransportation = ['Biking', 'Carpool', 'Public Transportation', 'Telework', 'Walking'];

// Renders the Page for inputting daily data
class AddDailyData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  // Handles the state of the modal (close or open)
  handleModalOpen = () => this.setState({ modalOpen: true });

  handleModalClose = () => this.setState({ modalOpen: false });

  // Computes Reduced CO2
  // Put in an exported function
  computeCO2Reduced(milesTraveled, modeOfTransportation) {
    const autoMPG = altTransportation.includes(modeOfTransportation) ?
        (_.max(this.props.vehicles, (vehicle) => vehicle.MPG)).MPG :
        _.find(this.props.vehicles, (vehicle) => vehicle.make === modeOfTransportation).MPG * -1;
    return ((milesTraveled / autoMPG) * 19.6).toFixed(2);
  }

  // On submit, insert data.
  submit(data, formRef) {
    const { inputDate, modeOfTransportation, milesTraveled } = data;
    const cO2Reduced = this.computeCO2Reduced(milesTraveled, modeOfTransportation);
    const owner = Meteor.user().username;
    DailyUserData.collection.define({ owner, inputDate, modeOfTransportation, milesTraveled, cO2Reduced }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Data added successfully', 'success').then(() => {
          this.handleModalClose();
          formRef.reset();
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

  // Render the form. Uses Uniforms: https://github.com/vazco/uniforms
  renderModal() {
    let formRef = null;
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
          <AutoForm ref={ref => { formRef = ref; }}
                    schema={bridge}
                    onSubmit={data => { this.submit(data, formRef); }}>
            <DateField name='inputDate' max={new Date(Date.now())}/>
            <SelectField name='modeOfTransportation'
                         allowedValues={_.pluck(this.props.vehicles, 'make').concat(altTransportation)}/>
            <NumField name='milesTraveled'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </AutoForm>
        </Modal.Content>
      </Modal>
    );
  }
}

// Require a document to be passed to this component.
AddDailyData.propTypes = {
  vehicles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Meteor.subscribe(Vehicle.userPublicationName);
  const email = Meteor.user().username;
  return {
    vehicles: Vehicle.collection.find({ owner: email }).fetch(),
    ready: subscription.ready(),
  };
})(AddDailyData);
