import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, StyleSheet, Linking } from 'react-native';
import { Foundation } from '@expo/vector-icons';

import Colors from '../components/layout/Colors'
import TextDefault from '../components/layout/TextDefault'

const DrawerScreen = (props) => {

    return (
        <SafeAreaView style={styles.screen} forceInset={{ top: 'always' }}>
            <View style={styles.container}>
                <TextDefault style={styles.text} onPress={() => props.navigation.navigate('Search')}>
                    Search
                </TextDefault>
                <TextDefault style={styles.text} onPress={() => props.navigation.navigate('Favorites')}>
                    Favorites
                </TextDefault>
                <TextDefault style={styles.text} onPress={() => props.navigation.navigate('Quiz')}>
                    Quiz
                </TextDefault>
                <TextDefault style={styles.text} onPress={() => props.navigation.navigate('Contact')}>
                    Contact
                </TextDefault>
            </View>
            <View style={styles.container}>
                <TextDefault style={styles.containerBottom}>
                    Developed with <Foundation name="heart" size={18} color={Colors.secondaryColor} /> by <TextDefault style={styles.clickable} onPress={() => Linking.openURL('https://pavanela.com')}>pavanela.com</TextDefault>
                </TextDefault>
                <TextDefault style={styles.textBottom}>
                    <TextDefault style={styles.textBottomWhite}>Version: </TextDefault>
                    2.1.0
                </TextDefault>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: '7%',
        flex: 1,
        backgroundColor: Colors.primaryColor,
        display: "flex",
        justifyContent: "space-between"
    },
    container: {
        paddingLeft: '7%',
        paddingBottom: '7%'
    },
    text: {
        color: '#fff',
        fontSize: 20,
        borderBottomWidth: 3,
        borderColor: Colors.secondaryColor,
        margin: 5
    },
    containerBottom: {
        color: '#fff',
        textAlign: 'left',
        marginBottom: 10
    },
    textBottom: {
        color: Colors.secondaryColor
    },
    textBottomWhite: {
        color: '#fff'
    },
    clickable: {
        color: Colors.secondaryColor,
        borderBottomWidth: 2,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: Colors.secondaryColor,
        fontSize: 18,
    },
})

export default DrawerScreen;