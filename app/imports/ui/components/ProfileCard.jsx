import React from 'react';
import { Card, Header, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

// Renders the profile card component containing the user's data
const ProfileCard = ({ profile }) => (
    <Card fluid>
        <Card.Content textAlign='center'>
            <Image circular style={{ display: 'block',
                margin: '0 auto' }}
                   src={profile.image} size='medium'/>
                   <Card.Header style={{ margin: '7px' }}>
                       <Header as='h1'>{profile.name}</Header>
                   </Card.Header>
            <Card.Meta>
                <Header as='h4'>Email: {profile.email}</Header>
            </Card.Meta>
            <Card.Meta>
                <Header as='h4'>My Goal: {profile.goal}
                </Header>
            </Card.Meta>
            <Button style={{ margin: '8px' }} size='medium'>
                <Link to={`/edit/${profile._id}`}> </Link>Edit Profile
            </Button>
        </Card.Content>
    </Card>
);

// Require a document to be passed to this component
ProfileCard.propTypes = {
    profile: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    goal: PropTypes.string,
    _id: PropTypes.string,
    }).isRequired,
};

export default withRouter(ProfileCard);
