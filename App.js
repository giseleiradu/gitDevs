import React from 'react';
import AppNavigator from './appNavigator';
import { createAppContainer } from 'react-navigation';


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component<Props > {
  render() {
    return <AppContainer />;
  }
}