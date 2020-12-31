import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import GradientButton from '../Elements/GradientButton';

//Firebase
import auth from '@react-native-firebase/auth';

// UI
import Input from '../Elements/Input';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    try {
      auth().signInWithEmailAndPassword(username, password);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (err.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(err);
    }
  };

  const handlerInput = (text, input) => {
    if (input === 'username') {
      setUsername(text);
    } else {
      setPassword(text);
    }
  };

  return (
    <View style={styles.formWrapper}>
      <Input
        value={username}
        onChange={handlerInput}
        label="Email"
        name="username"
      />
      <Input
        value={password}
        onChange={handlerInput}
        label="Password"
        name="password"
        secureTextEntry
      />
      <Text style={styles.forgotText}>He olvidado mi contraseña</Text>
      <GradientButton
        colors={['#126D9B', '#126D9B']}
        wrapperStyle={styles.gradientButton}
        onPress={signIn}
        title="Login"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
  },
  forgotText: {
    color: 'white',
    textAlign: 'right',
  },
  gradientButton: {
    justifyContent: 'flex-end',
  },
});

export default LoginForm;
