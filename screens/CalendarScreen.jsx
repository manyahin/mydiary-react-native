import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';
import Constants from 'expo-constants';

import TopBar from '../components/TopBar';

export default function CalendarScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <TopBar/>
            <View>
                <Text>In developming...</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
        padding: 10
    }
});

