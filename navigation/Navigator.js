import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
//import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import SearchScreen from '../screens/SearchScreen'
import CountryInfoScreen from '../screens/CountryInfoScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import ScanScreen from '../screens/ScanScreen'
import InfoScreen from '../screens/InfoScreen'
import FlagErrorScreen from '../screens/FlagErrorScreen'
import Colors from '../components/layout/Colors'
import ScanButton from '../components/layout/scanButton'

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primaryColorDark
    },
    headerTitleStyle: {
        fontFamily: 'comfortaa-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'comfortaa-bold'
    },
    keyboardHidesTabBar: true
}

//COUNTRY NAVIGATION
const CountryNavigator = createStackNavigator({
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            header: null
        }
    },
    Country: CountryInfoScreen,
    Contact: FlagErrorScreen
}, { defaultNavigationOptions: defaultStackNavOptions })

//FAVORITES NAVIGATION
const FavNavigator = createStackNavigator({
    Favorites: {
        screen: FavoritesScreen
    },
    Country: CountryInfoScreen
})

//ERROR NAVIGATION
const ErrorNavigator = createStackNavigator({
    Contact: {
        screen: FlagErrorScreen,
        navigationOptions: {
            headerTitleStyle: {
              textAlign: "center",
              flex: 1
            },
        }
    }
})

//INFO NAVIGATION
const InfoNavigator = createStackNavigator({
    Info: InfoScreen
})

// BOTTOM TAB NAVIGATION
const CountriesBottomNavigator = createBottomTabNavigator({
    Search: {
        screen: CountryNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="md-search" size={25} color={tabInfo.tintColor} />
            }
        },
        tabBarLabel: 'Search'
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-heart-empty" size={25} color={tabInfo.tintColor} />
            }
        }
    },
    // Scan: {
    //     screen: ScanScreen,
    //     navigationOptions: {
    //         tabBarIcon: <ScanButton />
    //     }
    // },
    Contact: {
        screen: ErrorNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <FontAwesome name="flag-o" size={25} color={tabInfo.tintColor} />
            }
        }
    },
    Info: {
        screen: InfoNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="md-information-circle-outline" size={25} color={tabInfo.tintColor} />
            }
        }
    },
}, {
    tabBarOptions: {
        activeBackgroundColor: Colors.primaryColorDark,
        activeTintColor: 'white',
        inactiveBackgroundColor: 'white',
        inactiveTintColor: 'black'
    }
})

// const ReportFormNavigator = createStackNavigator({
//     ReportForm: ReportFormScreen
// })

// //DRAWER NAVIGATION
// const DrawerNavigator = createDrawerNavigator({
//     Search: CountriesBottomNavigator,
//     ReportForm: ReportFormNavigator
// })

export default createAppContainer(CountriesBottomNavigator);