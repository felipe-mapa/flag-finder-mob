import React from 'react';
import {
    Dimensions,
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { Input, Button } from 'react-native-elements'

import DefaultText from '../components/layout/textDefault'
import Colors from '../components/layout/Colors'

const customFlatList = props => {

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

export default customFlatList;