import React from 'react';
import { Grid, Button, Image } from 'semantic-ui-react';

/** Renders the Page for adding a document. */
class UserPage extends React.Component {
    /** IMAGES AS TEMP PLACEHOLDERS ADDED FOR MAPS */
    render() {
        return (
            <Grid container>
                <Grid.Column width={8}>
                    <h1>My Progress</h1>
                    <div id='graph-buttons'>
                        <Button size='large' color='gray'>Today</Button>
                        <Button size='large' color='gray'>This Week</Button>
                        <Button size='large' color='gray'>This Month</Button>
                    </div>
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/2/27/Wkipedia_blank_world_map.jpg"
                           floated='left' size='massive' alt="filler placement for eventual graph"/>
                </Grid.Column>
                <Grid.Column width={8}>
                    <h1>My Carbon Footprint</h1>
                    <Grid.Column>
                        <Image src="" size='medium' alt="filler placement for eventual meter"/>
                    </Grid.Column>
                </Grid.Column>
                <Grid container>
                    <Grid.Column>
                        <div id='specific-stats'>
                            <h1>My Numbers for February 8, 2021</h1>
                            <div>
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/2/27/Wkipedia_blank_world_map.jpg"
                                       floated='left' size='medium' alt="filler placement for eventual graph"/>
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/2/27/Wkipedia_blank_world_map.jpg"
                                       size='medium' alt="filler placement for eventual graph"/>
                                <Image src=""
                                       size='medium' alt="filler placement for eventual graph"/>
                            </div>
                            <h1>Your Carbon Dioxide Emission is up 2% from yesterday.</h1>
                            <h2>My Transportation History</h2>
                        </div>
                    </Grid.Column>
                </Grid>
            </Grid>
        );
    }
}

export default UserPage;
