import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import TopBar from '../components/TopBar';
import * as theme from '../util/theme';

export default function About({ navigation }) {

    return (
        <View style={theme.baseContainer}>
            <TopBar/>
            <View>
                <Text h2>About</Text>
                <Text>Open Source</Text>
            </View>
        </View>
    )
};
