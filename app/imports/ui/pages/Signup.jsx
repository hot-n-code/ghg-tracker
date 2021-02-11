import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <div className='background-all'>
          <div className='signup'>
      <Grid centered container className='signup-page'>
        <Grid.Column>
          <div style={{ marginRight: 'auto', marginLeft: 'auto', paddingBottom: '40px', paddingTop: '40px', width: '800px' }}>
            <Header as='h2' textAlign='center'>Start tracking your greenhouse gas emissions!</Header>
            <Segment padded color='gray'>
              <Form onSubmit={this.submit}>
                <Form.Group widths='equal'>
                  <Form.Input
                    required
                    label='First name'
                    name='first name'
                    placeholder='First name'
                    onChange={this.handleChange}
                    />
                  <Form.Input
                    required
                    label='Last name'
                    name='last name'
                    placeholder='Last name'
                    onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                      required
                      label='Email'
                      icon='user'
                      iconPosition='left'
                      name='email'
                      type='email'
                      placeholder='Email address'
                      onChange={this.handleChange}
                    />
                  <Form.Input
                      required
                      label='Confirm email'
                      placeholder='Please retype your email'
                    />
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input
                    required
                    label='Password'
                    icon='lock'
                    iconPosition='left'
                    name='password'
                    placeholder='Password'
                    type='password'
                    onChange={this.handleChange}
                    />
                  <Form.Input
                    required
                    label='Confirm password'
                    placeholder='Please retype your password'
                    type='password'
                    />
                </Form.Group>
                <Form.Button primary animated content='Submit'>
                  <Button.Content visible>Submit</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right'/>
                  </Button.Content>
                </Form.Button>
              </Form>
            </Segment>
            <Message>
              <Link to='/signin'>Already have an account? Login</Link>
            </Message>
            {this.state.error === '' ? (
                ''
            ) : (
                <Message
                    color='red'
                    error
                    header='Registration was not successful'
                    content={this.state.error}
                />
            )}
          </div>
        </Grid.Column>
      </Grid>
          </div>
        </div>
    );
  }
}
// todo make sure that confirming email and password actually work.

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
