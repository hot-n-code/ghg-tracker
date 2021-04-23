import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import { Divider, Form, Icon, Loader, Modal } from 'semantic-ui-react';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, BoolField, DateField, ErrorsField, SelectField, SubmitField } from 'uniforms-semantic';
import { UserSavedDistances } from '../../../api/user/UserSavedDistanceCollection';
import { getDateToday, getKilometersTraveled, getMilesTraveled, getModeType } from '../../utilities/DailyGHGData';
import { UserDailyData } from '../../../api/user/UserDailyDataCollection';
import { altSelectFieldOptions } from '../../utilities/GlobalVariables';
import { userDailyDataUpdateMethod } from '../../../api/user/UserDailyDataCollection.methods';

const EditDailyData = (props) => {
  const doc = props.dailies.find(({ _id }) => _id === props.transportationID);

  const [modalOpen, setModalOpen] = useState(false);
  const [distance, setDistance] = useState(doc.milesTraveled);
  const [unit, setUnit] = useState('mi');
  const [distanceForm, setDistanceForm] = useState(true);
  const [labelDistance, setLabelDistance] = useState(false);

  const handleModalOpen = () => setModalOpen(true);

  const handleModalClose = () => {
    setModalOpen(false);
    setDistance(doc.milesTraveled);
    setUnit('mi');
    setDistanceForm(true);
    setLabelDistance(false);
  };

  const formSchema = new SimpleSchema({
    inputDate: Date,
    modeOfTransportation: String,
    roundtrip: {
      type: Boolean,
      optional: true,
    },
  });

  const getSavedDistances = () => {
    const choices = [];
    props.savedDistances.forEach(function (savedDistance) {
      choices.push({
        key: choices.length + 1,
        text: savedDistance.location,
        value: savedDistance._id,
      });
    });

    choices.push({
      key: choices.length + 1,
      text: 'Other',
      value: 'other',
    });

    return choices;
  };

  const handleSavedDistance = (e, { value }) => {
    if (value === 'other') {
      setDistance(doc.milesTraveled);
      setDistanceForm(true);
      setLabelDistance(false);
    } else {
      const savedDistance = props.savedDistances.find(({ _id }) => _id === value);
      setDistance(savedDistance.distanceMiles);
      setDistanceForm(false);
      setLabelDistance(true);
    }
    setUnit('mi');
  };

  const handleLabelDistance = () => (labelDistance ?
      <div>
        <Divider/>
        <b>Distance traveled</b> (one-way): {distance} {unit} ({getKilometersTraveled(distance, 'mi').toFixed(2)} km)
      </div> :
      null);

  const handleDistance = (e, { value }) => setDistance(value);

  const handleUnit = (e, { value }) => setUnit(value);

  const handleDistanceForm = () => (distanceForm ?
          <div>
            <Divider/>
            For &apos;<i>Telework</i>&apos;, key in the distance between home and workplace.
            <Form.Group inline>
              <Form.Input label='Distance traveled'
                          value={distance}
                          type='number'
                          required
                          onChange={handleDistance}
              />
              <Form.Radio label='mi'
                          value='mi'
                          checked={unit === 'mi'}
                          onChange={handleUnit}
              />
              <Form.Radio label='km'
                          value='km'
                          checked={unit === 'km'}
                          onChange={handleUnit}
              />
            </Form.Group>
          </div> :
          null
  );

  const handleSubmit = (data) => {
    const updateData = {};
    updateData.inputDate = data.inputDate;
    updateData.modeOfTransportation = data.modeOfTransportation;
    updateData._id = data._id;
    updateData.milesTraveled = (unit === 'mi') ? distance :
        getMilesTraveled(distance, unit).toFixed(2);
    if (data.roundtrip) {
      updateData.milesTraveled *= 2;
    }
    updateData.modeType = getModeType(updateData.modeOfTransportation, props.vehicles);
    userDailyDataUpdateMethod.call(updateData, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Data edited successfully', 'success').then(() => handleModalClose())));
  };

  const bridge = new SimpleSchema2Bridge(formSchema);

  return props.ready ? (
      <Modal size='tiny'
             closeIcon
             open={modalOpen}
             onClose={handleModalClose}
             onOpen={handleModalOpen}
             trigger={<Icon style={{ cursor: 'pointer' }} name='edit outline'/>}
             style = {{ fontSize: '13px' }}
             as={AutoForm}
             schema={bridge}
             onSubmit={data => handleSubmit(data)}
             model={doc}
      >
        <Modal.Header>Edit Daily Data</Modal.Header>
        <Modal.Content>
          <DateField name='inputDate'
                     max={getDateToday()}/>
          <SelectField name='modeOfTransportation'
                       allowedValues={props.vehicles.map((vehicle) => `${vehicle.name}`).concat(altSelectFieldOptions)}
          />
          <Form.Group inline>
            <Form.Select label='Destination'
                         options={getSavedDistances()}
                         onChange={handleSavedDistance}
                         placeholder='Destination'
                         required
                         defaultValue='other'
            />
            <BoolField name='roundtrip' label='roundtrip?'/>
          </Form.Group>
          {handleLabelDistance()}
          {handleDistanceForm()}
          <ErrorsField/>
        </Modal.Content>
        <Modal.Actions>
          <SubmitField value='Submit'/>
        </Modal.Actions>
      </Modal>
  ) : <Loader active>Getting data</Loader>;
};

EditDailyData.propTypes = {
  transportationID: PropTypes.string,
  dailies: PropTypes.array.isRequired,
  model: PropTypes.object,
  vehicles: PropTypes.array.isRequired,
  owner: PropTypes.string.isRequired,
  savedDistances: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const ready = UserSavedDistances.subscribeUserSavedDistance().ready()
      && UserDailyData.subscribeUserDailyData().ready();
  const savedDistances = UserSavedDistances.find({}).fetch();
  const dailies = UserDailyData.find({}).fetch();
  const owner = Meteor.user().username;
  return {
    owner,
    dailies,
    savedDistances,
    ready,
  };
})(EditDailyData);
