import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Form, Icon, Loader, Modal, Popup, Table } from 'semantic-ui-react';
import swal from 'sweetalert';
import { UserSavedDistances } from '../../../api/user/UserSavedDistanceCollection';
import { getKilometersTraveled, getMilesTraveled } from '../../utilities/DailyGHGData';
import { userSavedDistanceDefineMethod } from '../../../api/user/UserSavedDistanceCollection.methods';

const SavedDistances = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [addLocation, setAddLocation] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [distance, setDistance] = useState('');
  const [unit, setUnit] = useState('mi');

  const formStyle = { fontSize: '12px' };

  const handleModalOpen = () => setModalOpen(true);

  const handleModalClose = () => setModalOpen(false);

  const handleAddLocationOpen = () => setAddLocation(true);

  const handleAddLocationClose = () => {
    setAddLocation(false);
    setLocationName('');
    setDistance('');
    setUnit('mi');
  };

  const handleLocationName = (e, { value }) => setLocationName(value);

  const handleDistance = (e, { value }) => setDistance(value);

  const handleUnit = (e, { value }) => setUnit(value);

  const handleSubmit = () => {
    const inputData = {};
    inputData.location = locationName;
    inputData.distanceMiles = (unit === 'mi') ? distance :
        getMilesTraveled(distance, unit).toFixed(2);
    inputData.owner = props.owner;
    userSavedDistanceDefineMethod.call(inputData, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Location added successfully', 'success').then(() => handleAddLocationClose())));
  };

  const showAddForm = () => (addLocation ?
      <Table.Row>
        <Table.Cell>
          <Form.Input placeholder='Location Name'
                      value={locationName}
                      required
                      size='mini'
                      style={formStyle}
                      onChange={handleLocationName}
          />
        </Table.Cell>
        <Table.Cell singleLine>
          <Form.Group inline>
            <Form.Input placeholder='Distance (one way)'
                        value={distance}
                        type='number'
                        required
                        size='mini'
                        style={formStyle}
                        onChange={handleDistance}
            />
          </Form.Group>
        </Table.Cell>
        <Table.Cell>
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
        </Table.Cell>
        <Table.Cell textAlign='right'>
          <Popup content='Submit'
                 size='mini'
                 trigger={<Icon color='black'
                                name='add'
                                style={{ cursor: 'pointer' }}
                                onClick={handleSubmit}
                 />}
          />
          <Popup content='Cancel'
                 size='mini'
                 trigger={<Icon color='black'
                                name='x'
                                style={{ cursor: 'pointer' }}
                                onClick={handleAddLocationClose}
                 />}
          />
        </Table.Cell>
      </Table.Row>
     : null
  );

  const showTableFooter = () => (addLocation ? null :
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.Cell colSpan='4' textAlign='right'>
                <Icon color='black'
                      name='add'
                      style={{ cursor: 'pointer' }}
                      onClick={handleAddLocationOpen}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
  );

  return props.ready ? (
      <Modal size='tiny'
             closeIcon
             open={modalOpen}
             onClose={handleModalClose}
             onOpen={handleModalOpen}
             trigger={<Button color='black'>See Saved Distances</Button>}
      >
        <Modal.Header content='My Saved Distances'/>
        <Modal.Content>
          <Table basic='very' fixed>
            <Table.Body>
              {props.savedDistances.map((savedDistance, index) => (
                    <Table.Row key={index}>
                      <Table.Cell width={5}>{savedDistance.location}</Table.Cell>
                      <Table.Cell width={5}>{savedDistance.distanceMiles} mi ({getKilometersTraveled(savedDistance.distanceMiles, 'mi').toFixed(2)} km)</Table.Cell>
                      <Table.Cell width={2}/>
                      <Table.Cell textAlign='right' width={2}>
                        <Icon style={{ cursor: 'pointer' }} name='edit outline'/>
                        <Icon style={{ cursor: 'pointer' }} name='trash alternate outline'/>
                      </Table.Cell>
                    </Table.Row>
                ))}
              {showAddForm()}
            </Table.Body>
            {showTableFooter()}
          </Table>
        </Modal.Content>
      </Modal>
  ) : <Loader active>Getting data</Loader>;
};

SavedDistances.propTypes = {
  owner: PropTypes.string.isRequired,
  savedDistances: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const ready = UserSavedDistances.subscribeUserSavedDistance().ready();
  const savedDistances = UserSavedDistances.find({}).fetch();
  const owner = Meteor.user().username;
  return {
    owner,
    savedDistances,
    ready,
  };
})(SavedDistances);
