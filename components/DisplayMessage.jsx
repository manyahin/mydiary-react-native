import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

export const DisplayMessage = (props) => {
  const options = props.options;

  if (!options || !options.message) 
    return null;

  if (options.type === 'error') {
    return (
      <Text style={styles.errorMessage}>
          {options.message}
      </Text>
    );
  }

  if (options.type === 'message') {
    return (
      <Text style={styles.normalMessage}>
          {options.message}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    paddingBottom: 20,
    fontSize: 14
  },
  normalMessage: {
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 20,
    fontSize: 16
  }
});
