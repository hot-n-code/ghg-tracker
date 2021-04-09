import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, DateField, ErrorsField, NumField, RadioField, SelectField, SubmitField } from 'uniforms-semantic';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { DailyUserData } from '../../../api/user/ghg-data/DailyUserDataCollection';
import { UserVehicle } from '../../../api/user/UserVehicleCollection';
import { getDailyGHG, getDateToday, getMilesTraveled } from '../../utilities/DailyGHGData';
import { altSelectFieldOptions } from '../../utilities/GlobalVariables';

// Initializes a schema that specifies the structure of the data to appear in the form.

// Renders modal for inputting daily data
const WhatIf = (props) => {

  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [fakeData, setFakeData] = useState(() => props.userData);
  const [cO2, setCO2] = useState('');
  const [distance, setDistance] = useState('');
  const [fuel, setFuel] = useState('');
  const [mode, setMode] = useState('');
  const makeSchema = () => new SimpleSchema({
    inputDate: Date,
    modeOfTransportation: String,
    distanceTraveled: Number,
    unit: {
      type: String,
      allowedValues: ['mi', 'km'],
    },
  });
  function submit(data, formRef) {
    const { distanceTraveled, unit } = data;
    const traveled = getMilesTraveled(distanceTraveled, unit).toFixed(2);
    const dailyGHG = getDailyGHG(traveled, data.modeOfTransportation, props.vehicles);
    setFakeData([...fakeData, {
      _id: fakeData.length,
      owner: Meteor.user().username,
      inputDate: data.inputDate,
      modeOfTransportation: data.modeOfTransportation,
      distanceTraveled: traveled,
      cO2Reduced: dailyGHG.cO2Reduced,
      fuelSaved: dailyGHG.fuelSaved,
    }]);
    setCO2(dailyGHG.cO2Reduced);
    setDistance(traveled);
    setFuel(dailyGHG.fuelSaved);
    setMode(data.modeOfTransportation);
    formRef.reset();
  }
  const DisplayCO2 = () => {
    if (cO2 > 0) {
      return (
          <div>
            <h2 style={{ color: 'green' }}>Fuel Saved: {fuel} Gallons</h2>
            <h2 style={{ color: 'green' }}>CO2 Reduced: {cO2} Ib(s)</h2>
          </div>
      );
    }
      return (
          <div>
            <h2 style={{ color: 'red' }}>Fuel Spent: {fuel * -1} Gallons</h2>
            <h2 style={{ color: 'red' }}>CO2 Produced: {cO2 * -1} Ib(s)</h2>
          </div>
      );
  };

  const formSchema = makeSchema();
  const bridge = new SimpleSchema2Bridge(formSchema);
  let formRef = null;

  return (
    <Modal size='tiny'
           closeIcon
           trigger={<Button>What If</Button>}
           onClose={() => setFirstOpen(false)}
           onOpen={() => setFirstOpen(true)}
           open={firstOpen}
    >
      <Modal.Header>Add &apos;What If&apos; Data</Modal.Header>
      <Modal.Content>
        <AutoForm
                  ref={ref => { formRef = ref; }}
                  schema={bridge}
                  onSubmit={data => {
                    submit(data, formRef);
                    setSecondOpen(true);
                  }}
        >
          <DateField name='inputDate'
                     max={getDateToday()}/>
          <SelectField name='modeOfTransportation'
                       allowedValues={props.vehicles.map((vehicle) => `${vehicle.make} ${vehicle.model}`).concat(altSelectFieldOptions)}/>
          <Form.Group inline>
            <NumField name='distanceTraveled'/>
            <RadioField label={null} name='unit'/>
          </Form.Group>
          <Header>
            <Header.Subheader><b>Note:</b> For &apos;<i>Telework</i>&apos;, key in the distance (roundtrip) between home and workplace.</Header.Subheader>
          </Header>
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
        <Modal.Header>WHAT IF: { mode } for { distance } miles </Modal.Header>
        <Modal.Content>
          <DisplayCO2/>
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
  const userVehicle = Meteor.subscribe(UserVehicle.userPublicationName);
  return {
    userData: DailyUserData.collection.find({}).fetch(),
    vehicles: UserVehicle.collection.find({}).fetch(),
    ready: userData.ready() && userVehicle.ready(),
  };
})(WhatIf);
