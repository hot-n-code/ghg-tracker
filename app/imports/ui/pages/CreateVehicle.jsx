import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField, SubmitField, NumField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserVehicle } from '../../api/user/UserVehicleCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';

const paddingStyle = { padding: 20 };

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = () => new SimpleSchema({
  make: String,
  model: String,
  price: Number,
  year: Number,
  MPG: Number,
  fuelSpending: Number,
  type: {
    type: String,
    allowedValues: ['gas', 'ev', 'hybrid'],
  },
});

class CreateVehicle extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { make, model, price, year, MPG, fuelSpending, type } = data;
    const owner = Meteor.user().username;
    const logo = 'https://www.freepnglogos.com/uploads/honda-logo-png/honda-png-transparent-honda-images-plus-4.png';
    Vehicle.collection.insert({ make, model, logo, price, year, MPG, fuelSpending, type, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Vehicle added successfully', 'success');
            formRef.reset();
          }
        });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const formSchema = makeSchema();
    const bridge = new SimpleSchema2Bridge(formSchema);
    let fRef = null;
    return (
        <div className='background-all'>
        <div style={paddingStyle}>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Create Vehicle</Header>
              <AutoForm ref={ref => { fRef = ref; }}
                        schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                <Segment>
                  <Form.Group widths={'equal'}>
                    <TextField name='make' showInlineError={true} placeholder={'make of vehicle'}/>
                    <TextField name='model' showInlineError={true} placeholder={'model of vehicle'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <NumField name='price' showInlineError={true} placeholder={'price of vehicle'}/>
                    <NumField name='year' showInlineError={true} placeholder={'year'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <NumField name='MPG' showInlineError={true} placeholder={'miles per gallon'}/>
                    <NumField name='fuelSpending' showInlineError={true} placeholder={'fuelSpending'}/>
                  </Form.Group>
                  <SelectField name='type'/>
                  <SubmitField value='Submit'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
        </div>
    );
  }
}

CreateVehicle.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(UserVehicle.userPublicationName);
  const sub2 = Meteor.subscribe(Vehicle.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready(),
  };
})(CreateVehicle);
