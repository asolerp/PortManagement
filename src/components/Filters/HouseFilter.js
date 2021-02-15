import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Avatar from '../Avatar';

import {useGetFirebase} from '../../hooks/useGetFirebase';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {defaultHouseFilters} from '../../constants/housesFilter';

// Context
import {Context} from '../../store/filterStore';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  houseFilter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 60,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  activeFilter: {
    borderWidth: 2,
    borderColor: '#4DAABF',
    borderRadius: 100,
    padding: 3,
  },
  textHouse: {
    textAlign: 'center',
    fontSize: 10,
    width: '100%',
    height: 50,
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
    <View style={styles.container}>
      {defaultHouseFilters.map((houseFilter, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => handleSetLocalFilter(houseFilter.filter)}>
            <View style={styles.houseFilter}>
              <View
                style={
                  ([styles.avatarContainer],
                  localFilterActive(houseFilter.filter) && styles.activeFilter)
                }>
                <Avatar border size="big" uri={houseFilter.houseImage} />
              </View>
              <Text style={styles.textHouse}>{houseFilter.houseName}</Text>
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
              <Text style={styles.textHouse}>{house.houseName}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default HouseFilter;
