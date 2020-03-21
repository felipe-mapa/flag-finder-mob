import React from 'react';
import Colors from '../components/layout/Colors'
import { StyleSheet, View, Linking, Text } from 'react-native';


const quizScreen = () => {
    return (
        <View>
            <Text>
                Quiz
            </Text>
        </View>
    );
}

quizScreen.navigationOptions = () => {
    return {
        headerTitle: 'Flag Quiz',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: Colors.primaryColorDark,
            headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'comfortaa-bold',
                textAlign: "center",
                flex: 1
            },
        },
        headerTitleStyle: {
            textAlign: "center",
            flex: 1
        },
    }
}

export default quizScreen