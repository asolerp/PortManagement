import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';

import {AuthContext} from '../navigation/AuthNavigator';
import ProfileBar from '../components/ProfileBar';

const DashboardScreen = () => {
  const user = useContext(AuthContext);
  console.log(user);

  const logOut = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <ProfileBar />
      <View style={styles.home}>
        <Button title="Logout" onPress={logOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  home: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
