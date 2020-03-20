import React from 'react';
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

import Colors from './Colors'

const CustomHeaderButton = (props) => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={29}
            color={Platform.OS === 'android' ? 'white' : Colors.primaryColorDark}
        />
    );
}

export default CustomHeaderButton;