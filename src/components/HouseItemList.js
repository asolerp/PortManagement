import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

const Owner = ({owner}) => {
  return (
    <View style={styles.ownerWrapper}>
      <Image
        style={styles.ownerImage}
        source={{
          uri: owner?.profileImage,
        }}
      />
      <Text>{owner?.firstName}</Text>
    </View>
  );
};

const HouseItemList = ({house}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          style={styles.avatar}
          source={{
            uri: house?.houseImage,
          }}
        />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{house.houseName}</Text>
        <Text style={styles.street}>{house.street}</Text>
        <View>
          <Text style={styles.ownerTitle}>Propietario</Text>
          <Owner owner={house.owner} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderRadius: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 10,
    marginBottom: 10,
  },
  avatarWrapper: {
    flex: 2,
  },
  ownerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoWrapper: {
    flex: 3,
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    padding: 10,
  },
  ownerTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ownerImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 10,
  },
  avatar: {
    flex: 1,
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default HouseItemList;
