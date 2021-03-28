import React, {useCallback, useState} from 'react';
import {
  ModalPortal,
  BottomModal,
  Modal,
  ModalContent,
} from 'react-native-modals';

import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {changeState, setModalContent} from '../../../store/modalActions';

import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

import {
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  View,
} from 'react-native';

// UI
import ImageLoader from '../../Elements/ImageLoader';
import UserSelector from '../../Elements/UserSelector';
import Input from '../../Elements/Input';

// Firebase
import {newHouse} from '../../../firebase/uploadNewHouse';
import {useGetFirebase} from '../../../hooks/useGetFirebase';

// Utils
import {launchImage} from '../../../utils/imageFunctions';
import InputGroup from '../../Elements/InputGroup';
import CustomInput from '../../Elements/CustomInput';
import DynamicSelectorList from '../../DynamicSelectorList';

const NewFormHome = () => {
  const {users} = useSelector(
    ({houseForm: {users}}) => ({users}),
    shallowEqual,
  );

  const [owner, setOwner] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const {control, handleSubmit, errors, reset} = useForm();
  const [houseImage, setHouseImage] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await newHouse({...data, owner: users[0]}, houseImage, users[0].uid);
      reset();
      setHouseImage(null);
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
    <React.Fragment>
      <BottomModal
        modalStyle={{borderRadius: 30}}
        height={0.9}
        visible={modalVisible}
        onSwipeOut={(event) => {
          setModalVisible(false);
        }}
        onTouchOutside={() => {
          setModalVisible(false);
        }}>
        <ModalContent style={{flex: 1, alignItems: 'center'}}>
          <DynamicSelectorList
            collection="users"
            where={[
              {
                label: 'role',
                operator: '==',
                condition: 'owner',
              },
            ]}
            store="jobForm"
            searchBy="firstName"
            schema={{img: 'profileImage', name: 'firstName'}}
            get={owner}
            set={(owners) => setOwner(owners)}
          />
        </ModalContent>
      </BottomModal>
      <KeyboardAvoidingView enabled behavior="padding">
        <ScrollView style={styles.scrollWrapper}>
          <ImageLoader
            onPress={() => launchImage(setHouseImage)}
            image={houseImage}
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <InputGroup>
                <TextInput
                  style={{height: 40}}
                  placeholder="Nombre de la casa"
                  name="houseName"
                  error={errors.houseName}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                />
              </InputGroup>
            )}
            name="houseName"
            rules={{required: true}}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <InputGroup>
                <TextInput
                  style={{height: 40}}
                  placeholder="Dirección"
                  name="street"
                  error={errors.street}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                />
              </InputGroup>
            )}
            name="street"
            rules={{required: true}}
            defaultValue=""
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <InputGroup>
                <TextInput
                  style={{height: 40}}
                  placeholder="Municipio"
                  name="municipio"
                  error={errors.street}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                />
              </InputGroup>
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
                  <InputGroup>
                    <TextInput
                      style={{height: 40}}
                      placeholder="Código postal"
                      name="cp"
                      error={errors.street}
                      onChangeText={(text) => onChange(text)}
                      value={value}
                    />
                  </InputGroup>
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
                  <InputGroup>
                    <TextInput
                      style={{height: 40}}
                      placeholder="Teléfono"
                      name="phone"
                      error={errors.street}
                      onChangeText={(text) => onChange(text)}
                      value={value}
                    />
                  </InputGroup>
                )}
                name="phone"
                rules={{required: true}}
                defaultValue=""
              />
            </View>
          </View>
          <Text style={styles.titleStyle}>🔑 Propietario</Text>
          <InputGroup>
            <CustomInput
              title="Propietario"
              subtitle={
                owner.length > 0 && (
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.subtitle}>{owner[0]?.firstName}</Text>
                    </View>
                  </View>
                )
              }
              iconProps={{name: 'person', color: '#55A5AD'}}
              onPress={() => setModalVisible(true)}
            />
          </InputGroup>
        </ScrollView>
      </KeyboardAvoidingView>
    </React.Fragment>
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
  titleStyle: {
    fontSize: 20,
    color: '#284748',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    color: '#2A7BA5',
  },
});

export default NewFormHome;
