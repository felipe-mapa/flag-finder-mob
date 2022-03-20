import React from 'react';
import {
    ScrollView,
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import SingleCountry from '../containers/SingleCountry'
import CustomActivityIndicator from './CustomActivityIndicator'

const CustomFlatList = props => {
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
                                < TouchableOpacity onPress={() => props.onPress(itemData.item.id, itemData.item.slug, itemData.item.name, itemData.item.mainColor)}>
                                    <SingleCountry name={itemData.item.name} flag={itemData.item.flag} conNum={props.data.length} />
                                </TouchableOpacity >
                            )
                        }
                        }
                    />
                ) : (
                        <CustomActivityIndicator/>
                    )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',
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

export default CustomFlatList;