import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/UserCollection';
import { UserVehicle } from '../../api/user/UserVehicleCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allVehicles) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First Name', optional: true },
  lastName: { type: String, label: 'Last Name', optional: true },
  image: { type: String, label: 'Picture URL', optional: true },
  vehicles: { type: Array, label: 'Vehicles', optional: true },
  'vehicles.$': { type: String, allowedValues: allVehicles },
});

/** Renders the createProfile Page: what appears after the user logs in. */
class CreateUser extends React.Component {
  /** Redirecting. */
  handleClick = () => {
    // eslint-disable-next-line
    document.location.href = '/';
  }

  submit(data) {
    const { firstName, lastName } = data;
    const email = Meteor.user().username;
    const image = 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
    const allUser = _.pluck(Users.collection.find().fetch(), 'email');
    if (allUser.includes(email)) {
      swal('Error', 'You already have a created profile');
    } else {
      Users.collection.insert({ firstName, lastName, email, image },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal('Success', 'User created successfully', 'success');
            }
          });
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const email = Meteor.user().username;
    // Create the form schema for uniforms. Need to determine all interests and jams for multi select list.
    const allVehicles = _.pluck(UserVehicle.collection.find().fetch(), 'user');
    const formSchema = makeSchema(allVehicles);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the user information.
    const vehicles = _.pluck(UserVehicle.collection.find({ profile: email }).fetch(), 'model');
    const user = Users.collection.findOne({ email });
    const model = _.extend({}, user, { vehicles });
    let fRef = null;
    return (
        <div className="bg-image">
          <Grid id="createProfile-page" container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>User Creation</Header>
              <AutoForm ref={ref => { fRef = ref; }}
                        model={model} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                <Segment>
                  <Form.Group widths={'equal'}>
                    <TextField id='firstName' name='firstName' required showInlineError={true} placeholder={'firstName'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <TextField id='lastName' name='lastName' required showInlineError={true} placeholder={'lastName'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                  </Form.Group>
                  <SubmitField value='Add' onClick={this.handleClick}/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

CreateUser.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(UserVehicle.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(CreateUser);
