import React, { useState } from 'react';
import { Slider } from 'react-semantic-ui-range';
import 'semantic-ui-css/semantic.min.css';
import { Label, Grid, Input } from 'semantic-ui-react';

const button = { marginLeft: '33%', marginRight: '33%', marginTop: '35px' };
const button2 = { marginLeft: '33%', marginRight: '33%', marginTop: '35px' };
// eslint-disable-next-line no-unused-vars
const Gauge = props => {
  const [value, setValue] = useState(0);

  const settings = {
    start: 0,
    min: 0,
    max: 100,
    step: 1,
    // eslint-disable-next-line no-shadow
    onChange: value => {
      setValue(value);
    },
  };

  const handleValueChange = e => {
    // eslint-disable-next-line radix,no-shadow
    let value = parseInt(e.target.value);
    if (!value) {
      value = 0;
    }
    setValue(e.target.value);
  };

  return (
      <Grid>
        <Grid.Column width={5} style={button}>
          <Slider value={value} color="green" settings={settings} />
        </Grid.Column>
        <Grid.Column width={5} style={button2}>
          <Input width={0} placeholder="Enter Value" onChange={handleValueChange} />
          <Label size='large' color="green">{value}</Label>
        </Grid.Column>
      </Grid>
  );
};

export default Gauge;
