import * as React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BarterScreen from '../screens/barterscreen';
import ExchangeScreen from '../screens/exchangescreen';

const BottomTabNavigator = createBottomTabNavigator({
    ExchangeScreen: {
        screen: ExchangeScreen,
        navigationOptions: { tabBarLabel: 'Exchange Items' },
    },
    BarterScreen: {
        screen: BarterScreen,
        navigationOptions: { tabBarLabel: 'Home' },
    },
});

export default BottomTabNavigator;