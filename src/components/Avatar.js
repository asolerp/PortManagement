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
  },
});

const Avatar = ({uri, name, overlap, position}) => {
  console.log(position);
  return (
    <View style={[styles.ownerWrapper, {zIndex: position}]}>
      <Image
        style={[styles.ownerImage, {marginRight: overlap ? -10 : 10}]}
        source={{
          uri: uri,
        }}
      />
    </View>
  );
};

export default Avatar;
