import React, { useState } from 'react';
import { Button, Segment, Header, Form } from 'semantic-ui-react';
import {
  AutoForm,
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
import { UserVehicle } from '../../../api/user/UserVehicleCollection';
import { Makes } from '../../../api/vehicle/make/MakeCollection';
import { AllVehicle } from '../../../api/vehicle/AllVehicleCollection';

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
    model: {
      type: String,
      allowedValues: [
          '',
      ],
    },
    price: Number,
    year: Number,
    fuelSpending: Number,
  });

const AddVehicleModal = (props) => {
  const getMPGType = (make, model, year) => {
    const search = {
      miles: '',
      type: '',
    };
    const totalCars = props.AllVehicles;
    const find = _.pluck(_.where(totalCars, { Make: make, Model: model, Year: year }), 'Mpg');
    search.miles = find[0];
    if (find[0] > 0) {
      search.type = 'Gas';
    } else {
      search.type = 'EV/Hybrid';
    }
    return [search.miles, search.type];
  };

   const populateCar = (make) => {
    const totalCars = props.AllVehicles;
    const cars = _.uniq(_.pluck(_.where(totalCars, { Make: make }), 'Model'));
    return cars;
  };
  const [test, setTest] = useState(false);
  /** On submit, insert the data. */
  function submit(data, formRef) {
    const { make, model, price, year, fuelSpending } = data;
    const owner = Meteor.user().username;
    // LOGO
    const temp = _.pluck(Makes.collection.find({ make: make }).fetch(), 'logo');
    const logo = temp[0];
    // MPG
    const get = getMPGType(make, model, year);
    const MPG = get[0];
    const type = get[1];
    UserVehicle.collection.insert(
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
    const xd = populateCar('Honda');
    const formSchema = makeSchema();
    const bridge = new SimpleSchema2Bridge(formSchema);
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
            onClick={() => setTest(true)}
          />
        </motion.div>

        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => setTest(false)}
        >
          {test && (
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
                    onClick={() => setTest(false)}
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
                    onSubmit={data => submit(data, formRef)}
                  >
                    <Segment>
                      <Form.Group widths={'equal'}>
                        <SelectField name='make'/>
                        <SelectField name='model' allowedValues={xd}/>
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
                      <Form.Group>
                        <NumField
                            name='fuelSpending'
                            showInlineError={true}
                            placeholder={'Yearly Fuel Spending'}
                        />
                      </Form.Group>
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
};

AddVehicleModal.propTypes = {
  ready: PropTypes.bool.isRequired,
  AllVehicles: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(UserVehicle.userPublicationName);
  const sub2 = Meteor.subscribe(Makes.userPublicationName);
  const sub3 = Meteor.subscribe(AllVehicle.userPublicationName);
  return {
    AllVehicles: AllVehicle.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(AddVehicleModal);
