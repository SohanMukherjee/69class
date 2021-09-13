import React, { Component } from 'react';
import {View} from 'react-native';
import { createAppContainer,} from 'react-navigation'; 
import { createBottomTabNavigator} from 'react-navigation-tabs'


import BookTransactionScreen from './screens/BookTransactionScreen';
import SearchScreen from './screens/SearchScreen';


export default class App extends Component {
  render() {
    return (
        <Appcontainer />
    )
  }
}

var tabContainer = createBottomTabNavigator({
 Transaction:{screen:BookTransactionScreen},
  search:{screen:SearchScreen}
})
const Appcontainer = createAppContainer(tabContainer)