import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';

import {Text, View, StyleSheet} from 'react-native';
import CustomButton from '../../Elements/CustomButton';

//Firebase
import auth from '@react-native-firebase/auth';

// UI
import Input from '../../Elements/Input';
import {set} from 'react-native-reanimated';

const LoginForm = () => {
  const {control, handleSubmit} = useForm();
  const [error, setError] = useState();
  const [loadingLogin, setLoadingLogin] = useState(false);

  const signIn = async (data) => {
    setLoadingLogin(true);
    try {
      await auth().signInWithEmailAndPassword(data.username, data.password);
    } catch (err) {
      console.log('error!!!');
      setError(
        'Ha ocurrido un error, asegúrase de que el email y la contraseña son correcotos',
      );
    } finally {
      setLoadingLogin(false);
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
      <View style={styles.buttonWrapper}>
        <CustomButton
          onPress={handleSubmit(signIn)}
          title="Login"
          loading={loadingLogin}
        />
      </View>
      <View>{error && <Text style={styles.errorMessage}>{error}</Text>}</View>
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
  buttonWrapper: {
    marginTop: 20,
  },
  errorMessage: {
    marginTop: 10,
    color: 'white',
    fontWeight: '400',
  },
});

export default LoginForm;
