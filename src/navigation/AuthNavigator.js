import React, {useState, useEffect, useCallback, createContext} from 'react';

import SignInStack from './SignInStack';
import SignOutStack from './SignOutStack';

//Firebase
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext(null);

export default function AuthNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (result) => {
      console.log(result);
      setUser(result);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    console.log('hola!, ha cambiado el login');
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // unsubscribe on unmount
    return authSubscriber;
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <SignInStack />
    </AuthContext.Provider>
  ) : (
    <SignOutStack />
  );
}
