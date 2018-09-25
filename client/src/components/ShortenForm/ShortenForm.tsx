import { Button, Container, Form, Header, Segment } from 'semantic-ui-react';
import * as React from 'react';

import { shorten } from '../../services/shorten';

type Props = {};

type State = {
  target: string,
  hash: string
}

const ROOT_URL = 'http://localhost:3000/v1/url/'

export class ShortenForm extends React.Component<Props, State> {
  state = {
    target: '',
    hash: '',
  }

  handleChange = (event, { value }) => {
    event.preventDefault()
    this.setState({
      target: value,
    })
  }

  handleSubmit = async () => {
    const { target } = this.state
    if (target) {
      const { hash } = await shorten(this.state)
      console.log(hash)
      this.setState({
        hash,
      })
    }
  }

  public render () {
    const { hash } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <Form.Input
            label="Full URL"
            placeholder="Paste your URL"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button primary>Shorten</Button>
        <Container>
          {hash && (
            <Segment>
              <Header as="h3">
                Shortened URL:
              </Header>
              <p><a href={ROOT_URL + hash} target="_blank">{ROOT_URL + hash}</a></p>
              <p><a href={`${ROOT_URL}${hash}/stats`} target="_blank">Check this link's stats</a></p>
            </Segment>
          )}
        </Container>
      </Form>
    );
  }
}
