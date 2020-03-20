import React from 'react';
import { Text, StyleSheet } from 'react-native'

const Header = (props) => {
    return <Text style={styles.heading}>{props.children}</Text>
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5
    },
    heading: {
        fontSize: 25,
        color: 'black',
        marginTop: 10,
        fontFamily: 'comfortaa-bold'
    }
})

export default Header;