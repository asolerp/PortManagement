import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

// Ui
import {VictoryPie} from 'victory-native';
import PriorityResume from './PriorityResume';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  prioritiesWrapper: {
    justifyContent: 'center',
  },
});

const JobsResume = () => {
  return (
    <View style={styles.container}>
      <View>
        <VictoryPie
          data={[{x: 'Alta', y: 5}, {x: 'Media', y: 10}, {x: 'Baja', y: 1}, ,]}
          width={250}
          height={250}
          padAngle={5}
          labels={() => null}
          colorScale={['#ED7A7A', '#F5C66D', '#58BFC0']}
          innerRadius={50}
          style={{
            labels: {
              fill: 'red',
              fontSize: 15,
              padding: 7,
            },
          }}
        />
      </View>
      <View style={styles.prioritiesWrapper}>
        <PriorityResume color="#ED7A7A" label="Alta" value={7} />
        <PriorityResume color="#F5C66D" label="Media" value={15} />
        <PriorityResume color="#58BFC0" label="Baja" value={3} />
      </View>
      <View />
    </View>
  );
};

export default JobsResume;
