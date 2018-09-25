import * as React from 'react';
import { Button, Form } from 'semantic-ui-react';

type Props = {};

type State = {
  target: string,
}

export class ShortenForm extends React.Component<Props, State> {
  state = {
    target: '',
  }

  handleChange = (event, { value }) => {
    event.preventDefault()
    this.setState({
      target: value,
    })
  }

  handleSubmit = () => {
    console.log(this.state)
  }

  public render () {
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
      </Form>
    );
  }
}
