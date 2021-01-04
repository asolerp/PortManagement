import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// Firebase
import firestore from '@react-native-firebase/firestore';

import AddButton from '../../components/Elements/AddButton';
import TitlePage from '../../components/TitlePage';
import HouseItemList from '../../components/HouseItemList';

const HomesScreen = ({navigation}) => {
  const [housesList, setHousesList] = useState([]);

  console.log('lista de casas', housesList);

  const onResult = (QuerySnapshot) => {
    setHousesList(QuerySnapshot.docs.map((doc) => doc.data()));
  };

  const onError = (error) => {
    console.error(error);
  };

  const handleNewHome = () => {
    navigation.navigate('NewHome');
  };

  const renderItem = ({item}) => {
    return <HouseItemList house={item} />;
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('houses')
      .onSnapshot(onResult, onError);

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <React.Fragment>
      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => handleNewHome()}>
          <AddButton />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TitlePage title="Casas" />
        <View style={styles.homesScreen}>
          <ScrollView contentContainerStyle={styles.scrollWrapper}>
            {housesList ? (
              <SafeAreaView style={{alignSelf: 'stretch'}}>
                <FlatList
                  data={housesList}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                  }}
                />
              </SafeAreaView>
            ) : (
              <Text>No se han encontrado casas</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 120,
    zIndex: 10,
  },
  homesScreen: {
    flex: 5,
    paddingTop: 20,
  },
  scrollWrapper: {
    flex: 1,
    alignItems: 'center',
  },
});

export default HomesScreen;
