import { Container, Divider, Loader, Header, Input, Table } from 'semantic-ui-react';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import SmartDataTable from 'react-smart-data-table';
import { withTracker } from 'meteor/react-meteor-data';
// import { Redirect } from 'react-router-dom';
import AddDailyData from '../../components/user-data-page/AddDailyData';
// import HistoryRowData from '../../components/user-data-page/HistoryRowData';
import { DailyUserData } from '../../../api/user/ghg-data/DailyUserDataCollection';
import WhatIf from '../../components/user-data-page/WhatIf';
import 'react-smart-data-table/dist/react-smart-data-table.css';

class UserDataReactTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: '',
      // redirectToProfile: false,
      // profileId: undefined,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  getColumns(dailyData) {
    return { date: dailyData.inputDate, modeOfTransportation: dailyData.modeOfTransportation, milesTraveled: dailyData.milesTraveled, c02reduced: dailyData.c02reduced };
  }

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

  onRowClick = (event, { rowData }) => {
    // const profileId = Users.collection.findOne({ username: rowData.email })._id;
    // this.setState({ profileId: profileId, redirectToProfile: true });
    console.log(rowData);
  }

   renderPage() {
     // if (this.state.redirectToProfile) {
     //   return <Redirect to={`/user-page/${this.state.profileId}/`}/>;
     // }
     const { filterValue } = this.state;
     return (
         <Container id="profileList-page">
           <Divider hidden/>
           <Input
               list='filter'
               placeholder='Filter results..'
               icon='search'
               type='text'
               value={filterValue}
               onChange={this.handleOnChange}
           />
           <Table size='large' celled padded striped stackable >
             <Table.Header fullWidth>
               <Table.Row>
                 <Table.HeaderCell textAlign='center'>
                   <Header as='h1' textAlign='center'>My Transportation History</Header>
                   <Header as='h1' textAlign='center'><AddDailyData/><WhatIf/></Header>
                 </Table.HeaderCell>
               </Table.Row>
             </Table.Header>
           </Table>
           <SmartDataTable
                data={this.props.dailyData.map(this.getColumns) }
                name="profile-list"
                className="ui compact selectable table"
                sortable
                onRowClick={this.onRowClick()}
                withToggles
                perPage={25}
                filterValue={filterValue}
           />
           <Divider hidden/>
         </Container>
     );
  }
}

UserDataReactTable.propTypes = {
  dailyData: PropTypes.array.isRequired,
  // users: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const ready = Meteor.subscribe(DailyUserData.userPublicationName).ready();
  const dailyData = DailyUserData.collection.find({}, { sort: { inputDate: -1 } }).fetch();
  return {
    dailyData,
    ready,
  };
})(UserDataReactTable);
