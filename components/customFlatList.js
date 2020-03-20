import React from 'react';
import {
    ScrollView,
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import SingleCountry from '../components/singleCountry'
import Colors from '../components/layout/Colors'

const customFlatList = props => {
    return (
        <ScrollView removeClippedSubviews={true}>
            <View style={styles.screen}>
                {props.length > 0 ? (
                    <FlatList
                        //onEndReached={loadCountries} // LOAD AS IT GOES
                        keyExtractor={item => item.id}
                        data={props.data}
                        numColumns={3}
                        columnWrapperStyle={styles.container}
                        renderItem={itemData => {
                            return (
                                < TouchableOpacity onPress={() => props.onPress(itemData.item.id, itemData.item.name, itemData.item.mainColor)}>
                                    <SingleCountry name={itemData.item.name} flag={itemData.item.flag} conNum={props.data.length} />
                                </TouchableOpacity >
                            )
                        }
                        }
                    />
                ) : (
                        <ActivityIndicator size="large" color={Colors.primaryColorDark} />
                    )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        padding: 10,
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        height: '100%',
        //paddingBottom: 20
    },
})

export default customFlatList;