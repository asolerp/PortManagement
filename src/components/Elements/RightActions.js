import React from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DeleteJobAlert from '../Alerts/DeleteJobAlert';

const RightActions = (progress, dragX, action) => {
  return (
    <React.Fragment>
      <TouchableOpacity onPress={() => DeleteJobAlert(action)}>
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#EB5B28',
            justifyContent: 'center',
            marginLeft: 10,
          }}>
          <Icon name="trash-outline" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default RightActions;