import React from 'react';
import { Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, DateField, ErrorsField, HiddenField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';

const bridge = new SimpleSchema2Bridge(DailyUserData.schema);

/** Renders the Page for editing daily data */
class EditDailyData extends React.Component {

  /** On successful submit, update data. */
  submit(data) {
    const { date, modeOfTransportation, milesTraveled, _id } = data;
    DailyUserData.collection.update(_id, { $set: { date, modeOfTransportation, milesTraveled } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting your data</Loader>;
  }

  /** Render the form. Uses Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
      <Grid stackable container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Daily Data</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <DateField name='date'/>
              <SelectField name='modeOfTransportation'/>
              <NumField name='milesTraveled'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require the presence of a DailyData document in the props object. Uniforms adds 'model' to the props, which we use. */
EditDailyData.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing : _id.
  const documentId = match.params._id;
  // Get access to Edit data.
  const subscription = Meteor.subscribe(DailyUserData.userPublickationName);
  return {
    doc: DailyUserData.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditDailyData);
