import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Divider } from 'react-native-elements';
import Constants from 'expo-constants';

import TopBar from '../components/TopBar';
import AuthContext from '../AuthContext';

export default function SettingsScreen({ navigation }) {

    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <TopBar/>
            <View>
                <Button style={styles.block}
                    onPress={() => navigation.navigate('Write')}
                    title="Home / Write page" />

                <Button style={styles.block}
                    onPress={() => navigation.navigate('Read')}
                    title="Read page" />

                <Button style={styles.block}
                    onPress={() => signOut()}
                    title="Sign Out"
                    type="clear"
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
    },
    block: {
        marginTop: 10
    }
});

