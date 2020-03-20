import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const Heading = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 0,
        alignItems: 'center',
        flex: 1,
        width: '100%'
    },
    heading: {
        fontSize: 30,
        color: 'black',
        fontFamily: 'comfortaa-bold',
        textAlignVertical: 'bottom'
    }
})

export default Heading;