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
  },
  topBar: {
    height: Dimensions.get('window').height / 10,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentWrapper: {
    flex: 1,
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
            {/* <View style={styles.topBar}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('../assets/images/logo_pm_servicios.png')}
                />
              </View>
            </View> */}
            <View />
            <View style={styles.contentWrapper}>
              <SignInStack />
            </View>
          </View>
        </View>
      </AuthContext.Provider>
    </React.Fragment>
  ) : (
    <SignOutStack />
  );
}
