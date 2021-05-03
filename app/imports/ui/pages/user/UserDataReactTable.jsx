import React from 'react';
import { Container, Divider, Loader, Header, Input, Grid, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SmartDataTable from 'react-smart-data-table';
import { withTracker } from 'meteor/react-meteor-data';
import AddDailyData from '../../components/user-data-page/AddDailyData';
import { UserDailyData } from '../../../api/user/UserDailyDataCollection';
import WhatIf from '../../components/user-data-page/WhatIf';
import 'react-smart-data-table/dist/react-smart-data-table.css';
import { getDailyGHG, getKilometersTraveled } from '../../utilities/DailyGHGData';
import DeleteDailyData from '../../components/user-data-page/DeleteDailyData';
import EditDailyData from '../../components/user-data-page/EditDailyData';
import { UserVehicles } from '../../../api/user/UserVehicleCollection';
import SavedDistances from '../../components/user-data-page/saved-distances/SavedDistances';

class UserDataReactTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: '',
      inKilometers: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  getColumns(dailyData, vehicles) {
    const data = {};
    data._id = dailyData._id;
    data.date = dailyData.inputDate.toLocaleDateString();
    data.modeOfTransportation = dailyData.modeOfTransportation;
    if (this.state.inKilometers) {
      data.kilometersTraveled = getKilometersTraveled(dailyData.milesTraveled, 'mi').toFixed(2);
    } else {
      data.milesTraveled = dailyData.milesTraveled;
    }
    const eImpactDaily = getDailyGHG(dailyData.milesTraveled, data.modeOfTransportation, vehicles);
    data.cO2Reduced = eImpactDaily.cO2Reduced;
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

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
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
         <Container id="user-react-page">
           <Divider hidden vertical/>
           <Header as='h1' textAlign='center'>
             My Transportation History
             <Header.Subheader>
               <Form.Radio
                   toggle
                   label='See distance traveled in km'
                   checked={this.state.inKilometers}
                   onChange={() => {
                     this.setState((prevState) => ({ inKilometers: !prevState.inKilometers }));
                   }}
               />
             </Header.Subheader>
           </Header>
           <Grid container columns={2} style={{ marginTop: 5 }}>
             <Grid.Column verticalAlign='middle'>
               <AddDailyData vehicles={this.props.vehicles}/>
               <WhatIf/>
               <SavedDistances/>
             </Grid.Column>
             <Grid.Column floated='right' textAlign='right' verticalAlign='middle'>
               <Input
                   list='filter'
                   placeholder='Filter results..'
                   name='filterValue'
                   icon='search'
                   type='text'
                   value={filterValue}
                   onChange={this.handleOnChange}
               />
             </Grid.Column>
           </Grid>

           <Divider hidden/>
           <SmartDataTable
                data={this.props.dailyData.map(data => this.getColumns(data, this.props.vehicles)) }
                name="daily-data-list"
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
  const ready = UserDailyData.subscribeUserDailyData().ready() &&
      UserVehicles.subscribeUserVehicle().ready();
  const dailyData = UserDailyData.find({}, { sort: { inputDate: -1 } }).fetch();
  const vehicles = UserVehicles.find({}).fetch();
  return {
    dailyData,
    vehicles,
    ready,
  };
})(UserDataReactTable);
