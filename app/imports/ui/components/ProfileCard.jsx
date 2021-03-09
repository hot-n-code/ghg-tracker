import React from 'react';
import { Card, Header, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

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
                    <Card.Meta>
                        <Header as='h4'>Email: {this.props.profile.email}</Header>
                    </Card.Meta>
                    <Card.Meta>
                        <Header as='h4'>My Goal: {this.props.profile.goal}
                        </Header>
                    </Card.Meta>
                    <Button style={{ margin: '20px' }} size='medium'>
                        <Link to={`/edit/${this.props.profile._id}`}> </Link>Edit Profile
                    </Button>
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
