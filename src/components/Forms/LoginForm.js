import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';

import {Text, View, StyleSheet} from 'react-native';
import GradientButton from '../Elements/GradientButton';

//Firebase
import auth from '@react-native-firebase/auth';

// UI
import Input from '../Elements/Input';

const LoginForm = () => {
  const {control, handleSubmit, errors, reset} = useForm();

  const signIn = async (data) => {
    try {
      auth().signInWithEmailAndPassword(data.username, data.password);
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

  return (
    <View style={styles.formWrapper}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            value={value}
            onChangeText={(v) => onChange(v)}
            label="Email"
            name="username"
          />
        )}
        name="username"
        rules={{required: true}}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            value={value}
            onChangeText={(v) => onChange(v)}
            label="Password"
            name="password"
            secureTextEntry
          />
        )}
        name="password"
        rules={{required: true}}
        defaultValue=""
      />

      <Text style={styles.forgotText}>He olvidado mi contraseña</Text>
      <GradientButton
        colors={['#126D9B', '#126D9B']}
        wrapperStyle={styles.gradientButton}
        onPress={handleSubmit(signIn)}
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
