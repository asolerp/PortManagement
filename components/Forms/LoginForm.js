import React, {useState} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import GradientButton from '../Elements/GradientButton';

// UI
import Input from '../Elements/Input';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
