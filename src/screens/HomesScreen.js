import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// Firebase
import firestore from '@react-native-firebase/firestore';

import AddButton from '../components/Elements/AddButton';
import ProfileBar from '../components/ProfileBar';
import HouseItemList from '../components/HouseItemList';

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
        <ProfileBar />
        <View style={styles.homesScreen}>
          <ScrollView contentContainerStyle={styles.scrollWrapper}>
            {housesList ? (
              <View style={{alignSelf: 'stretch'}}>
                <FlatList
                  data={housesList}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
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
    backgroundColor: '#F2F2F2',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 120,
    zIndex: 10,
  },
  homesScreen: {
    flex: 5,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  scrollWrapper: {
    flex: 1,
  },
});

export default HomesScreen;
