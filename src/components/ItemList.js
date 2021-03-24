import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

//Ui
import Avatar from './Avatar';

const ItemList = ({item, schema, setter, getter, multiple}) => {
  const findItemID = (uid) => {
    console.log(uid, 'uid');
    const continer = [...(getter || [])];
    return continer?.find((i) => i.id === uid);
  };

  const handleChange = (newValue) => {
    const container = [...(getter || [])];
    const ids = [...container, item];
    console.log(ids);

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
  };

  return (
    <View style={styles.container}>
      <Avatar uri={item[schema?.img]} size="big" />
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{item[schema.name]}</Text>
      </View>
      <View style={styles.checkboxWrapper}>
        <CheckBox
          disabled={false}
          value={getter.find((i) => i.id === item.uid)}
          onValueChange={(newValue) => handleChange(newValue)}
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
    marginLeft: 10,
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
