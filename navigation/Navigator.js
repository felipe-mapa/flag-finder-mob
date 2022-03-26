import React from 'react';
import { Dimensions, StatusBar } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
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
        backgroundColor: Colors.primaryColor
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
        screen: FavoritesScreen,
        navigationOptions: {
            backgroundColor: Colors.primaryColor,
        }
    },
    Country: CountryInfoScreen
})

// QUIZ NAVIGATION
const QuizNavigator = createStackNavigator({
    Quiz: {
        screen: QuizScreen,
        navigationOptions: {
            backgroundColor: Colors.primaryColor,
            headerTitleStyle: {
                textAlign: "center",
                flex: 1,
            },
        }
    },
    Game: GameScreen,
    Scores: ScoresScreen
})

// BOTTOM TAB NAVIGATOR
const CountriesBottomNavigator = createBottomTabNavigator({
    Search: {
        screen: CountryNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="search" size={25} color={tabInfo.tintColor} />
            }
        },
        tabBarLabel: 'Search'
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="heart-outline" size={25} color={tabInfo.tintColor} />
            }
        }
    },
    Quiz: {
        screen: QuizNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="game-controller-outline" size={25} color={tabInfo.tintColor} />
            },
        }
    },
    More: {
        screen: QuizScreen,
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: tabInfo => {
                return <Ionicons name="ellipsis-horizontal-sharp" size={25} color={tabInfo.tintColor} />
            },
            tabBarOnPress: () => { navigation.openDrawer() }
        }),
    },
}, {
    tabBarOptions: {
        activeBackgroundColor: Colors.primaryColor,
        activeTintColor: 'white',
        inactiveBackgroundColor: 'white',
        inactiveTintColor: 'black'
    }
})

//DRAWER NAVIGATOR
const DrawerNavigator = createDrawerNavigator(
    {
        CountriesBottomNavigator,
    },
    {
        drawerPosition: "right",
        contentComponent: DrawerScreen,
        drawerWidth: screenWidth / 2,
    }
)

export default createAppContainer(DrawerNavigator);