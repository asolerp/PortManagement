import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {View, StyleSheet, ScrollView, Button} from 'react-native';

// UI
import ImageLoader from '../../components/Elements/ImageLoader';

// Utils
import {launchImage} from '../../utils/imageFunctions';
import Input from '../Elements/Input';
import UserSelector from '../Elements/UserSelector';

const NewFormHome = () => {
  const navigation = useNavigation();
  const [houseImage, setHouseImage] = useState();

  return (
    <ScrollView style={styles.scrollWrapper}>
      <ImageLoader
        onPress={() => launchImage(setHouseImage)}
        image={houseImage}
      />
      <Input
        // value={username}
        // onChange={handlerInput}
        label="Nombre de la casa"
        name="houseName"
        inputStyles={styles.newHomeInput}
        labelStyle={styles.newHomeLabel}
      />
      <Input
        // value={username}
        // onChange={handlerInput}
        label="Calle"
        name="street"
        inputStyles={styles.newHomeInput}
        labelStyle={styles.newHomeLabel}
      />
      <Input
        // value={username}
        // onChange={handlerInput}
        label="Municipio"
        name="municipio"
        inputStyles={styles.newHomeInput}
        labelStyle={styles.newHomeLabel}
      />
      <View style={styles.multipleLineInputs}>
        <View style={styles.multiLineElementLeft}>
          <Input
            // value={username}
            // onChange={handlerInput}
            label="Código postal"
            name="cp"
            inputStyles={styles.newHomeInput}
            labelStyle={styles.newHomeLabel}
          />
        </View>
        <View style={styles.multiLineElementRight}>
          <Input
            // value={username}
            // onChange={handlerInput}
            label="Teléfono"
            name="phone"
            inputStyles={styles.newHomeInput}
            labelStyle={styles.newHomeLabel}
          />
        </View>
      </View>
      <UserSelector
        label="Propietario"
        onPress={() => navigation.navigate('UserList')}
      />
      <Button title="Guardar" />
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
  newHomeInput: {
    backgroundColor: 'white',
  },
  newHomeLabel: {
    color: 'black',
  },
});

export default NewFormHome;
