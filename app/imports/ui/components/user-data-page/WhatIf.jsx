import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import {
  AutoForm,
  BoolField,
  ErrorsField,
  SelectField,
  SubmitField,
} from 'uniforms-semantic';
import { Button, Form, Modal, Grid, Image, Divider, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserSavedDistances } from '../../../api/user/UserSavedDistanceCollection';
import {
  getMilesTraveled,
  getKilometersTraveled,
  getDailyGHG,
  getModeType,
} from '../../utilities/DailyGHGData';
import { altSelectFieldOptions } from '../../utilities/GlobalVariables';
import { getCumulativeGHG } from '../../utilities/CumulativeGHGData';
import { UserDailyData } from '../../../api/user/UserDailyDataCollection';
import { UserVehicles } from '../../../api/user/UserVehicleCollection';

// Initializes a schema that specifies the structure of the data to appear in the form.

// Renders modal for inputting daily data
const WhatIf = (props) => {

  const cumulativeData = getCumulativeGHG(props.userData, props.vehicles);
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [fakeData, setFakeData] = useState(() => props.userData);
  const [cO2, setCO2] = useState('');
  const [distance, setDistance] = useState('');
  const [fuel, setFuel] = useState('');
  const [mode, setMode] = useState('');
  const [unit, setUnit] = useState('mi');
  const [distanceForm, setDistanceForm] = useState(false);
  const [labelDistance, setLabelDistance] = useState(false);
  const formSchema = new SimpleSchema({
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
              <Form.Input label='Distance traveled (one-way)'
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

  const submit = (data, formRef) => {
    const inputData = {};
    inputData.inputDate = 0;
    inputData.modeOfTransportation = data.modeOfTransportation;
    inputData.milesTraveled = (unit === 'mi') ? distance :
        getMilesTraveled(distance, unit).toFixed(2);
    if (data.roundtrip) {
      inputData.milesTraveled *= 2;
    }
    inputData.modeType = getModeType(inputData.modeOfTransportation, props.vehicles);
    inputData.owner = props.owner;
    const dailyGHG = getDailyGHG(inputData.milesTraveled, data.modeOfTransportation, props.vehicles);
    setFakeData([...fakeData, {
      _id: fakeData.length,
      owner: Meteor.user().username,
      inputDate: inputData.inputDate,
      modeOfTransportation: data.modeOfTransportation,
      distanceTraveled: inputData.milesTraveled,
      cO2Reduced: dailyGHG.cO2Reduced,
      fuelSaved: dailyGHG.fuelSaved,
    }]);
    setCO2(dailyGHG.cO2Reduced);
    setDistance(inputData.milesTraveled);
    setFuel(dailyGHG.fuelSaved);
    setMode(data.modeOfTransportation);
    formRef.reset();
  };
  const DisplayCO2 = () => {
    if (cO2 > 0) {
      return (
          <Grid stackable columns={2} divided>
            <Grid.Column>
              <h1>Fuel Saved</h1>
              <Image style={{ display: 'block',
                margin: '0 auto' }} src="/images/colored-clipart/3.png"
                     size='small' alt="filler placement for eventual graph"/>
              <h2>Total: {cumulativeData.fuelSaved.toFixed(2)} Gallons</h2>
              <h2 style={{ color: 'green' }}> + {fuel} Gallons</h2>
            </Grid.Column>
            <Grid.Column>
              <h1>CO2 Reduced: </h1>
              <Image style={{ display: 'block',
                margin: '0 auto' }} src="/images/colored-clipart/2.png"
                     size='small' alt="CO2"/>
              <h2>Total: {cumulativeData.cO2Reduced.toFixed(2)} Ib(s) </h2>
              <h2 style={{ color: 'green' }}> + {cO2} Ib(s)</h2>
            </Grid.Column>
          </Grid>
      );
    }
      return (
          <Grid stackable columns={1} divided>
            <Grid.Column>
              <h1>CO2 Produced:</h1>
              <Image style={{ display: 'block',
                margin: '0 auto' }} src="/images/colored-clipart/5.png"
                     size='small' alt="biking"/>
              <h2>Total: {cumulativeData.cO2Produced.toFixed(2)} Ib(s) </h2>
              <h2 style={{ color: 'red' }}> + {cO2 * -1} Ib(s)</h2>
              <h2 style={{ color: 'red' }}>Fuel Spent: {fuel * -1} Gallons</h2>
            </Grid.Column>
          </Grid>
      );
  };
  const bridge = new SimpleSchema2Bridge(formSchema);
  let formRef = null;

  return props.ready ? (
    <Modal size='tiny'
           closeIcon
           trigger={<Button color='black'>What If</Button>}
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

          <Modal.Content>
            <SelectField name='modeOfTransportation'
                         allowedValues={props.vehicles.map((vehicle) => `${vehicle.name}`).concat(altSelectFieldOptions)}
            />
            <Form.Group inline>
              <Form.Select label='Destination'
                           options={getSavedDistances()}
                           onChange={handleSavedDistance}
                           placeholder='Destination'
                           required
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
  ) : <Loader active>Getting data</Loader>;
};

// Require a document to be passed to this component.
WhatIf.propTypes = {
  vehicles: PropTypes.array.isRequired,
  owner: PropTypes.string.isRequired,
  savedDistances: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  userData: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components.
export default withTracker(() => {
  const userData = UserDailyData.subscribeUserDailyData();
  const userVehicle = UserVehicles.subscribeUserVehicle();
  const ready = UserSavedDistances.subscribeUserSavedDistance().ready() && userData.ready() && userVehicle.ready();
  const savedDistances = UserSavedDistances.find({}).fetch();
  const owner = Meteor.user().username;
  return {
    userData: UserDailyData.find({}).fetch(),
    vehicles: UserVehicles.find({}).fetch(),
    owner,
    savedDistances,
    ready,
  };
})(WhatIf);
