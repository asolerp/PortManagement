import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const UserItemList = ({user, selectedUser, setSelectedUser}) => {
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
          value={selectedUser[user.id] || false}
          onValueChange={(newValue) =>
            setSelectedUser({[user.id]: newValue, ...selectedUser})
          }
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
