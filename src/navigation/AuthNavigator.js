import React, {useState, useEffect, useCallback, createContext} from 'react';

import {ImageBackground, StyleSheet} from 'react-native';

import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';

//Firebase
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext(null);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
      <ImageBackground
        source={require('../assets/images/fondo_pm.png')}
        style={styles.image}>
        <SignInStack />
      </ImageBackground>
    </AuthContext.Provider>
  ) : (
    <SignOutStack />
  );
}
