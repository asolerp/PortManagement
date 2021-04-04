import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AddButton from '../../components/Elements/AddButton';
import PagetLayout from '../../components/PageLayout';

//Firebase
import {useGetFirebase} from '../../hooks/useGetFirebase';

const styles = StyleSheet.create({
  filterWrapper: {
    marginVertical: 20,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 40,
    zIndex: 10,
  },
  todayStyle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  checkListWrapper: {
    marginTop: 20,
  },
  checkItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 10,
    marginBottom: 10,
  },
  checkText: {
    marginTop: 5,
  },
});

const CheckItem = ({check, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.checkItemWrapper}>
        <View>
          <Text>🏡 {check.house[0].houseName}</Text>
          <Text style={styles.checkText}>{check.observations}</Text>
        </View>
        <View>
          <Text>
            Termiandas {check.done}/{check.total}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CheckListScreen = ({navigation}) => {
  const {list: checkLists, loading, error} = useGetFirebase('checklists');
  const [state, setState] = useState(false);

  console.log(checkLists);

  const handleNewCheckList = () => {
    navigation.navigate('NewCheckList');
  };

  if (loading) {
    return null;
  }

  return (
    <React.Fragment>
      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => handleNewCheckList()}>
          <AddButton iconName="add" />
        </TouchableOpacity>
      </View>
      <PagetLayout
        titleLefSide={true}
        titleProps={{
          title: 'CheckList',
          subPage: false,
        }}>
        <View>
          <View style={styles.filterWrapper}>
            <Text style={{...styles.todayStyle}}>✅ CheckList</Text>
            <View style={styles.checkListWrapper}>
              {checkLists?.map((checklist) => (
                <CheckItem
                  key={checklist.id}
                  check={checklist}
                  onPress={() =>
                    navigation.navigate('Check', {
                      checkId: checklist.id,
                    })
                  }
                />
              ))}
            </View>
          </View>
        </View>
      </PagetLayout>
    </React.Fragment>
  );
};

export default CheckListScreen;
