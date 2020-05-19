import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';
import { CheckBox } from 'react-native-elements'

import TopBar from '../components/TopBar';
import { ConfigContext } from '../stores/config';

export default function SettingsScreen() {

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
                <CheckBox
                    title='Offline mode'
                    disabled={true}
                    style={styles.disableCheckBox}
                    checked={config.offlineMode}
                    onPress={() => updateConfig({offlineMode: !config.offlineMode})}
                />
                <Text>This option is disabled due the next version that will support synchronization</Text>
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
