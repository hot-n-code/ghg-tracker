import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, NumField, RadioField, SelectField, SubmitField } from 'uniforms-semantic';
import { Button, Form, Header, Modal, Grid, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { DailyUserData } from '../../../api/user/DailyUserDataCollection';
import { UserVehicle } from '../../../api/user/UserVehicleCollection';
import { getDailyGHG, getMilesTraveled } from '../../utilities/DailyGHGData';
import { getCumulativeGHG } from '../../utilities/CumulativeGHGData';
import { altSelectFieldOptions } from '../../utilities/GlobalVariables';

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
  const makeSchema = () => new SimpleSchema({
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
    const date = 0;
    setFakeData([...fakeData, {
      _id: fakeData.length,
      owner: Meteor.user().username,
      inputDate: date,
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
          <SelectField name='modeOfTransportation'
                       allowedValues={props.vehicles.map((vehicle) => `${vehicle.name}`).concat(altSelectFieldOptions)}/>
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
