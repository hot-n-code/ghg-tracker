import React from 'react';
import { Grid } from 'semantic-ui-react';
import ComparisonGraph from "./ComparisonGraph";
import ComparisonGraphAll from "./ComparisonGraphAll";

// Displaying a pie chart of the mode of transportation from DailyUserData collection
const UserVCumulative = () => {
    // NEXT: ADD CUMULATIVE, ADD POPUP THAT WARNS/CONGRATULATES USER BASED ON COMPARISON
    return (
        <Grid>
            <Grid.Column width={8}>
                <ComparisonGraph/>
            </Grid.Column>
            <Grid.Column width={8}>
                <ComparisonGraphAll/>
            </Grid.Column>
        </Grid>
    );
};

export default (UserVCumulative);
