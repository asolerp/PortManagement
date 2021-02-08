import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';

const TitlePage = ({title, leftSide, color = 'white'}) => {
  return (
    <View style={styles.container}>
      {leftSide}
      <Text
        style={{
          ...styles.title,
          ...{color: color, marginLeft: leftSide ? 20 : 0},
        }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 20,
    // justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
  },
});

export default TitlePage;
