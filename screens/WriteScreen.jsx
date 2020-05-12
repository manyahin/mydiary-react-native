import React, { useEffect } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import AuthContext from '../AuthContext';

export default function WriteScreen() {

    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Write Screen</Text>
            {/* <Text>{userKey}</Text> */}

            <TextInput
                style={{backgroundColor: 'lightgreen'}}
                multiline={true}
                numberOfLines={4}
                />

            <Button
                onPress={() => signOut()}
                title="logout"
                color="#183922"
            />
        </View>
    );
}
