import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import ComparisonGraph from './ComparisonGraph';
import ComparisonGraphAll from './ComparisonGraphAll';
import { allCO2Produced, allCOReduced } from './ComparisonGraphAll';
import { totalCO2Produced, totalCO2Reduced } from './ComparisonGraph';

const UserVCumulative = () => {
    return (
        <Container>
            <Grid>
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
