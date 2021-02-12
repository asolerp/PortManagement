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

const Avatar = ({uri, name, overlap, position, size = 'small'}) => {
  const parseSize = (sizeImage) => {
    switch (sizeImage) {
      case 'small': {
        return 25;
      }
      case 'medium': {
        return 35;
      }
      case 'big': {
        return 45;
      }
      default: {
        return 25;
      }
    }
  };
  return (
    <View style={[styles.ownerWrapper, {zIndex: position}]}>
      <Image
        style={[
          styles.ownerImage,
          {width: parseSize(size), height: parseSize(size)},
          {marginRight: overlap ? -10 : 10},
        ]}
        source={{
          uri: uri,
        }}
      />
    </View>
  );
};

export default Avatar;
