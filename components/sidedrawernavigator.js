import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AppTabNavigator from './apptabnavigator';
import SideBarMenu from './customsidebarmenu'
import SettingsScreen from '../screens/settingsscreen';

const DrawerTabNavigator = createDrawerNavigator({
    Home: { screen: AppTabNavigator },
    ['Settings Screen']: { screen: SettingsScreen }},
    {contentComponent: SideBarMenu},
    {initialRouteName: 'Home'});

export default DrawerTabNavigator;