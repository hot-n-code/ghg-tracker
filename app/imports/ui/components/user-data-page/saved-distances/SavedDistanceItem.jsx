import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Modal, Popup, Table } from 'semantic-ui-react';
import swal from 'sweetalert';
import { getKilometersTraveled, getMilesTraveled } from '../../../utilities/DailyGHGData';
import {
  userSavedDistanceUpdateMethod,
  userSavedDistanceRemoveItMethod,
} from '../../../../api/user/UserSavedDistanceCollection.methods';

const SavedDistanceItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [locationName, setLocationName] = useState(props.savedDistance.location);
  const [distance, setDistance] = useState(props.savedDistance.distanceMiles);
  const [unit, setUnit] = useState('mi');

  const formStyle = { fontSize: '12px' };

  const handleEditModeOn = () => setEditMode(true);
  const handleEditModeOff = () => setEditMode(false);

  const handleLocationName = (e, { value }) => setLocationName(value);

  const handleDistance = (e, { value }) => setDistance(value);

  const handleUnit = (e, { value }) => setUnit(value);

  const handleSubmit = () => {
    const updateData = {};
    updateData.location = locationName;
    updateData.distanceMiles = (unit === 'mi') ? distance :
        getMilesTraveled(distance, unit).toFixed(2);
    updateData.owner = props.savedDistance.owner;
    userSavedDistanceUpdateMethod.call(updateData, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Location added successfully', 'success').then(() => handleEditModeOff())));
  };

  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const handleDelete = () => {
    userSavedDistanceRemoveItMethod.call(props.savedDistance._id, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Location deleted successfully', 'success').then(() => {
          handleDeleteModalClose();
          // eslint-disable-next-line no-undef
          window.location.reload();
        })));
  };

  return (!editMode ?
          <Table.Row>
            <Table.Cell width={5}>{locationName}</Table.Cell>
            <Table.Cell width={5}>{distance} mi ({getKilometersTraveled(props.savedDistance.distanceMiles, 'mi').toFixed(2)} km)</Table.Cell>
            <Table.Cell width={2}/>
            <Table.Cell textAlign='right' width={2}>
              <Icon style={{ cursor: 'pointer' }}
                    name='edit outline'
                    onClick={() => handleEditModeOn()}
              />
              <Modal size='mini'
                     dimmer
                     closeIcon
                     open={deleteModalOpen}
                     onClose={handleDeleteModalClose}
                     onOpen={handleDeleteModalOpen}
                     trigger={<Icon style={{ cursor: 'pointer' }}
                                    name='trash alternate outline'
                     />}
              >
                <Modal.Header>Delete Saved Location</Modal.Header>
                <Modal.Content>
                  Are you sure you want the following data?
                  <br/>
                  <br/>
                  <b>Location name:</b> {locationName}
                  <br/>
                  <b>Distance:</b> {distance} mi ({getKilometersTraveled(props.savedDistance.distanceMiles, 'mi').toFixed(2)} km)
                </Modal.Content>
                <Modal.Actions>
                  <Button icon='trash alternate outline'
                          size='tiny'
                          negative
                          labelPosition='right'
                          content='Delete'
                          onClick={() => handleDelete()}
                  />
                  <Button icon='x'
                          size='tiny'
                          labelPosition='right'
                          content='Cancel'
                          onClick={handleDeleteModalClose}
                  />
                </Modal.Actions>
              </Modal>
            </Table.Cell>
          </Table.Row> :
          <Table.Row>
            <Table.Cell width={5}>
              <Form.Input placeholder='Location Name'
                          value={locationName}
                          required
                          size='mini'
                          style={formStyle}
                          onChange={handleLocationName}
              />
            </Table.Cell>
            <Table.Cell width={5}>
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
            <Table.Cell width={2}>
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
            <Table.Cell textAlign='right' width={2}>
              <Popup content='Submit'
                     size='mini'
                     trigger={<Icon color='green'
                                    name='check'
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleSubmit}
                     />}
              />
              <Popup content='Cancel'
                     size='mini'
                     trigger={<Icon color='black'
                                    name='x'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleEditModeOff()}
                     />}
              />
            </Table.Cell>
          </Table.Row>
  );
};

SavedDistanceItem.propTypes = {
  savedDistance: PropTypes.object.isRequired,
};

export default SavedDistanceItem;
