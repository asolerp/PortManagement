import React, {useState, useCallback} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

import Avatar from '../Avatar';

import {useGetFirebase} from '../../hooks/useGetFirebase';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {defaultHouseFilters} from '../../constants/housesFilter';

const heightFilter = 113;
const widthFilter = 90;

const styles = StyleSheet.create({
  filterWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  container: {
    width: '98%',
    marginTop: 10,
    paddingLeft: 5,
  },
  titleFilter: {
    color: '#284748',
    fontSize: 25,
    fontWeight: 'bold',
  },
  housesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  houseFilter: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginRight: 20,
    width: widthFilter,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#6b6b6b',
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  avatarContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: heightFilter,
    zIndex: 1,
  },
  maskContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    height: 113,
  },
  activeFilter: {
    borderWidth: 4,
    borderColor: '#EB5B28',
    borderRadius: 24,
    marginBottom: 0,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    position: 'absolute',
    borderRadius: 20,
    width: '100%',
    height: heightFilter,
    zIndex: 3,
  },
  maskWrapper: {
    position: 'absolute',
    backgroundColor: '#54A3AC',
    opacity: 0.56,
    borderRadius: 20,
    width: '100%',
    marginTop: 10,
    height: heightFilter,
    zIndex: 2,
  },
  textStyle: {
    textAlign: 'left',
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});

const HouseFilter = () => {
  const dispatch = useDispatch();
  const {list, loading, error} = useGetFirebase('houses');
  const [localFilter, setLocalFilter] = useState('all_houses');
  const {houses} = useSelector(
    ({filters: {houses}}) => ({houses}),
    shallowEqual,
  );

  const addHouse = useCallback(
    (payload) =>
      dispatch({
        type: 'ADD_HOUSE',
        payload: payload,
      }),
    [dispatch],
  );

  const isInArray = (id) => {
    return houses?.find((idHouse) => idHouse === id);
  };

  const localFilterActive = (filter) => {
    return localFilter === filter;
  };

  const handleSetLocalFilter = (filter) => {
    setLocalFilter(filter);
    if (filter === 'all_houses') {
      addHouse([]);
    } else {
      addHouse(null);
    }
  };

  const handleSetHouse = (house) => {
    if (isInArray(house.id)) {
      const housesWithoutID = houses?.filter((id) => {
        return id !== house.id;
      });
      addHouse(housesWithoutID);
    } else {
      dispatch({
        type: 'ADD_HOUSE',
        payload: [...(houses || []), house.id],
      });
    }
    setLocalFilter(undefined);
  };

  return (
    <View style={styles.filterWrapper}>
      <Text style={styles.titleFilter}>Las Casas</Text>
      <ScrollView horizontal={true} style={styles.container}>
        <View style={styles.housesWrapper}>
          {/* {defaultHouseFilters.map((houseFilter, i) => {
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
                <View />
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
        })} */}
          {list.map((house, i) => {
            return (
              <TouchableOpacity
                key={house.id}
                onPress={() => handleSetHouse(house)}>
                <View style={styles.houseFilter}>
                  <View
                    style={
                      ([styles.avatarContainer],
                      isInArray(house.id) && styles.activeFilter)
                    }>
                    <Image
                      style={[
                        styles.ownerImage,
                        {width: 90, height: 113, borderRadius: 20},
                      ]}
                      source={{
                        uri: house.houseImage,
                      }}
                    />
                  </View>
                  <View style={styles.maskWrapper} />
                  <View style={styles.textWrapper}>
                    <Text style={styles.textStyle}>{house.houseName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default HouseFilter;
