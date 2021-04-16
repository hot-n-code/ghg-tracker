import React from 'react';
import { Container, Divider, Loader, Header, Input } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import SmartDataTable from 'react-smart-data-table';
import { withTracker } from 'meteor/react-meteor-data';
import AddDailyData from '../../components/user-data-page/AddDailyData';
import { DailyUserData } from '../../../api/user/DailyUserDataCollection';
import WhatIf from '../../components/user-data-page/WhatIf';
import 'react-smart-data-table/dist/react-smart-data-table.css';
import { getDailyGHG } from '../../utilities/DailyGHGData';
import DeleteDailyData from '../../components/user-data-page/DeleteDailyData';
import EditDailyData from '../../components/user-data-page/EditDailyData';
import { UserVehicles } from '../../../api/user/UserVehicleCollection';

class UserDataReactTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  getColumns(dailyData, vehicles) {
    const data = {};
    data._id = dailyData._id;
    data.date = dailyData.inputDate.toLocaleDateString();
    data.modeOfTransportation = dailyData.modeOfTransportation;
    data.milesTraveled = dailyData.milesTraveled;
    const eImpactDaily = getDailyGHG(data.milesTraveled, data.modeOfTransportation, vehicles);
    data.cO2Redcued = eImpactDaily.cO2Reduced;
    data.fuelSaved = eImpactDaily.fuelSaved;
    return data;
  }

  emptyTable = () => (
    <Header textAlign='center'>
      Key in your first trip to see how you&apos;re helping to save the environment!
    </Header>
  )

  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      if (name === 'numResults') this.setNewData();
    });
  }

  setNewData() {
    const { data } = this.state;
    this.setState({
      data: data,
    });
  }

   renderPage() {
     const { filterValue } = this.state;

     const otherHeaders = {
       _id: {
         invisible: true,
       },
       actions: {
         text: ' ',
         sortable: false,
         filterable: false,
         transform: (value, index, row) => <div>
               <EditDailyData transportationID={row._id} vehicles={this.props.vehicles}/>
               <DeleteDailyData transportationID={row._id}/>
             </div>,
       },
     };

     return (
         <Container id="profileList-page">
           <Divider hidden vertical/>
           <Header as='h1' textAlign='center'>My Transportation History</Header>
           <AddDailyData vehicles={this.props.vehicles}/>
           <WhatIf/>
           <Input
               list='filter'
               placeholder='Filter results..'
               icon='search'
               type='text'
               value={filterValue}
               onChange={this.handleOnChange}
           />
           <Divider hidden/>
           <SmartDataTable
                data={this.props.dailyData.map(data => this.getColumns(data, this.props.vehicles)) }
                name="profile-list"
                className="ui compact table"
                sortable
                onRowClick={this.onRowClick}
                perPage={25}
                filterValue={filterValue}
                headers={otherHeaders}
                emptyTable={this.emptyTable()}
           />
           <Divider hidden/>
         </Container>
     );
  }
}

UserDataReactTable.propTypes = {
  dailyData: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const ready = Meteor.subscribe(DailyUserData.userPublicationName).ready() &&
      UserVehicles.subscribeUserVehicle().ready();
  const dailyData = DailyUserData.collection.find({}, { sort: { inputDate: -1 } }).fetch();
  const vehicles = UserVehicles.find({}).fetch();
  return {
    dailyData,
    vehicles,
    ready,
  };
})(UserDataReactTable);
