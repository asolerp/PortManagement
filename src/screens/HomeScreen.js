import React, {useContext} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

//Firebase
import auth from '@react-native-firebase/auth';

import {AuthContext} from '../navigation/AuthNavigator';

const Home = () => {
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
      <Text>Hola Home! Welcome {user.email}</Text>
      <Button title="Logout" onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
