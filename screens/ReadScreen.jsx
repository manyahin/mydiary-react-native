import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';

import AuthContext from '../AuthContext';

import NotesList from '../components/NotesList';

import NoteModel from '../models/note';

export default function ReadScreen({navigation}) {
    const [notes, setNotes] = React.useState([]);

    const { signOut } = React.useContext(AuthContext);

    useEffect(() => {
        const boot = async () => {
            setNotes(await NoteModel.getNotes());
        }

        boot();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.topbar}>
                <Text style={styles.logo}>MyDiary</Text>
                <Button
                    onPress={() => signOut()}
                    title="Sign Out"
                    type="clear"
                />
                <Button
                    onPress={() => navigation.navigate('Write')}
                    title="Write"
                    type="clear"/>
            </View>
            <View>
                <Text h4>Read Screen</Text>
                <NotesList notes={notes}></NotesList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    topbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10  
    },
    logo: {
        fontSize: 17, 
        fontStyle: 'italic', 
        fontWeight: 'bold', 
        paddingTop: 13, 
        paddingLeft: 2, 
        color: 'black'
    }
});

