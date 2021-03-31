import { Grid, Header, Table } from 'semantic-ui-react';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import AddDailyData from '../components/AddDailyData';
import HistoryRowData from '../components/HistoryRowData';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';
import { Users } from '../../api/user/UserCollection';
import WhatIf from '../components/WhatIf';

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
               <Table.HeaderCell/>
               <Table.HeaderCell/>
             </Table.Row>
           </Table.Header>
           <Table.Body>
             {this.props.dailyData.map((value) => <HistoryRowData key={value._id} transportationData={value}/>)}
           </Table.Body>
         </Table>
       </div>
   );
  }
}

UserDataPage.propTypes = {
  dailyData: PropTypes.array.isRequired,
  users: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub1 = Meteor.subscribe(DailyUserData.userPublicationName);
  const sub2 = Meteor.subscribe(Users.userPublicationName);
  return {
    dailyData: DailyUserData.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready(),
  };
})(UserDataPage);
