import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {ImageBackground} from 'react-native';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputGroup from '../../components/Elements/InputGroup';
import PagetLayout from '../../components/PageLayout';

import {useGetDocFirebase} from '../../hooks/useGetDocFIrebase';

const styles = StyleSheet.create({
  pageWrapper: {
    marginTop: 20,
  },
  infoWrapper: {
    marginTop: 20,
  },
  houseImage: {
    width: '100%',
    height: 150,
  },
  titleStyle: {
    fontSize: 20,
    color: '#284748',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 10,
    color: '#284748',
  },
});

const HomeScreen = ({route, navigation}) => {
  const [infoHouse, setInfoHouse] = useState();

  const {houseId} = route.params;
  const {document: house, loading, error} = useGetDocFirebase(
    'houses',
    houseId,
  );

  return (
    <PagetLayout
      backButton
      titleProps={{
        subPage: true,
        title: house?.houseName,
        color: 'white',
      }}>
      {house ? (
        <View style={styles.pageWrapper}>
          <ImageBackground
            source={{uri: house?.houseImage}}
            imageStyle={{borderRadius: 10, borderTopRightRadius: 40}}
            style={styles.houseImage}
          />
          <View style={styles.infoWrapper}>
            <Text style={styles.titleStyle}>🏡 Datos de la vivienda</Text>
            <Text style={styles.inputLabel}>Nombre de la casa:</Text>
            <InputGroup>
              <TextInput
                style={{height: 40}}
                placeholder="Nombre de la casa"
                onChangeText={(text) =>
                  setInfoHouse({...infoHouse, phone: text})
                }
                value={infoHouse?.houseName || house?.houseName}
              />
            </InputGroup>
            {/* <Text style={styles.inputLabel}>Teléfono de contacto:</Text>
            <InputGroup>
              <TextInput
                style={{height: 40}}
                placeholder="Teléfono"
                onChangeText={(text) =>
                  setInfoHouse({...infoHouse, phone: text})
                }
                value={infoHouse?.phone || userLoggedIn?.phone}
              />
            </InputGroup>
            <Text style={styles.inputLabel}>Teléfono de contacto:</Text>
            <InputGroup>
              <TextInput
                style={{height: 40}}
                placeholder="Teléfono"
                onChangeText={(text) =>
                  setInfoHouse({...infoHouse, phone: text})
                }
                value={infoHouse?.phone || userLoggedIn?.phone}
              />
            </InputGroup> */}
          </View>
        </View>
      ) : (
        <View />
      )}
    </PagetLayout>
  );
};

export default HomeScreen;
