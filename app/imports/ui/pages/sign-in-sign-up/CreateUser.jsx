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
import { Users } from '../../../api/user/UserCollection';

const paddingStyle = { padding: 20 };

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = () => new SimpleSchema({
  firstName: { type: String, label: 'First Name', optional: true },
  lastName: { type: String, label: 'Last Name', optional: true },
  goal: { type: String, label: 'Goal', optional: true },
  image: { type: String, label: 'Picture URL', optional: true },
});

/** Renders the createUser Page: what appears after the user logs in. */
class CreateUser extends React.Component {
  /** Redirecting. */
  handleClick = () => {
    // eslint-disable-next-line
    document.location.href = '#/user-page';
  }

  submit(data) {
    /** Gathers user's data and adds it to the userCollection */
    const { goal } = data;
    let { image } = data;
    const email = Meteor.user().username;
    const name = `${data.firstName} ${data.lastName}`;
    if (image === undefined) {
      image = '/images/default/default-pfp.png';
    }
    const allUser = _.pluck(Users.collection.find().fetch(), 'email');
    if (allUser.includes(email)) {
      swal('Error', 'You already have a created user');
    } else {
      Users.collection.insert({ name, goal, email, image },
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
    const formSchema = makeSchema();
    const bridge = new SimpleSchema2Bridge(formSchema);
    let fRef = null;
    return (
        <div style={paddingStyle}>
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">User Creation</Header>
              <AutoForm ref={ref => { fRef = ref; }}
                        schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                <Segment>
                  <Form.Group widths={'equal'}>
                    <TextField id='firstName' name='firstName' required showInlineError={true} placeholder={'first name'}/>
                    <TextField id='lastName' name='lastName' required showInlineError={true} placeholder={'last name'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <TextField id='goal' name='goal' required showInlineError={true} placeholder={'goal'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <TextField id='image' name='image' showInlineError={true} placeholder={'image'}/>
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
  const sub1 = Meteor.subscribe(Users.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(CreateUser);
