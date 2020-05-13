import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

export default function() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.message}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
