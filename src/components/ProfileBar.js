import React, {useEffect, useContext, useState} from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';

import {useSelector, shallowEqual} from 'react-redux';

// Firebase
import firestore from '@react-native-firebase/firestore';

const ProfileBar = () => {
  const {user} = useSelector(
    ({userLoggedIn: {user}}) => ({user}),
    shallowEqual,
  );
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((documentSnapshot) => {
        setUserProfile(documentSnapshot?.data());
        console.log('User data: ', documentSnapshot?.data());
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
    justifyContent: 'center',
    padding: 10,
  },
  profileBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  welcome: {
    fontSize: 30,
    color: 'white',
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ProfileBar;
