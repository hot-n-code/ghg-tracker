import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField } from 'uniforms-semantic';
import { Button, Modal } from 'semantic-ui-react';
import { DailyUserData } from '../../api/ghg-data/DailyUserDataCollection';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  inputDate: Date,
  modeOfTransportation: String,
  milesTraveled: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for inputting daily data */
class InputDailyUserData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  /** Handles the state of the modal (close or open) */
  handleModalOpen = () => this.setState({ modalOpen: true });

  handleModalClose = () => this.setState({ modalOpen: false });

  /** On submit, insert data. */
  submit(data, formRef) {
    const { inputDate, modeOfTransportation, milesTraveled } = data;
    const owner = Meteor.user().username;
    const cO2Reduced = 15;
    DailyUserData.collection.insert({ inputDate, modeOfTransportation, milesTraveled, owner, cO2Reduced }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Data added successfully', 'success');
        this.handleModalClose();
        formRef.reset();
      }
    });
  }

  /** Render the form. Uses Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
      <Modal size='tiny'
             closeIcon
             open={this.state.modalOpen}
             onClose={this.handleModalClose}
             onOpen={this.handleModalOpen}
             trigger={<Button>Add Data</Button>}
      >
        <Modal.Header>Add Daily Data</Modal.Header>
        <Modal.Content>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge}
                    onSubmit={data => { this.submit(data, fRef); }}>
            <DateField name='inputDate' max={new Date(Date.now())}/>
            <SelectField name='modeOfTransportation'/>
            <NumField name='milesTraveled'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </AutoForm>
        </Modal.Content>
      </Modal>
    );
  }
}

export default InputDailyUserData;
