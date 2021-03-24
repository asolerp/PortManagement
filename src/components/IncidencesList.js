import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useGetFirebase} from '../hooks/useGetFirebase';

// Utils
import {minimizetext} from '../utils/parsers';
import InfoIcon from './InfoIcon';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  incidenceWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  infoWrapper: {
    marginTop: 10,
    flexDirection: 'row',
  },
  rightWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});

const IncidencesList = () => {
  const {statusIncidenceFilter} = useSelector(
    ({filters: {statusIncidenceFilter}}) => ({statusIncidenceFilter}),
    shallowEqual,
  );

  const {list, loading, error} = useGetFirebase('incidences');
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    const handlePressIncidence = () => {
      navigation.navigate('Incidence', {
        incidenceId: item.id,
      });
    };

    return (
      <TouchableOpacity
        style={styles.incidenceWrapper}
        onPress={() => handlePressIncidence()}>
        <View>
          <Text style={styles.title}>⚠️ {item?.title} </Text>
          <Text>{minimizetext(item?.incidence)}</Text>
          <View style={styles.infoWrapper}>
            <Text style={{marginRight: 10}}>
              <Text>👮‍♂️ Informador: </Text>
              <Text style={styles.bold}>{item?.user?.firstName}</Text>
            </Text>
            <Text>
              <Text style={styles.bold}>🏡 {item?.house?.houseName}</Text>
            </Text>
          </View>
          <View style={{width: 110, marginTop: 10}}>
            <InfoIcon
              info={item.done ? 'Resuleta' : 'Sin resolver'}
              color={item.done ? '#7dd891' : '#ED7A7A'}
            />
          </View>
        </View>
        <View style={styles.rightWrapper}>
          <Icon name="keyboard-arrow-right" color="#454545" size={30} />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Text>Cargando lista..</Text>;
  }

  if (list.length === 0) {
    return <Text>No hay ninguna incidencia</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={list.filter((inci) => inci.done === statusIncidenceFilter)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default IncidencesList;
