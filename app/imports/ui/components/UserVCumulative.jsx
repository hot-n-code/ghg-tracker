import React from 'react';
import { Grid, Container, Header } from 'semantic-ui-react';
import ComparisonGraph from './ComparisonGraph';
import ComparisonGraphAll from './ComparisonGraphAll';

const UserVCumulative = () => {
    const date = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"];
    return (
        <Container>
            <Grid stackable>
                <Grid.Column width={8}>
                    <ComparisonGraph/>
                </Grid.Column>
                <Grid.Column width={8}>
                    <ComparisonGraphAll/>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default (UserVCumulative);
