import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export default function TopBar() {
    
    const navigation = useNavigation();

    return (
        <View style={styles.topbar}>
            <Text style={styles.logo}
                onPress={() => navigation.navigate('Write')}
                >MyDiary</Text>
            <Icon 
                onPress={() => navigation.navigate('Menu')}
                name="menu"
                size={32} />
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
        paddingLeft: 2, 
        color: 'black',
        fontFamily: 'CaveatBold'
    },
    menu: {
        paddingTop: 2,
        paddingRight: 2,
        fontSize: 20
    }
});
