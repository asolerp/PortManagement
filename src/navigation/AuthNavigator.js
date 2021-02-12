import React, {useState, useEffect, useCallback, createContext} from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';

import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';

//Firebase
import auth from '@react-native-firebase/auth';
import {RectButton} from 'react-native-gesture-handler';

export const AuthContext = createContext(null);

const styles = StyleSheet.create({
  appBackground: {
    flex: 1,
    backgroundColor: '#4DAABF',
  },
  topBar: {
    height: Dimensions.get('window').height / 10,
    backgroundColor: '#4DAABF',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    backgroundColor: '#F8F8F8',
    position: 'absolute',
    height: Dimensions.get('window').height / 1.2,
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#6b6b6b',
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  logo: {
    flex: 1,
    width: 80,
    resizeMode: 'contain',
    margin: 0,
    marginTop: 40,
  },
});

export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (result) => {
      setUser(result);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // unsubscribe on unmount
    return authSubscriber;
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  return user ? (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <AuthContext.Provider value={user}>
        <View style={styles.appBackground}>
          <View style={styles.background}>
            <View style={styles.topBar}>
              <View style={styles.logoContainer}>
                {/* <Text>Hola</Text> */}
                <Image
                  style={styles.logo}
                  source={require('../assets/images/logo_pm_servicios.png')}
                />
              </View>
            </View>
            <View />
          </View>
          <SignInStack />
        </View>
      </AuthContext.Provider>
    </React.Fragment>
  ) : (
    <SignOutStack />
  );
}
