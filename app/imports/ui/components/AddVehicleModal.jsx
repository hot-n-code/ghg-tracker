import React from 'react';
import { Button, Segment, Header, Form, Loader } from 'semantic-ui-react';
import {
  AutoForm,
  TextField,
  SubmitField,
  NumField,
  SelectField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserVehicle } from '../../api/user/UserVehicleCollection';
import { Vehicle } from '../../api/vehicle/VehicleCollection';
import { Make } from '../../api/make/Make';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = () =>
  new SimpleSchema({
    make: {
      type: String,
      allowedValues: [
        'Toyota',
        'Honda',
        'Nissan',
        'Tesla',
        'Ford',
        'Volkswagen',
      ],
    },
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

class AddvehicleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }

  addVehicleModalHandler = openStatus => {
    this.setState({ isSelected: openStatus });
  };

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { make, model, price, year, MPG, fuelSpending, type } = data;
    const owner = Meteor.user().username;
    const temp = _.pluck(Make.collection.find({ make: make }).fetch(), 'logo');
    const logo = temp[0];
    Vehicle.collection.insert(
      { make, model, logo, price, year, MPG, fuelSpending, type, owner },
      error => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Vehicle added successfully', 'success');
          formRef.reset();
        }
      },
    );
  }

  render() {
    return this.props.ready ? (
      this.renderPage()
    ) : (
      <Loader active>Getting data</Loader>
    );
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const formSchema = makeSchema();
    const bridge = new SimpleSchema2Bridge(formSchema);
    const isSelected = this.state.isSelected;
    let formRef = null;
    return (
      <AnimateSharedLayout type='crossfade'>
        <motion.div className='add-vehicle-btn' layoutId='add-vehicle-toggle'>
          <Button
            circular
            icon='add'
            size='massive'
            onClick={() => this.addVehicleModalHandler(true)}
          />
        </motion.div>

        <AnimatePresence>
          {isSelected && (
            <motion.div
              className='add-vehicle-overlay'
              onClick={() => this.addVehicleModalHandler(false)}
              layoutId='add-vehicle-toggle'
            >
              <motion.div className='add-vehicle-container'>
                <motion.div className='add-vehicle-header'>
                  <Header as='h2' textAlign='center'>
                    Create Vehicle
                  </Header>
                </motion.div>
                <motion.div onClick={() => this.addVehicleModalHandler(false)}>
                  &#10005;
                </motion.div>
                <motion.div className='add-vehicle-form'>
                  <AutoForm
                    ref={ref => {
                      formRef = ref;
                    }}
                    schema={bridge}
                    onSubmit={data => this.submit(data, formRef)}
                  >
                    <Segment>
                      <Form.Group widths={'equal'}>
                        <SelectField name='make' />
                        <TextField
                          name='model'
                          showInlineError={true}
                          placeholder={'model of vehicle'}
                        />
                      </Form.Group>
                      <Form.Group widths={'equal'}>
                        <NumField
                          name='price'
                          showInlineError={true}
                          placeholder={'price of vehicle'}
                        />
                        <NumField
                          name='year'
                          showInlineError={true}
                          placeholder={'year'}
                        />
                      </Form.Group>
                      <Form.Group widths={'equal'}>
                        <NumField
                          name='MPG'
                          showInlineError={true}
                          placeholder={'miles per gallon'}
                        />
                        <NumField
                          name='fuelSpending'
                          showInlineError={true}
                          placeholder={'fuelSpending'}
                        />
                      </Form.Group>
                      <SelectField name='type' />
                      <SubmitField value='Submit' />
                    </Segment>
                  </AutoForm>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    );
  }
}

AddvehicleModal.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(UserVehicle.userPublicationName);
  const sub2 = Meteor.subscribe(Vehicle.userPublicationName);
  const sub3 = Meteor.subscribe(Make.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(AddvehicleModal);
