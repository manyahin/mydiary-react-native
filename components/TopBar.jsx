import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'

export default function TopBar() {
    
    const navigation = useNavigation();

    return (
        <View style={styles.topbar}>
            <Text style={styles.logo}
                onPress={() => navigation.navigate('Write')}
                >MyDiary</Text>
            {/* <Icon 
                onPress={() => navigation.navigate('Menu')}
                name="menu"
                size={32} /> */}
            <Text style={styles.menu} onPress={() => navigation.navigate('Menu')}>Menu</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    topbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    logo: {
        fontSize: 26, 
        fontStyle: 'italic', 
        fontWeight: 'bold', 
        paddingLeft: 2, 
        color: 'black',
        fontFamily: 'CaveatRegular'
    },
    menu: {
        paddingTop: 2,
        paddingRight: 2,
        fontSize: 20
    }
});
