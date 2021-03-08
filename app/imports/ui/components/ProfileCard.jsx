import React from 'react';
import { Button, Card, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCard extends React.Component {
    render() {
        return (
            <Card fluid>
                <Card.Content textAlign='center'>
                    <Image circular style={{ display: 'block',
                        margin: '0 auto' }}
                           src={this.props.profile.image} size='medium'/>
                    <Card.Header style={{ margin: '9px' }}>
                        <Header as='h1'>{this.props.profile.name}</Header>
                    </Card.Header>
                    <Card.Header>
                        <Header as='h4'>My Goal:
                        </Header>
                        {this.props.profile.goal}
                    </Card.Header>
                    <Card.Meta>
                        <Header as='h4'>My Overall CO2 Emissions: 5 lbs</Header>
                    </Card.Meta>
                    <Button style={{ margin: '20px' }} size='medium' color='gray'>Edit Profile</Button>
                </Card.Content>
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
ProfileCard.propTypes = {
    profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileCard);
