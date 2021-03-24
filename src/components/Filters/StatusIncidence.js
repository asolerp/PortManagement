import React, {useCallback} from 'react';

// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {setStatusIncidenceFilter} from '../../store/filterActions';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 0,
  },
  filterWrapper: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 50,
    marginRight: 10,
  },
  filterText: {
    color: 'white',
  },
});

const Filter = ({text, onPress, color, active}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          ...styles.filterWrapper,
          ...{backgroundColor: color, opacity: active ? 1 : 0.4},
        }}>
        <Text style={styles.filterText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const StatusIncidence = () => {
  const dispatch = useDispatch();
  const {statusIncidenceFilter} = useSelector(
    ({filters: {statusIncidenceFilter}}) => ({statusIncidenceFilter}),
    shallowEqual,
  );

  const handleStatusFilter = useCallback(
    (payload) => dispatch(setStatusIncidenceFilter(payload)),
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <Filter
        text="Resuletas"
        color="#7dd891"
        active={statusIncidenceFilter === true}
        onPress={() => handleStatusFilter(true)}
      />
      <Filter
        text="Sin resolver"
        color="#ED7A7A"
        active={statusIncidenceFilter === false}
        onPress={() => handleStatusFilter(false)}
      />
    </View>
  );
};

export default React.memo(StatusIncidence);
