import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';

import {AuthContext} from '../navigation/AuthNavigator';
import ProfileBar from '../components/ProfileBar';
import TitlePage from '../components/TitlePage';

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
      <TitlePage />
      <View style={styles.home}>
        <ProfileBar />
        <View style={styles.content}>
          <Button title="Logout" onPress={logOut} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  home: {
    backgroundColor: '#F2F2F2',
    borderRadius: 50,
    flex: 5,
  },
  content: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
