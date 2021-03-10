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
const makeSchema = () => new SimpleSchema({
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

    // Animation variants
    const overlay = {
      visible: { opacity: 1 },
      hidden: { opacity: 0 },
    };

    const modal = {
      hidden: {
        y: '-100vh',
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: { delay: 0.2 },
      },
    };

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

        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => this.addVehicleModalHandler(false)}
        >
          {isSelected && (
            <motion.div
              className='add-vehicle-overlay'
              variants={overlay}
              initial='hidden'
              animate='visible'
              exit='hidden'
            >
              <motion.div className='add-vehicle-container' variants={modal}>
                <motion.div className='add-vehicle-header'>
                  <Header as='h2' textAlign='center'>
                    Create Vehicle
                  </Header>
                  <motion.div
                    className='add-vehicle-close-btn'
                    onClick={() => this.addVehicleModalHandler(false)}
                  >
                    &#10005;
                  </motion.div>
                </motion.div>
                <motion.div
                  className='add-vehicle-form'
                  layoutId='add-vehicle-toggle'
                >
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
                          placeholder={'Model of Vehicle'}
                        />
                      </Form.Group>
                      <Form.Group widths={'equal'}>
                        <NumField
                          name='price'
                          showInlineError={true}
                          placeholder={'Price of Vehicle'}
                        />
                        <NumField
                          name='year'
                          showInlineError={true}
                          placeholder={'Year'}
                        />
                      </Form.Group>
                      <Form.Group widths={'equal'}>
                        <NumField
                          name='MPG'
                          showInlineError={true}
                          placeholder={'Miles Per Gallon'}
                        />
                        <NumField
                          name='fuelSpending'
                          showInlineError={true}
                          placeholder={'Fuel Spending'}
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
