import { Container, Header, Segment } from 'semantic-ui-react';
import * as React from 'react';

import { ShortenForm } from '../ShortenForm';

type Props = {};

export const Main: React.SFC<Props> = () => (
  <React.Fragment>
    <Segment
      inverted
      style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10rem',
      }}
      vertical
    >
      <Header as="h1" inverted>URL Shortener</Header>
    </Segment>
    <Container
      style={{
        maxWidth: '30rem',
      }}
    >
      <Segment>
        <ShortenForm />
      </Segment>
    </Container>
  </React.Fragment>
);
