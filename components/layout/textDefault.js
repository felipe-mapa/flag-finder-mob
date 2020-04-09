import React from 'react';
import {StyleSheet, Text} from 'react-native' 

const TextDefault = (props) => {
    return (  
        <Text {...props} style={[styles.text, props.style]}>{props.children}</Text>
    );
}
 
const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        textAlign: 'justify',
        color: 'black',
        fontFamily: 'comfortaa'
    }
})

export default TextDefault;