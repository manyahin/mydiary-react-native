import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function Search(props) {
  const [search, setSearch] = React.useState('');

  const doSearch = () => {
    if (search.length > 0) props.onSearch(search);
  }

  return (
    <View>
      <Input placeholder="Text to search" onChangeText={value => setSearch(value)} />
      <Button title="Search" onPress={doSearch} />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBox: {
    flex: 1,
    flexDirection: 'column'
  }
});
