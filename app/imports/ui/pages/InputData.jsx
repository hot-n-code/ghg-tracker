import React from 'react';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'uniforms-semantic';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  date: Date,
  modeOfTransportation: {
    type: String,
    allowedValues: ['Telework', 'Public Transportation', 'Biking', 'Walking', 'Carpool', 'Electric Vehicle'],
  },
  roundTripMiles: Number,
  autoMPG: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class InputData extends React.Component {

  /** On submit, insert the data and compute GHG. */
  submit(data, formRef) {
    const { date, modeOfTransportation, roundTripMiles, autoMPG } = data;
    const owner = Meteor.user().username;
    GHGDataCollection.collection.insert({ date, modeOfTransportation, roundTripMiles, autoMPG },
        (error) => {
          if (error) {
            swal ('Error', error.message, 'error');
          } else {
            swal ('Success', 'Data added and computed successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Input New Data</Header>
            <AutoForm ref={ref = > { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField date='date'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    )
  }
}