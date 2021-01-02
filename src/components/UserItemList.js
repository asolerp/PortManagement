import React, {useContext} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {NewHouseFormContext} from '../context/newHouseFormContext';

const UserItemList = ({user}) => {
  const {users, handleUsers} = useContext(NewHouseFormContext);

  const findUserID = (uid) => {
    return users?.find((u) => u.id === uid);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          style={styles.avatar}
          source={{
            uri: user?.profileImage,
          }}
        />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{user.firstName}</Text>
      </View>
      <View style={styles.checkboxWrapper}>
        <CheckBox
          disabled={false}
          value={findUserID(user.id) ? true : false}
          onValueChange={(newValue) => {
            if (!newValue) {
              handleUsers(users?.filter((u) => u.id !== user.id));
            } else {
              handleUsers([...users, user]);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  avatarWrapper: {
    flex: 1,
  },
  infoWrapper: {
    flex: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default UserItemList;
