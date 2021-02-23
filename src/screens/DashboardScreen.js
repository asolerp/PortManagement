import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';

import {AuthContext} from '../navigation/AuthNavigator';
import ProfileBar from '../components/ProfileBar';
import TitlePage from '../components/TitlePage';

// UI
import LinearGradient from 'react-native-linear-gradient';

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
      <TitlePage>
        <ProfileBar />
      </TitlePage>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#126D9B', '#67B26F']}
        style={styles.homeBackScreen}>
        <View style={styles.home}>
          <View style={styles.content}>
            <Button title="Logout" onPress={logOut} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeBackScreen: {
    flex: 1,
  },
  home: {
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    flex: 5,
  },
  content: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
