import React, { useState } from 'react';
import { Header, Container, Form, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
const space = { paddingTop: '25px' };
const FeedbackWidget = () => {
  const [type, setType] = useState('');

  const handleChange = (e, { value }) => {
    setType(value);
  };

  return (
      <Container>
        <Container>
          <Header as='h1' className='centered'>Feedback</Header>
          <Header sub className='centered'>
            Feedback helps us to understand where improvements are needed. Please let us know.
          </Header>
        </Container>
        <Container>
          <Form action="#" style={space}>
            <Form.Group widths='equal'>
              <Form.Input htmlFor="nameField" fluid label='Name (Optional):' placeholder='Name' />
              <Form.Input htmlFor="emailField" fluid label='Email:' placeholder='Email' required />
            </Form.Group>
            <Form.Group inline style={space}>
              <label htmlFor="typeField">Feedback Type:</label>
              <Form.Radio
                  label='Problem'
                  value='p'
                  checked={type === 'p'}
                  onChange={handleChange}
              />
              <Form.Radio
                  label='Feature'
                  value='f'
                  checked={type === 'f'}
                  onChange={handleChange}
              />
              <Form.Radio
                  label='Question'
                  value='q'
                  checked={type === 'q'}
                  onChange={handleChange}
              />
            </Form.Group>
            <Form.TextArea rows="10" cols="66" label='Feedback:' placeholder='Let us know more here...' required style={space}/>
            <Grid columns={2} style={space}>
              <Form.Button inverted color='red' type="reset" className="btn btn-default">Reset</Form.Button>
              <Form.Button inverted color='green' type="submit" className="btn btn-default">Submit</Form.Button>
            </Grid>
          </Form>
        </Container>
      </Container>
  );
};

export default FeedbackWidget;
