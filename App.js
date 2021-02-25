import * as React from 'react';
import SignUpLoginScreen from './screens/signuploginscreen';
import DrawerTabNavigator from './components/sidedrawernavigator';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

export default function App() {
  return <AppContainer />;
}

const SwitchNavigator = createSwitchNavigator({
  SignUpLoginScreen: SignUpLoginScreen,
  DrawerTabNavigator: { screen: DrawerTabNavigator }
});

const AppContainer = createAppContainer(SwitchNavigator);