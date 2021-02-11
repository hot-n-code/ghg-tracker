import React from 'react';
import { Container, Header, Form, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class FeedBack extends React.Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state;
    return (
        <Container>
          <Container fluid>
            <Header as='h1' className='centered'>
              Feedback
            </Header>
            <Header sub className='centered'>
              Feedback helps us to understand where improvements are needed. Please let us know.
            </Header>
          </Container>
          <Form action="#">
            <Form.Group widths='equal'>
              <Form.Input htmlFor="nameField" fluid label='Name (Optional):' placeholder='Name' />
              <Form.Input htmlFor="emailField" fluid label='Email:' placeholder='Email' required="true" />
            </Form.Group>
            <Form.Group inline>
              <label htmlFor="typeField">Feedback Type:</label>
              <Form.Radio
                  label='Problem'
                  value='p'
                  checked={value === 'p'}
                  onChange={this.handleChange}
              />
              <Form.Radio
                  label='Feature'
                  value='f'
                  checked={value === 'f'}
                  onChange={this.handleChange}
              />
              <Form.Radio
                  label='Question'
                  value='q'
                  checked={value === 'q'}
                  onChange={this.handleChange}
              />
            </Form.Group>
            <Form.TextArea rows="10" cols="66" label='Feedback:' placeholder='Let us know more here...' required="true"/>
            &nbsp;&nbsp;
            <Grid columns={2}>
              <Form.Button basic color='red' type="reset" className="btn btn-default">Reset</Form.Button>
              <Form.Button basic color='green' type="submit" className="btn btn-default">Submit</Form.Button>
            </Grid>
          </Form>
        </Container>
    );
  }
}

export default FeedBack;
