import React, {useState, useEffect} from 'react';
import {useSelector, shallowEqual} from 'react-redux';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';

// Firebase
import firestore from '@react-native-firebase/firestore';

import {SearchBar} from 'react-native-elements';
import ItemList from './ItemList';

const DynamicSelectorList = ({
  collection,
  filter,
  searchBy,
  schema,
  set,
  get,
  multiple = false,
}) => {
  const [search, setSearch] = useState();
  const [list, setList] = useState();
  const [filteredList, setFilteredList] = useState();

  const {job} = useSelector(({jobForm: {job}}) => ({job}), shallowEqual);

  useEffect(() => {
    const listUsers = [];
    let query = firestore().collection(collection);

    if (filter) {
      query = query.where(filter.label, filter.operator, filter.value);
    }

    query = query
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          listUsers.push({id: documentSnapshot.id, ...documentSnapshot.data()});
        });
      })
      .then(() => setList(listUsers));
  }, [filter, collection]);

  const handleSearch = (text) => {
    setSearch(text);
    const fList = list.filter((item) =>
      item[searchBy].toLowerCase().includes(search?.toLowerCase()),
    );
    setFilteredList(fList);
  };

  useEffect(() => {
    if (search?.lenght === 0 || !search) {
      setFilteredList(undefined);
    }
  }, [search]);

  console.log('get', get);

  const renderItem = ({item}) => {
    return (
      <React.Fragment>
        <ItemList
          item={item}
          schema={schema}
          setter={set}
          getter={job?.[get]?.value || []}
          multiple={multiple}
        />
        <View style={styles.separator} />
      </React.Fragment>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userListSelectorScreen}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={handleSearch}
          value={search}
          platform="ios"
          round
          containerStyle={{padding: 0}}
          inputStyle={{fontSize: 14, padding: 0}}
        />

        {/* <ScrollView contentContainerStyle={styles.scrollWrapper}> */}
        {list ? (
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <FlatList
              data={filteredList || list}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        ) : (
          <Text>No se han encontrado propietarios</Text>
        )}
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleWrapper: {},
  userListSelectorScreen: {},
  scrollWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSearchBar: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  inputContainerStyle: {
    backgroundColor: 'white',
  },
  separator: {
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
  },
});

export default DynamicSelectorList;
