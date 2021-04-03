import React from 'react';
import { Form, Header, Icon, Loader, Modal } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import {
  AutoForm,
  DateField,
  ErrorsField,
  HiddenField,
  NumField,
  RadioField,
  SelectField,
  SubmitField,
} from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import { DailyUserData } from '../../../api/user/ghg-data/DailyUserDataCollection';
import { UserVehicle } from '../../../api/user/UserVehicleCollection';
import { getDailyGHG, getMilesTraveled, getDateToday } from '../../utilities/DailyGHGData';
import { altSelectFieldOptions } from '../../utilities/GlobalVariables';

// Initializes a schema that specifies the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  inputDate: Date,
  modeOfTransportation: String,
  milesTraveled: Number,
  unit: {
    type: String,
    allowedValues: ['mi', 'km'],
    defaultValue: 'mi',
  },
  cO2Reduced: Number,
  fuelSaved: Number,
  owner: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

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
    const { inputDate, modeOfTransportation, unit, _id } = data;
    const milesTraveled = getMilesTraveled(data.milesTraveled, unit).toFixed(2);
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
        <Modal size='tiny'
               closeIcon
               open={this.state.modalOpen}
               onClose={this.handleModalClose}
               onOpen={this.handleModalOpen}
               trigger={<Icon style={{ cursor: 'pointer' }} name='edit outline'/>}
        >
          <Modal.Header>Edit Transportation Data</Modal.Header>
          <Modal.Content>
            <AutoForm schema={bridge}
                      onSubmit={data => this.submit(data)}
                      model={doc}>
              <DateField name='inputDate'
                         max={getDateToday()}/>
              <SelectField name='modeOfTransportation'
                           allowedValues={this.props.vehicles.map((vehicle) => `${vehicle.make} ${vehicle.model}`).concat(altSelectFieldOptions)}/>
              <Form.Group inline>
                <NumField decimal label='Distance Traveled' name='milesTraveled'/>
                <RadioField label={null} name='unit'/>
              </Form.Group>
              <Header>
                <Header.Subheader><b>Note:</b> For &apos;<i>Telework</i>&apos;, key in the distance (roundtrip) between home and workplace.</Header.Subheader>
              </Header>
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
  const subscription2 = Meteor.subscribe(UserVehicle.userPublicationName);
  return {
    vehicles: UserVehicle.collection.find({}).fetch(),
    dailies: DailyUserData.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(EditDailyData);
