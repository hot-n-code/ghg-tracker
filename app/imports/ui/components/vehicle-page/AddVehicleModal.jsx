import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { Button, Header, Input, Loader } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { VehicleMakes } from '../../../api/vehicle/VehicleMakeCollection';
import { AllVehicles } from '../../../api/vehicle/AllVehicleCollection';
import { UserVehicles } from '../../../api/user/UserVehicleCollection';
import { userVehicleDefineMethod } from '../../../api/user/UserVehicleCollection.methods';

const AddVehicleModal = (props) => {
  // getMPGType function that gets the MPG and type from user input(make, model, year)
  const getMPGType = (make, model, year) => {
    const search = {
      miles: '',
      type: '',
    };
    const totalCars = props.allVehicles;
    const find = _.pluck(_.where(totalCars, { Make: make, Model: model, Year: year }), 'Mpg');
    search.miles = find[0];
    if (find[0] > 0) {
      search.type = 'Gas';
    } else {
      search.type = 'EV/Hybrid';
    }
    return [search.miles, search.type];
  };
  // populates all models from a specific make
   const populateModel = (make) => {
    const totalCars = props.allVehicles;
    const cars = _.uniq(_.pluck(_.where(totalCars, { Make: make }), 'Model'));
    return cars;
  };
   // populates all years from a specific make and model
  const populateYear = (make, model) => {
    const totalCars = props.allVehicles;
    const year = _.uniq(_.pluck(_.where(totalCars, { Make: make, Model: model }), 'Year'));
    return year;
  };
  // convert array into select react format
  const convert = (arr) => {
    const selectList = [];
    arr.forEach(function (element) {
      selectList.push({ label: element, value: element });
    });
    return selectList;
  };
  // initial hooks
  const populateMake = _.pluck(VehicleMakes.find({}).fetch(), 'make');
  const populateTestMake = convert(populateMake);
  const [test, setTest] = useState(false);
  const [dropModel, setDropModel] = useState(() => [{ label: '', value: '' }]);
  const [dropYear, setDropYear] = useState(() => [{ label: '', value: '' }]);
  const [finalMake, setFinalMake] = useState(() => '');
  const [finalModel, setFinalModel] = useState(() => '');
  const [finalYear, setFinalYear] = useState(() => '');
  const [finalPrice, setFinalPrice] = useState(() => '');
  const [finalSpending, setFinalSpending] = useState(() => '');
  const [finalName, setFinalName] = useState(() => '');
  // submit function that adds user input to uservehicle collection
  const handleSubmit = (event) => {
    event.preventDefault();
    const make = finalMake;
    const model = finalModel;
    const price = finalPrice;
    const year = finalYear;
    const fuelSpending = finalSpending;
    const owner = Meteor.user().username;
    let name = finalName;
    if (name === '') {
      name = `${year} ${make} ${model}`;
    }
    // LOGO
    const temp = _.pluck(VehicleMakes.find({ make: make }).fetch(), 'logo');
    const logo = temp[0];
    // MPG
    const get = getMPGType(finalMake, model, year);
    const MPG = get[0];
    const type = get[1];
    userVehicleDefineMethod.call(
        { make, model, logo, price, year, MPG, fuelSpending, type, owner, name },
        error => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Vehicle added successfully', 'success');
            setDropYear([{ label: '', value: '' }]);
            setDropModel([{ label: '', value: '' }]);
            setFinalPrice('');
            setFinalSpending('');
            setFinalName('');
          }
        },
    );
  };
  // ref and hooks of model select field
  const modelRef = useRef();
  const modelFormState = { mySelectKey: null };
  const [resetModel, setResetModel] = useState(modelFormState);
  // ref and hooks of year select field
  const yearRef = useRef();
  const yearFormState = { mySelectKey: null };
  const [resetYear, setResetYear] = useState(yearFormState);
  // reset functions - credit: Andrea Ligios
  const resetModelForm = () => {
    setResetModel(modelFormState);
  };
  const resetYearForm = () => {
    setResetYear(yearFormState);
  };
  // onchange function that changes the model dropdown
  const changeModel = e => {
    setFinalMake(e.value);
    const desc = _.sortBy(populateModel(e.value), function (num) {
      return num;
    });
    const selectModel = modelRef.current.state.value;
    if (selectModel != null) {
      resetModelForm();
      setFinalModel('');
    }
    const selectYear = yearRef.current.state.value;
    if (selectYear != null) {
      resetYearForm();
      setFinalYear('');
    }
    const change = convert(desc);
    setDropModel(change);
  };
  // onchange function that changes the year dropdown
  const changeYear = e => {
    setResetModel({ ...resetModel, mySelectKey: e.value });
    setFinalModel(e.value);
    const desc = _.sortBy(populateYear(finalMake, e.value), function (num) {
        return num;
    });
    const selectYear = yearRef.current.state.value;
    if (selectYear != null) {
      resetYearForm();
      setFinalYear('');
    }
    setDropYear(convert(desc.reverse()));
  };
  // onchange function that converts and stores the year
  const setYear = e => {
    setResetYear({ ...resetYear, mySelectKey: e.value });
    const yearAsInt = parseInt(e.value, 10);
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
  return props.ready ? (
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
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            options={populateTestMake}
                            name="make"
                            isSearchable={true}
                            onChange={changeModel}
                            placeholder={'Make'}
                        />
                      </label>
                      <br/>
                      <label>
                        Model:
                        <Select
                            ref={modelRef}
                            className="basic-single"
                            classNamePrefix="select"
                            options={dropModel}
                            name="model"
                            isSearchable={true}
                            onChange={changeYear}
                            placeholder={'Model'}
                            value={dropModel.filter(({ value }) => value === resetModel.mySelectKey)}
                        />
                      </label>
                      <br/>
                      <label>
                        Year:
                        <Select
                            ref={yearRef}
                            className="basic-single"
                            classNamePrefix="select"
                            options={dropYear}
                            name="year"
                            isSearchable={true}
                            onChange={setYear}
                            placeholder={'Year'}
                            value={dropYear.filter(({ value }) => value === resetYear.mySelectKey)}
                        />
                      </label>
                      <br/>
                      <br/>
                      <label>
                        Vehicle Name (Optional):
                        <br/>
                        <Input placeholder='Vehicle Name' value={finalName} onChange={e => setFinalName(e.target.value)} />
                      </label>
                      <br/>
                      <br/>
                      <label>
                        Price:
                        <br/>
                        <Input placeholder='Price' value={finalPrice} onChange={e => setFinalPrice(e.target.value)} />
                      </label>
                      <br/>
                      <br/>
                      <label>
                        Yearly Spending:
                        <br/>
                        <Input placeholder='Yearly Spending' value={finalSpending} onChange={e => setFinalSpending(e.target.value)} />
                      </label>
                      <br/>
                      <br/>
                      <button className="ui button" value='Submit'>
                        Submit
                      </button>
                    </form>
                  </motion.div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
  ) : (
      <div className='vehicle-loader-container'>
        <Loader active className='vehicle-loader'>loading add vehicles button</Loader>
      </div>
  );

};

AddVehicleModal.propTypes = {
  ready: PropTypes.bool.isRequired,
  allVehicles: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = UserVehicles.subscribeUserVehicle();
  const sub2 = VehicleMakes.subscribeVehicleMake();
  const sub3 = AllVehicles.subscribeAllVehicle();
  return {
    allVehicles: AllVehicles.find({}).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(AddVehicleModal);
