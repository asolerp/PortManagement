import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';

import {useGetFirebase} from '../hooks/useGetFirebase';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  incidenceWrapper: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

const renderItem = ({item}) => {
  return (
    <View style={styles.incidenceWrapper}>
      <Text>
        <Text style={styles.bold}>⚠️ {item?.user?.firstName} </Text>
        <Text>ha creado una nueva incidencia en 🏡 </Text>
        <Text style={styles.bold}>{item?.house?.houseName}...</Text>
      </Text>
    </View>
  );
};

const IncidencesList = () => {
  const {list, loading, error} = useGetFirebase('incidences');

  if (loading) {
    return <Text>Cargando lista..</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default IncidencesList;
