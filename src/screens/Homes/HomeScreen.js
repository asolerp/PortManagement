import React from 'react';
import {ImageBackground} from 'react-native';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PagetLayout from '../../components/PageLayout';

import {useGetDocFirebase} from '../../hooks/useGetDocFIrebase';

const styles = StyleSheet.create({
  pageWrapper: {
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
});

const HomeScreen = ({route, navigation}) => {
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
          <View>
            <Text style={styles.titleStyle}>🏡 Datos de la vivienda</Text>
          </View>
        </View>
      ) : (
        <View />
      )}
    </PagetLayout>
  );
};

export default HomeScreen;
