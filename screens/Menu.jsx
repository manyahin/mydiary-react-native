import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

import TopBar from '../components/TopBar';
import { AuthContext } from '../stores/auth';
import { ConfigContext } from '../stores/config';

import * as theme from '../util/theme';

export default function MenuScreen({ navigation }) {

    const { signOut } = React.useContext(AuthContext);
    const { config } = React.useContext(ConfigContext);

    const menus = [
        {
            name: 'Home / Write page',
            link: 'Write'
        },
        {
            name: 'Read page',
            link: 'Read'
        },
        {
            name: 'Calendar',
            link: 'Calendar'
        },
        {
            name: 'Settings',
            link: 'Settings'
        },
        {
            name: 'About',
            link: 'About'
        },
    ]

    return (
        <View style={theme.baseContainer}>
            <TopBar/>
            <View>
                {menus.map(menu => (
                    <Button style={styles.block}
                        onPress={() => navigation.navigate(menu.link)}
                        title={menu.name} 
                        key={menu.link}
                    />
                ))}
                { !config.offlineMode && (
                    <Button style={styles.block}
                        onPress={() => signOut()}
                        title="Sign Out"
                        type="clear"
                    />
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        marginTop: 10
    }
});

