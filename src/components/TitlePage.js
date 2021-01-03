import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';

const TitlePage = ({title, leftSide}) => {
  return (
    <View style={styles.container}>
      {leftSide}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default TitlePage;