import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

// UI
import ImageLoader from '../../components/Elements/ImageLoader';

// Utils
import {launchImage} from '../../utils/imageFunctions';
import Input from '../Elements/Input';

const NewFormHome = () => {
  const [houseImage, setHouseImage] = useState();

  return (
    <View>
      <ImageLoader
        onPress={() => launchImage(setHouseImage)}
        image={houseImage}
      />
      <Input
        // value={username}
        // onChange={handlerInput}
        label="Nombre de la casa"
        name="houseName"
        inputStyles={{backgroundColor: 'white'}}
        labelStyle={{color: 'black'}}
      />
      <Input
        // value={username}
        // onChange={handlerInput}
        label="Calle"
        name="street"
        inputStyles={{backgroundColor: 'white'}}
        labelStyle={{color: 'black'}}
      />
      <Input
        // value={username}
        // onChange={handlerInput}
        label="Municipio"
        name="municipio"
        inputStyles={{backgroundColor: 'white'}}
        labelStyle={{color: 'black'}}
      />
      <View style={styles.multipleLineInputs}>
        <Input
          // value={username}
          // onChange={handlerInput}
          label="Código postal"
          name="cp"
          inputStyles={{backgroundColor: 'white', width: 170}}
          labelStyle={{color: 'black'}}
        />
        <Input
          // value={username}
          // onChange={handlerInput}
          label="Teléfono"
          name="phone"
          inputStyles={{backgroundColor: 'white', width: 170}}
          labelStyle={{color: 'black'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  multipleLineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NewFormHome;
