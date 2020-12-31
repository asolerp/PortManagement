import React, {useEffect, useContext, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import {AuthContext} from '../navigation/AuthNavigator';

// Firebase
import firestore from '@react-native-firebase/firestore';

const ProfileBar = () => {
  const user = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((documentSnapshot) => {
        setUserProfile(documentSnapshot.data());
        console.log('User data: ', documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.profileBar}>
        <View>
          <Text style={styles.welcome}>Hola!</Text>
          <Text style={styles.userName}>{userProfile?.firstName}</Text>
        </View>
        <View>
          <Image
            style={styles.avatar}
            source={{
              uri: userProfile?.profileImage,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  profileBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  welcome: {
    fontSize: 30,
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default ProfileBar;
