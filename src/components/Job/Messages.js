import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

//Chat
import RenderDay from '../Chat/RenderDay';

// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useAddFirebase} from '../../hooks/useAddFirebase';

// Firebase
import firestore from '@react-native-firebase/firestore';
import {useGetDocFirebase} from '../../hooks/useGetDocFIrebase';
import {useGetFirebase} from '../../hooks/useGetFirebase';

// Utils
import {launchImage} from '../../utils/imageFunctions';
import {cloudinaryUpload} from '../../cloudinary/index';
import {messageIdGenerator} from '../../utils/uuid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

const Messages = ({job}) => {
  const [messageImage, setMessageImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(null);
  const [local, setLocal] = useState([]);

  const {list: messages, loading: loadingMessages} = useGetFirebase(
    `jobs/${job.id}/messages`,
    {
      field: 'createdAt',
      type: 'desc',
    },
  );
  const {user} = useSelector(
    ({userLoggedIn: {user}}) => ({user}),
    shallowEqual,
  );
  const {document: userLoggedIn, loading, error} = useGetDocFirebase(
    'users',
    user.uid,
  );
  const {
    addFirebase: addMessage,
    loading: loadingAddMessage,
    error: addMessageError,
  } = useAddFirebase();

  const {
    addFirebase: addPhoto,
    loading: loadingAddPhoto,
    error: addPhotoError,
  } = useAddFirebase();

  const onSendImage = () => {
    const loadingMessage = [
      {
        _id: messageIdGenerator(),
        text: 'Cargando imagen..',
        createdAt: messages[0].createdAt,
        user: {
          _id: userLoggedIn?.id,
          name: userLoggedIn?.firstName,
          avatar: userLoggedIn?.profileImage,
        },
      },
    ];
    // setLocal(loadingMessage);
    // console.log(GiftedChat.append(messages, loadingMessage));
    launchImage(setMessageImage);
  };

  const onSend = useCallback(
    (messages = []) => {
      addMessage(`jobs/${job.id}/messages`, {
        ...messages[0],
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    },
    [addMessage, job],
  );

  console.log('Cargando photo', loadingAddPhoto);

  // useEffect(() => {
  //   if (loadingAddPhoto) {
  //     const loadingMessage = [
  //       {
  //         _id: messageIdGenerator(),
  //         text: 'Cargando imagen..',
  //         createdAt: new Date(),
  //         user: {
  //           _id: userLoggedIn?.id,
  //           name: userLoggedIn?.firstName,
  //           avatar: userLoggedIn?.profileImage,
  //         },
  //       },
  //     ];
  //     GiftedChat.append(messages, loadingMessage);
  //   }
  // }, [loadingAddPhoto]);

  useEffect(() => {
    const uploadImage = async () => {
      const image = await cloudinaryUpload(
        messageImage,
        `/PortManagement/Jobs/${job.id}/Photos`,
      );
      const message = {};
      message._id = messageIdGenerator();
      message.createdAt = firestore.FieldValue.serverTimestamp();
      message.user = {
        _id: userLoggedIn?.id,
        name: userLoggedIn?.firstName,
        avatar: userLoggedIn?.profileImage,
      };
      message.image = image;
      message.messageType = 'image';
      addMessage(`jobs/${job.id}/messages`, message);
      addPhoto(`jobs/${job.id}/photos`, {
        createdAt: firestore.FieldValue.serverTimestamp(),
        image: image,
      });
    };
    if (messageImage !== null) {
      uploadImage();
    }
  }, [messageImage]);

  if (loadingMessages) {
    return (
      <View>
        <Text>Cargando mensajes</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{height: '100%', marginTop: 20}}>
      <GiftedChat
        bottomOffset={-3}
        isLoadingEarlier={loadingAddPhoto}
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
        messages={GiftedChat.append(messages, local)}
        renderActions={(props) => (
          <View
            style={{
              ...props.containerStyle,
            }}>
            <TouchableOpacity onPress={() => onSendImage()}>
              <Icon
                name="camera-alt"
                size={30}
                color={'black'}
                style={{marginLeft: 10, marginTop: -10}}
              />
            </TouchableOpacity>
          </View>
        )}
        renderDay={(props) => <RenderDay message={props} />}
        renderTime={(props) => (
          <View style={props.containerStyle}>
            <Text
              size={10}
              style={{marginHorizontal: 10, marginBottom: 5, color: 'white'}}
              bold
              color={props.position === 'left' ? 'white' : 'white'}>
              {`${props.currentMessage.createdAt
                .toDate()
                .toLocaleString('es-ES', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false,
                })}`}
            </Text>
          </View>
        )}
        showUserAvatar
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userLoggedIn?.id,
          name: userLoggedIn?.firstName,
          avatar: userLoggedIn?.profileImage,
        }}
      />
    </ScrollView>
  );
};

export default Messages;
