import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useForm, Controller} from 'react-hook-form';

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
} from 'react-native';
import DateInputCustom from '../../Elements/DateInput';
import Input from '../../Elements/Input';

import {NewHouseFormContext} from '../../../context/newHouseFormContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import HouseSelector from '../../../screens/HouseSelector';
import ListSelectorScreen from '../../../screens/ListSelectorScreen';

const GeneralNewForm = () => {
  const {control, handleSubmit, errors, reset} = useForm();
  const {users, handleUsers} = useContext(NewHouseFormContext);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <ScrollView style={styles.scrollWrapper}>
      <Modal animationType="slide" transparent={false} visible={modal}>
        {mode === 'users' ? (
          <ListSelectorScreen handleClose={() => setModal(false)} />
        ) : (
          <HouseSelector handleClose={() => setModal(false)} model={'houses'} />
        )}
      </Modal>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <Input
            onBlur={onBlur}
            onChangeText={(v) => onChange(v)}
            value={value}
            label="Nombre del trabajo"
            name="jobName"
            inputStyles={styles.newJobInput}
            labelStyle={styles.newJobLabel}
            error={errors.jobName}
          />
        )}
        name="jobName"
        rules={{required: true}}
        defaultValue=""
      />
      <DateInputCustom label="Fecha" />
      <View style={styles.houseWrapper}>
        <Text>Casa</Text>
        <TouchableOpacity
          onPress={() => {
            setMode('houses');
            setModal(true);
          }}>
          <View style={styles.add}>
            <Text style={styles.addLabel}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.houseWrapper}>
        <Text>Encargado</Text>
        <TouchableOpacity
          onPress={() => {
            setMode('users');
            setModal(true);
          }}>
          <View style={styles.add}>
            <Text style={styles.addLabel}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  newJobInput: {
    backgroundColor: 'white',
    color: 'black',
  },
  newJobLabel: {
    color: 'black',
  },
  houseWrapper: {
    marginTop: 20,
  },
  add: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  addLabel: {
    color: 'white',
    fontSize: 30,
  },
});

export default GeneralNewForm;
