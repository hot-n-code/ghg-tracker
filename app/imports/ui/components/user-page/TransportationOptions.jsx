import React from 'react';
import { Header, Card, Image, Button } from 'semantic-ui-react';

const paddingStyle = { padding: '20px' };
const rideStyle = { height: '200px', width: '300px' };

// Lists alternative transportation options by island
const TransportationOptions = () => (
  <div style={paddingStyle}>
      <Header as='h1' textAlign='center'>Oahu</Header>
      <Card.Group style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px',
          paddingBottom: '20px' }}>
          <Card>
              <Card.Content>
                  <Card.Header>Biki</Card.Header>
                  <Card size='medium' color='teal'>
                      <Image style={rideStyle}
                             src='https://kitv.images.worldnow.com/images/17721408_G.jpg?auto=webp&disable=
                                   upscale&height=560&fit=bounds&lastEditedDate=1539244048000'/>
                  </Card>
                  <Button href='https://gobiki.org/map-of-biki-stops' target='_blank'>
                      Learn More
                  </Button>
              </Card.Content>
          </Card>
          <Card>
              <Card.Content>
                  <Card.Header>The Bus</Card.Header>
                  <Card size='medium' color='teal'>
                   <Image style={rideStyle}
                   src='https://hawaii-com-wp.s3.us-west-1.amazonaws.com/wp-content/uploads/2004/12/08100000/thebus.jpg'
                        />
                  </Card>
                  <Button href='http://hea.thebus.org/' target='_blank'>
                      Learn More
                  </Button>
              </Card.Content>
          </Card>
          <Card>
              <Card.Content>
                  <Card.Header>HUI Car Share</Card.Header>
                  <Card size='medium' color='teal'>
                    <Image style={rideStyle}
                    src='https://mediad.publicbroadcasting.net/p/khpr/files/styles/x_large/public/201807/IMG_5759-2.jpg'
                    />
                  </Card>
                  <Button href='https://www.drivehui.com/' target='_blank'>
                      Learn More
                  </Button>
              </Card.Content>
          </Card>
      </Card.Group>
      <Header as='h1' textAlign='center'>Neighbor Islands</Header>
      <Card.Group style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
          <Card>
              <Card.Content>
                  <Card.Header>Hele-On (Big Island)</Card.Header>
                  <Card size='medium' color='teal'>
                      <Image style={rideStyle}
                             src='https://hilo.hawaii.edu/campuslife/images/campuslife/HELEON_383x362.jpg'
                      />
                  </Card>
                  <Button href='http://www.heleonbus.org/schedules-and-maps/general-information'
                          target='_blank'>
                      Learn More
                  </Button>
              </Card.Content>
          </Card>
          <Card>
              <Card.Content>
                  <Card.Header>Maui Bus (Maui)</Card.Header>
                  <Card size='medium' color='teal'>
                      <Image style={rideStyle}
                             src='https://airports.hawaii.gov/ogg/wp-content/uploads/sites/7/2016/07/MauiBus.jpg'
                      />
                  </Card>
                  <Button href='https://www.mauibus.org/map'
                          target='_blank'>
                      Learn More
                  </Button>
              </Card.Content>
          </Card>
          <Card>
              <Card.Content>
                  <Card.Header>The Kaua&apos;i Bus (Kauai)</Card.Header>
                  <Card size='medium' color='teal'>
                   <Image style={rideStyle}
                   src='https://www.thegardenisland.com/wp-content/uploads/2017/06/7bb6da5b281a42d51a9dc1d9ac37709f.jpg'
                   />
                  </Card>
                  <Button href='https://www.kauai.com/kauai-bus'
                          target='_blank'>
                      Learn More
                  </Button>
              </Card.Content>
          </Card>
      </Card.Group>
  </div>
);

export default TransportationOptions;
