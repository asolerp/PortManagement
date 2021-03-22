import React from 'react';
import {useRoute} from '@react-navigation/native';

import {View, Text, StyleSheet} from 'react-native';

import GridImageView from 'react-native-grid-image-viewer';

import {useGetFirebase} from '../../hooks/useGetFirebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

const Photos = () => {
  const route = useRoute();
  const {jobId} = route.params;
  const {list: photos, loading: loadingPhotos} = useGetFirebase(
    `jobs/${jobId}/photos`,
    {
      field: 'createdAt',
      type: 'desc',
    },
  );

  if (loadingPhotos) {
    return (
      <View vtyle={styles.container}>
        <Text>Cargando imágenes..</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <GridImageView data={photos} /> */}
    </View>
  );
};

export default React.memo(Photos);
