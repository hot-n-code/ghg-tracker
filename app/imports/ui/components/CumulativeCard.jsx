import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single vehicle card. */
class CumulativeCard extends React.Component {
  render() {
    return (
        <Card centered link className={'vehicle-card'} style={{ minHeight: 280 }}>
          <Card.Content>
            <Image src={this.props.user.img} centered size='small' style={{ height: 130 }}/>
            <Card.Header className={'vehicle-card-header'}>
              {this.props.user.title}
            </Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Button inverted color='green'>
              {this.props.user.data}
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Currently, placeholder vehicle data is passed to this component. In production, require a document to be passed to this component. */
CumulativeCard.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CumulativeCard);
