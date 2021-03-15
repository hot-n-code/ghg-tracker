import React from 'react';
import { Card, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import EditProfile from './EditProfile';

// Renders the profile card component containing the user's data
const ProfileCard = ({ profile }) => (
    <Card fluid>
        <Card.Content textAlign='center'>
            <Image circular style={{ display: 'block',
                margin: '0 auto' }}
                   src={profile.image} size='medium'/>
                   <Card.Header style={{ margin: '9px' }}>
                       <Header as='h1'>{profile.name}</Header>
                   </Card.Header>
            <Card.Meta>
                <Header as='h4'>Email: {profile.email}</Header>
            </Card.Meta>
            <Card.Meta>
                <Header as='h4'>My Goal: {profile.goal}
                </Header>
            </Card.Meta>
                <EditProfile profileID={profile._id}/>
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
