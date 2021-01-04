import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';

const TitlePage = ({title, leftSide, color = 'white'}) => {
  return (
    <View style={styles.container}>
      {leftSide}
      <Text style={{...styles.title, ...{color: color}}}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default TitlePage;
