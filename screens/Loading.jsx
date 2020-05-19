import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

import * as theme from '../util/theme';

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color="#111" />
            <Text style={styles.message}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...theme.baseContainer,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        fontSize: 13,
        textAlign: 'center',
        margin: 10,
        color: '#000',
    },
});
