import React, {useState, useEffect, useCallback, createContext} from 'react';

import {View, StyleSheet} from 'react-native';

import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';

//Firebase
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext(null);

const styles = StyleSheet.create({
  appBackground: {
    flex: 1,
    backgroundColor: '#4DAABF',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    position: 'absolute',
    height: '88%',
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 4,
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
    <AuthContext.Provider value={user}>
      <View style={styles.appBackground}>
        <View style={styles.background} />
        <SignInStack />
      </View>
    </AuthContext.Provider>
  ) : (
    <SignOutStack />
  );
}
