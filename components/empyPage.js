import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Button } from 'react-native-elements'

import DefaultText from './layout/TextDefault'
import Colors from './layout/Colors'

const EmptyPage = props => {

    return (
        <View style={styles.screen}>
            <DefaultText style={styles.text}>{props.children}</DefaultText>
            <Button
            type="solid"
            title={props.title}
            onPress={() => props.navigation.navigate(props.page)}
            buttonStyle={styles.button}
          />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginVertical: 20
    },
    button: {
        paddingHorizontal: 10,
        backgroundColor: Colors.primaryColor
    }
})

export default EmptyPage;