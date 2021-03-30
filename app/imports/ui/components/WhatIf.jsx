import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { Button, Modal } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import { getAltTransportation, getDailyGHG } from '../utilities/DailyGHGData';

// Initializes a schema that specifies the structure of the data to appear in the form.

// Renders modal for inputting daily data
const WhatIf = (props) => {

  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [fakeData, setFakeData] = useState(() => props.userData);
  const makeSchema = () => new SimpleSchema({
    inputDate: Date,
    modeOfTransportation: String,
    milesTraveled: Number,
  });
  function submit(data) {
    const dailyGHG = getDailyGHG(data.milesTraveled, data.modeOfTransportation, props.vehicles);
    setFakeData([...fakeData, {
      _id: fakeData.length,
      owner: Meteor.user().username,
      inputDate: data.inputDate,
      modeOfTransportation: data.modeOfTransportation,
      milesTraveled: data.milesTraveled,
      cO2Reduced: dailyGHG.cO2Reduced,
      fuelSaved: dailyGHG.fuelSaved,
    }]);
  }

    const formSchema = makeSchema();
    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
  <Modal size='small'
         trigger={<Button>What If</Button>}
         onClick={() => setFirstOpen(true)}
         onClose={() => setFirstOpen(false)}
         onOpen={() => setFirstOpen(true)}
         open={firstOpen}
  >
    <Modal.Header>Add What If Data</Modal.Header>
    <Modal.Content>
      <AutoForm
                schema={bridge}
                onSubmit={data => {
                  submit(data);
                  setSecondOpen(true);
                }
}>
        <DateField name='inputDate'
                   max={new Date(Date.now())}/>
        <SelectField name='modeOfTransportation'
                     allowedValues={props.vehicles.map((vehicle) => `${vehicle.make} ${vehicle.model}`).concat(getAltTransportation())}/>
        <NumField name='milesTraveled'/>
        <SubmitField value='Submit'>
        </SubmitField>
        <ErrorsField/>
      </AutoForm>
    </Modal.Content>

    <Modal
        onClose={() => setSecondOpen(false)}
        open={secondOpen}
        size='large'
    >
      <Modal.Header>Modal #2</Modal.Header>
      <Modal.Content>
        <p>Thats everything!</p>
        <ul>
          {fakeData.map(l => (
              <li key={l._id}>{l.milesTraveled}</li>
          ))}
        </ul>
      </Modal.Content>
      <Modal.Actions>
        <Button
            icon='check'
            content='All Done'
            onClick={() => setSecondOpen(false)}
        />
      </Modal.Actions>
    </Modal>

  </Modal>
    );
};

// Require a document to be passed to this component.
WhatIf.propTypes = {
  userData: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components.
export default withTracker(() => {
  const userData = Meteor.subscribe(DailyUserData.userPublicationName);
  const userVehicle = Meteor.subscribe(Vehicle.userPublicationName);
  const email = Meteor.user().username;
  return {
    userData: DailyUserData.collection.find({}).fetch(),
    vehicles: Vehicle.collection.find({ owner: email }).fetch(),
    ready: userData.ready() && userVehicle.ready(),
  };
})(WhatIf);
