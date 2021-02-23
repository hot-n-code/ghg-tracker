import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  inputDate: Date,
  modeOfTransportation: {
    type: String,
    allowedValues: ['Alternative Fuel Vehicle', 'Biking', 'Carpool', 'Electric Vehicle', 'Public Transportation', 'Telework', 'Walking'],
  },
  milesTraveled: Number,
  cO2Reduced: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for inputting daily data */
class InputDailyUserData extends React.Component {

  /** On submit, insert data. */
  submit(data, formRef) {
    const { inputDate, modeOfTransportation, milesTraveled } = data;
    const owner = Meteor.user().username;
    DailyUserData.collection.insert({ inputDate, modeOfTransportation, milesTraveled, owner }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Data added successfully', 'success');
        formRef.reset();
      }
    });
  }

  /** Render the form. Uses Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <div className='background-all'>
          <Grid stackable container centered>
            <Grid.Column>
              <Header as="h1" textAlign="center">Input Your Daily Data</Header>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                <Segment>
                  <DateField name='inputDate' max={new Date(Date.now())}/>
                  <SelectField name='modeOfTransportation'/>
                  <NumField name='milesTraveled'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default InputDailyUserData;
