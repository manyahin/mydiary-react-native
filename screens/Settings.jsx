import React from 'react';
import { View, Text } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'

import TopBar from '../components/TopBar';
import { ConfigContext } from '../stores/config';

import * as theme from '../util/theme';

import { i18n, t } from '../i18n';

export default function SettingsScreen() {

    const { config, updateConfig } = React.useContext(ConfigContext);

    

    return (
        <View style={theme.baseContainer}>
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
                    checked={config.offlineMode}
                    onPress={() => updateConfig({offlineMode: !config.offlineMode})}
                />
                <Text>This option is disabled due the next version that will support synchronization</Text>
                <Text>{t('myDiary')}</Text>
                <Button onPress={() => i18n.locale = 'ru'}>Set Russian language</Button>
                <Button onPress={() => i18n.locale = 'en'}>Set English language</Button>
            </View>
        </View>
    )
}
