import * as React from 'react';
import { FontAwesome as Icon } from '@expo/vector-icons';

export default class GithubButton extends React.PureComponent {
  render() {
    return (
      <Icon.Button name="github" color="#ffff" backgroundColor="#2699FB" onPress={this.props.onPress}>
        SIGN IN
      </Icon.Button>
    );
  }
}
