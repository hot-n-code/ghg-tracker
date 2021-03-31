import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, DateField, ErrorsField, NumField, RadioField, SelectField, SubmitField } from 'uniforms-semantic';
import { Button, Form, Header, Loader, Modal } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import { getDailyGHG, getMilesTraveled } from '../utilities/DailyGHGData';
import { altTransportation } from '../utilities/GlobalVariables';

// Initializes a schema that specifies the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  inputDate: Date,
  modeOfTransportation: String,
  distanceTraveled: Number,
  unit: {
    type: String,
    allowedValues: ['mi', 'km'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

// Renders modal for inputting daily data
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

  // On submit, insert data.
  submit(data, formRef) {
    const { inputDate, modeOfTransportation, distanceTraveled, unit } = data;
    const milesTraveled = getMilesTraveled(distanceTraveled, unit).toFixed(2);
    const dailyGHG = getDailyGHG(milesTraveled, modeOfTransportation, this.props.vehicles);
    const cO2Reduced = dailyGHG.cO2Reduced;
    const fuelSaved = dailyGHG.fuelSaved;
    const owner = Meteor.user().username;
    DailyUserData.collection.insert({ owner, inputDate, modeOfTransportation, milesTraveled, cO2Reduced, fuelSaved }, (error) => {
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

  // Render the form.
  renderModal() {
    let formRef = null;
    const today = new Date();
    today.setHours(11, 59, 59, 99);

    return (
      <Modal size='tiny'
             closeIcon
             open={this.state.modalOpen}
             onClose={this.handleModalClose}
             onOpen={this.handleModalOpen}
             trigger={<Button>Add Data</Button>}
      >
        <Modal.Header>Add Transportation Data</Modal.Header>
        <Modal.Content>
          <AutoForm ref={ref => { formRef = ref; }}
                    schema={bridge}
                    onSubmit={data => { this.submit(data, formRef); }}>
            <DateField name='inputDate'
                       max={today}/>
            <SelectField name='modeOfTransportation'
                         allowedValues={this.props.vehicles.map((vehicle) => `${vehicle.make} ${vehicle.model}`).concat(altTransportation)}/>
            <Form.Group inline>
              <NumField name='distanceTraveled'/>
              <RadioField label={null} name='unit'/>
            </Form.Group>
            <Header>
              <Header.Subheader><b>Note:</b> For &apos;<i>Telework</i>&apos;, key in the distance (roundtrip) between home and workplace.</Header.Subheader>
            </Header>
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

// withTracker connects Meteor data to React components.
export default withTracker(() => {
  const subscription = Meteor.subscribe(Vehicle.userPublicationName);
  return {
    vehicles: Vehicle.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AddDailyData);
