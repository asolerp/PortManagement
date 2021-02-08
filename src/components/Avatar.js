import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  ownerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerImage: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginRight: 10,
  },
});

const Avatar = ({uri, name}) => {
  return (
    <View style={styles.ownerWrapper}>
      <Image
        style={styles.ownerImage}
        source={{
          uri: uri,
        }}
      />
    </View>
  );
};

export default Avatar;
