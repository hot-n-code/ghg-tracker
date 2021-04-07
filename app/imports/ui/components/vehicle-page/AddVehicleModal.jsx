import React, { useState } from 'react';
import { Button, Header } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserVehicle } from '../../../api/user/UserVehicleCollection';
import { Makes } from '../../../api/vehicle/make/MakeCollection';
import { AllVehicle } from '../../../api/vehicle/AllVehicleCollection';

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
  const populateYear = (make, model) => {
    const totalCars = props.AllVehicles;
    const year = _.uniq(_.pluck(_.where(totalCars, { Make: make, Model: model }), 'Year'));
    return year;
  };
  const [test, setTest] = useState(false);
  const [dropMake] = useState(['Toyota', 'Honda', 'Nissan', 'Tesla', 'Ford', 'Volkswagen']);
  const [dropModel, setDropModel] = useState(() => populateCar('Honda'));
  const [dropYear, setDropYear] = useState(() => ['2020']);
  const [finalMake, setFinalMake] = useState(() => '');
  const [finalModel, setFinalModel] = useState(() => '');
  const [finalYear, setFinalYear] = useState(() => '');
  const [finalPrice, setFinalPrice] = useState(() => '');
  const [finalSpending, setFinalSpending] = useState(() => '');
  const handleSubmit = () => {
    const make = finalMake;
    const model = finalModel;
    const price = finalPrice;
    const year = finalYear;
    const fuelSpending = finalSpending;
    setFinalPrice('');
    setFinalSpending('');
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
          }
        },
    );
  };
  const changeModel = e => {
    setFinalMake(e.target.value);
    setDropModel(populateCar(e.target.value));
  };
  const changeYear = e => {
    setFinalModel(e.target.value);
    const desc = _.sortBy(populateYear(finalMake, e.target.value), function (num) {
        return num;
    });
    setDropYear(desc.reverse());
  };
  const endYear = e => {
    const yearAsInt = parseInt(e.target.value, 10);
    setFinalYear(yearAsInt);
  };
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
                 <form onSubmit={handleSubmit}>
                   <label>
                     Make:
                     <select onChange={changeModel}>
                       {dropMake.map((make, key) => (
                           <option value={make} key={key}>
                             {make}
                           </option>
                       ))}
                     </select>
                   </label>
                   <br/>
                   <label>
                     Model:
                     <select onChange={changeYear}>
                       {dropModel.map((model, key) => (
                           <option value={model} key={key}>
                             {model}
                           </option>
                       ))}
                     </select>
                   </label>
                   <br/>
                   <label>
                     Year:
                     <select onChange={endYear}>
                       {dropYear.map((year, key) => (
                           <option value={year} key={key}>
                             {year}
                           </option>
                       ))}
                     </select>
                   </label>
                   <br/>
                   <label>
                     Price:
                     <input type='text' value={finalPrice} onChange={e => setFinalPrice(e.target.value)} />
                   </label>
                   <br/>
                   <label>
                     Yearly Spending:
                     <input type='text' value={finalSpending} onChange={e => setFinalSpending(e.target.value)} />
                   </label>
                   <br/>
                   <input type='submit' value='Submit'/>
                 </form>
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
