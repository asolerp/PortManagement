import React, {useContext} from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {NewHouseFormContext} from '../context/newHouseFormContext';

const ItemList = ({item, schema, setter, getter, multiple}) => {
  console.log('getter', getter);

  const findItemID = (uid) => {
    return getter?.find((i) => i.id === uid);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          style={styles.avatar}
          source={{
            uri: item[schema?.img],
          }}
        />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{item[schema.name]}</Text>
      </View>
      <View style={styles.checkboxWrapper}>
        <CheckBox
          disabled={false}
          value={findItemID(item.id) ? true : false}
          onValueChange={(newValue) => {
            if (!multiple) {
              if (!newValue) {
                setter([]);
              } else {
                setter([item]);
              }
            } else {
              if (!newValue) {
                const updatedItemList = getter?.filter((i) => i.id !== item.id);
                setter(updatedItemList);
              } else {
                setter([...getter, item]);
              }
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
  },
  avatarWrapper: {
    flex: 1,
  },
  infoWrapper: {
    flex: 6,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 15,
  },
});

export default ItemList;
