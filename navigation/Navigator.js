import React from 'react';
import { Dimensions } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, createTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons';

import SearchScreen from '../screens/SearchScreen'
import CountryInfoScreen from '../screens/CountryInfoScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import QuizScreen from '../screens/QuizScreen'
import DrawerScreen from '../screens/DrawerScreen'
import FlagErrorScreen from '../screens/FlagErrorScreen'
import GameScreen from '../screens/GameScreen'
import ScoresScreen from '../screens/ScoresScreen'

import Colors from '../components/layout/Colors'

const screenWidth = Dimensions.get('screen').width;

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

// FAVORITES NAVIGATION
const FavNavigator = createStackNavigator({
    Favorites: {
        screen: FavoritesScreen
    },
    Country: CountryInfoScreen
})

// QUIZ NAVIGATOR
const QuizNavigator = createStackNavigator({
    Quiz: {
        screen: QuizScreen,
        navigationOptions: {
            headerTitleStyle: {
                textAlign: "center",
                flex: 1
            },
        }
    },
    Game: GameScreen,
    Scores: ScoresScreen
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
    Quiz: {
        screen: QuizNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="logo-game-controller-b" size={25} color={tabInfo.tintColor} />
            },
        }
    },
    More: {
        screen: QuizScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-more" size={25} color={tabInfo.tintColor} />
            },
            tabBarOnPress: () => { navigation.openDrawer() }
        }),
    },
}, {
    tabBarOptions: {
        activeBackgroundColor: Colors.primaryColorDark,
        activeTintColor: 'white',
        inactiveBackgroundColor: 'white',
        inactiveTintColor: 'black'
    }
})

//DRAWER NAVIGATION
const DrawerNavigator = createDrawerNavigator(
    {
        CountriesBottomNavigator,
    },
    {
        drawerPosition: "right",
        contentComponent: DrawerScreen,
        drawerWidth: screenWidth / 2
    }
)

export default createAppContainer(DrawerNavigator);