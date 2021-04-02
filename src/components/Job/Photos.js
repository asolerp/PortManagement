<<<<<<< HEAD
import React from 'react';
import {useRoute} from '@react-navigation/native';

import {View, Text, StyleSheet} from 'react-native';

import GridImageView from 'react-native-grid-image-viewer';

import {useGetFirebase} from '../../hooks/useGetFirebase';
=======
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

import {useGetFirebase} from '../../hooks/useGetFirebase';
import {Dimensions} from 'react-native';
>>>>>>> dad1bd1 (commit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    paddingVertical: 20,
    paddingHorizontal: 20,
=======
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  photo: {
    width: (Dimensions.get('window').width - 65 - 10) / 3,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
>>>>>>> dad1bd1 (commit)
  },
});

const Photos = () => {
  const route = useRoute();
  const {jobId} = route.params;
<<<<<<< HEAD
=======

  const [modal, setModal] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const handlePressPhoto = (i) => {
    setModal(true);
    setImageIndex(i);
  };

  const Photo = ({photo, index}) => {
    return (
      <TouchableOpacity onPress={() => handlePressPhoto(index)}>
        <ImageBackground
          source={{uri: photo.image}}
          style={styles.photo}
          imageStyle={{borderRadius: 5}}
        />
      </TouchableOpacity>
    );
  };

>>>>>>> dad1bd1 (commit)
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
<<<<<<< HEAD
    <View style={styles.container}>
      {/* <GridImageView data={photos} /> */}
    </View>
=======
    <React.Fragment>
      <Modal
        visible={modal}
        transparent={true}
        onRequestClose={() => setModal(false)}>
        <ImageViewer
          index={imageIndex}
          imageUrls={photos?.map((url) => ({url: url.image}))}
          onSwipeDown={() => {
            setModal(false);
          }}
          enableSwipeDown={true}
        />
      </Modal>
      <View style={styles.container}>
        {photos?.map((photo, i) => (
          <Photo photo={photo} index={i} key={photo} />
        ))}
      </View>
    </React.Fragment>
>>>>>>> dad1bd1 (commit)
  );
};

export default React.memo(Photos);
