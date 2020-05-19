import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import * as theme from '../util/theme';

import TopBar from '../components/TopBar';

export default function CalendarScreen({ navigation }) {
    return (
        <View style={theme.baseContainer}>
            <TopBar/>
            <View>
                <Text>In developming...</Text>
            </View>
        </View>
    )
}
