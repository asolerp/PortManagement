import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

import {
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from 'react-native';

// UI
import ImageLoader from '../../components/Elements/ImageLoader';
import UserSelector from '../Elements/UserSelector';
import Input from '../Elements/Input';

// Firebase
import {newHouse} from '../../firebase/uploadNewHouse';

// Utils
import {launchImage} from '../../utils/imageFunctions';
import {NewHouseFormContext} from '../../context/newHouseFormContext';
import {AuthContext} from '../../navigation/AuthNavigator';

const NewFormHome = () => {
  const user = useContext(AuthContext);
  const {users, handleUsers} = useContext(NewHouseFormContext);
  const {control, handleSubmit, errors, reset} = useForm();
  const navigation = useNavigation();
  const [houseImage, setHouseImage] = useState();
  const [loading, setLoading] = useState(false);

  console.log('users', users);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await newHouse({...data, owner: users[0]}, houseImage, user.uid);
      reset();
      setHouseImage(null);
      handleUsers([]);
      Alert.alert(
        'Nueva casa registrada',
        'Se ha registrado una nueva casa :)!',
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView enabled behavior="padding">
      <ScrollView style={styles.scrollWrapper}>
        <ImageLoader
          onPress={() => launchImage(setHouseImage)}
          image={houseImage}
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              onBlur={onBlur}
              onChangeText={(v) => onChange(v)}
              value={value}
              label="Nombre de la casa"
              name="houseName"
              inputStyles={styles.newHomeInput}
              labelStyle={styles.newHomeLabel}
              error={errors.houseName}
            />
          )}
          name="houseName"
          rules={{required: true}}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              onBlur={onBlur}
              onChangeText={(v) => onChange(v)}
              value={value}
              label="Calle"
              name="street"
              inputStyles={styles.newHomeInput}
              labelStyle={styles.newHomeLabel}
              error={errors.street}
            />
          )}
          name="street"
          rules={{required: true}}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <Input
              onBlur={onBlur}
              onChangeText={(v) => onChange(v)}
              value={value}
              label="Municipio"
              name="municipio"
              inputStyles={styles.newHomeInput}
              labelStyle={styles.newHomeLabel}
              error={errors.municipio}
            />
          )}
          name="municipio"
          rules={{required: true}}
          defaultValue=""
        />
        <View style={styles.multipleLineInputs}>
          <View style={styles.multiLineElementLeft}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(v) => onChange(v)}
                  value={value}
                  label="Código postal"
                  name="cp"
                  inputStyles={styles.newHomeInput}
                  labelStyle={styles.newHomeLabel}
                  error={errors.cp}
                />
              )}
              name="cp"
              rules={{required: true}}
              defaultValue=""
            />
          </View>
          <View style={styles.multiLineElementRight}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(v) => onChange(v)}
                  value={value}
                  label="Teléfono"
                  name="phone"
                  inputStyles={styles.newHomeInput}
                  labelStyle={styles.newHomeLabel}
                  error={errors.phone}
                />
              )}
              name="phone"
              rules={{required: true}}
              defaultValue=""
            />
          </View>
        </View>
        <UserSelector
          label="Propietario"
          onPress={() => navigation.navigate('UserList')}
          user={users[0]}
        />
        {!loading ? (
          <Button
            style={{marginBottom: 200}}
            onPress={handleSubmit(onSubmit)}
            title="Guardar"
          />
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  multipleLineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  multiLineElementLeft: {
    flex: 1,
    marginRight: 10,
  },
  multiLineElementRight: {
    flex: 1,
    marginLeft: 10,
  },
  newHomeInput: {
    backgroundColor: 'white',
    color: 'black',
  },
  newHomeLabel: {
    color: 'black',
  },
});

export default NewFormHome;
