import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';
import Constants from 'expo-constants';
import { CheckBox } from 'react-native-elements'

import TopBar from '../components/TopBar';

import ConfigContext from '../contexts/ConfigContext';

export default function SettingsScreen({ navigation }) {

    const { config, updateConfig } = React.useContext(ConfigContext);

    return (
        <View style={styles.container}>
            <TopBar/>
            <View>
                <CheckBox
                    title='Display last notes on Home screen'
                    checked={config.displayLastNotes}
                    onPress={() => updateConfig({displayLastNotes: !config.displayLastNotes})}
                />
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

