import React from 'react';

import {View, Text, StyleSheet, ScrollView} from 'react-native';
import UserSelector from '../components/Elements/UserSelector';

const UserListSelector = ({
  userType,
  multiSelect = false,
  selection,
  setSelection,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Listado</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,,
  },,
});

export default UserListSelector;
