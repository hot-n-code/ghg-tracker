import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import EditDailyData from './EditDailyData';
import DeleteDailyData from './DeleteDailyData';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class HistoryRowData extends React.Component {
    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.transportationData.inputDate.toLocaleDateString()}</Table.Cell>
                <Table.Cell>{this.props.transportationData.modeOfTransportation}</Table.Cell>
                <Table.Cell>{this.props.transportationData.milesTraveled.toFixed(2)}</Table.Cell>
                <Table.Cell>{this.props.transportationData.cO2Reduced.toFixed(2)}</Table.Cell>
                <Table.Cell collapsing><EditDailyData transportationID={this.props.transportationData._id}/></Table.Cell>
                <Table.Cell collapsing><DeleteDailyData transportationID={this.props.transportationData._id}/></Table.Cell>
            </Table.Row>
        );
    }
}

/** Require a document to be passed to this component. */
HistoryRowData.propTypes = {
    transportationData: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(HistoryRowData);
