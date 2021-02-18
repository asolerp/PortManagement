import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Avatar from '../Avatar';

import {useGetFirebase} from '../../hooks/useGetFirebase';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {defaultHouseFilters} from '../../constants/housesFilter';

// Context
import {Context} from '../../store/filterStore';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,

    paddingHorizontal: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  housesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  houseFilter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 70,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: 100,
  },
  activeFilter: {
    borderWidth: 5,
    borderColor: '#3E93A8',
    borderRadius: 100,
    padding: 3,
    marginBottom: 0,
  },
  textWrapper: {
    width: '100%',
    height: 50,
    marginTop: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#6b6b6b',
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  textHouse: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    width: '100%',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 10,
    color: '#3E93A8',
    fontWeight: 'bold',
  },
});

const HouseFilter = () => {
  const {list, loading, error} = useGetFirebase('houses');
  const [state, dispatch] = useContext(Context);
  const [localFilter, setLocalFilter] = useState('all_houses');

  console.log(state);

  const isInArray = (id) => {
    return state?.houses?.find((idHouse) => idHouse === id);
  };

  const localFilterActive = (filter) => {
    return localFilter === filter;
  };

  const handleSetLocalFilter = (filter) => {
    setLocalFilter(filter);
    if (filter === 'all_houses') {
      dispatch({
        type: 'ADD_HOUSE',
        payload: [],
      });
    } else {
      dispatch({
        type: 'ADD_HOUSE',
        payload: null,
      });
    }
  };

  const handleSetHouse = (house) => {
    if (isInArray(house.id)) {
      const housesWithoutID = state?.houses?.filter((id) => {
        return id !== house.id;
      });
      dispatch({
        type: 'ADD_HOUSE',
        payload: housesWithoutID,
      });
    } else {
      dispatch({
        type: 'ADD_HOUSE',
        payload: [...(state?.houses || []), house.id],
      });
    }
    setLocalFilter(undefined);
  };

  return (
    <ScrollView horizontal={true} style={styles.container}>
      <View style={styles.housesWrapper}>
        {defaultHouseFilters.map((houseFilter, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => handleSetLocalFilter(houseFilter.filter)}>
              <View style={styles.houseFilter}>
                <View
                  style={
                    ([styles.avatarContainer],
                    localFilterActive(houseFilter.filter) &&
                      styles.activeFilter)
                  }>
                  <Avatar border size="big" uri={houseFilter.houseImage} />
                </View>
                <View style={styles.textWrapper}>
                  <View style={styles.textHouse}>
                    <Text style={styles.textStyle}>
                      {houseFilter.houseName}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        {list.map((house, i) => {
          return (
            <TouchableOpacity onPress={() => handleSetHouse(house)}>
              <View style={styles.houseFilter}>
                <View
                  style={
                    ([styles.avatarContainer],
                    isInArray(house.id) && styles.activeFilter)
                  }>
                  <Avatar border size="big" uri={house.houseImage} />
                </View>
                <View style={styles.textWrapper}>
                  <View style={styles.textHouse}>
                    <Text style={styles.textStyle}>{house.houseName}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default HouseFilter;
