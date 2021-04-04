import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

//Firebase
import {useGetFirebase} from '../../hooks/useGetFirebase';
import {useGetDocFirebase} from '../../hooks/useGetDocFIrebase';
import {useUpdateFirebase} from '../../hooks/useUpdateFirebase';

// UI
import PagetLayout from '../../components/PageLayout';
import CheckBox from '@react-native-community/checkbox';

// styles
import {defaultLabel} from '../../styles/common';

const styles = StyleSheet.create({
  checklistContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    marginTop: 40,
    // height: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
  },
  avatarWrapper: {
    flex: 1,
  },
  infoWrapper: {
    flex: 6,
  },
  name: {
    fontSize: 15,
  },
});

const CheckItem = ({check, handleCheck}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoWrapper}>
        <Text style={styles.name}>{check.title}</Text>
      </View>
      <View style={styles.checkboxWrapper}>
        <CheckBox
          disabled={false}
          value={check.done}
          onValueChange={() => handleCheck()}
        />
      </View>
    </View>
  );
};

const CheckScreen = ({route, navigation}) => {
  const {checkId} = route.params;
  const {document: checklist} = useGetDocFirebase('checklists', checkId);
  const {list: checks} = useGetFirebase(`checklists/${checkId}/checks`);

  const {updateFirebase} = useUpdateFirebase('checklists');

  const handleCheck = async (checklist, check, state) => {
    console.log(updateFirebase);
    try {
      await updateFirebase(`${checklist.id}`, {
        ...checklist,
        done: state ? checklist.done + 1 : checklist.done - 1,
      });
      await updateFirebase(`${checklist.id}/checks/${check.id}`, {
        ...check,
        done: state,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PagetLayout
      backButton
      titleProps={{
        subPage: true,
        title: `Check list en ${
          checklist?.house && checklist?.house[0]?.houseName
        }`,
        color: 'white',
      }}>
      <View style={styles.checklistContainer}>
        <Text style={{...defaultLabel, marginBottom: 20}}>
          ✅ Listado de checks
        </Text>
        {checks?.map((check) => (
          <CheckItem
            key={check.id}
            check={check}
            handleCheck={() => handleCheck(checklist, check, !check.done)}
          />
        ))}
      </View>
    </PagetLayout>
  );
};

export default CheckScreen;
