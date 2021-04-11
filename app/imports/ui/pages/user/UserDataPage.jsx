import { Grid, Header, Table } from 'semantic-ui-react';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import AddDailyData from '../../components/user-data-page/AddDailyData';
import HistoryRowData from '../../components/user-data-page/HistoryRowData';
import { DailyUserData } from '../../../api/user/ghg-data/DailyUserDataCollection';
import WhatIf from '../../components/user-data-page/WhatIf';
import { UserVehicle } from '../../../api/user/UserVehicleCollection';

class UserDataPage extends React.Component {
  render() {
   return (
       <div className='background-all'>
         <Grid stackable columns={3}>
           <Grid.Column width={16}>
             <Header as='h1' textAlign='center'
                     style={{ marginTop: '10px' }}>My Transportation History</Header>
             <Header as='h1' textAlign='center'><AddDailyData/><WhatIf/></Header>
           </Grid.Column>
         </Grid>
         <Table stackable striped>
           <Table.Header>
             <Table.Row>
               <Table.HeaderCell>Date</Table.HeaderCell>
               <Table.HeaderCell>Mode of Transportation</Table.HeaderCell>
               <Table.HeaderCell>Total Miles</Table.HeaderCell>
               <Table.HeaderCell>CO2 Reduced</Table.HeaderCell>
               <Table.HeaderCell>Fuel Saved</Table.HeaderCell>
               <Table.HeaderCell/>
               <Table.HeaderCell/>
             </Table.Row>
           </Table.Header>
           <Table.Body>
             {this.props.dailyData.map((value) => <HistoryRowData key={value._id} transportationData={value} vehicles={this.props.vehicles}/>)}
           </Table.Body>
         </Table>
       </div>
   );
  }
}

UserDataPage.propTypes = {
  dailyData: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const ready = Meteor.subscribe(DailyUserData.userPublicationName).ready() &&
      Meteor.subscribe(UserVehicle.userPublicationName).ready();
  const dailyData = DailyUserData.collection.find({}, { sort: { inputDate: -1 } }).fetch();
  const vehicles = UserVehicle.collection.find({}).fetch();
  return {
    dailyData,
    vehicles,
    ready,
  };
})(UserDataPage);
