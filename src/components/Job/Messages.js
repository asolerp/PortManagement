import React, {useState, useCallback, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {GiftedChat, Bubble, Time} from 'react-native-gifted-chat';
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
import {useUpdateFirebase} from '../../hooks/useUpdateFirebase';
import {useGetFirebase} from '../../hooks/useGetFirebase';
import {setMessagesAsRead} from '../../firebase/setMessagesAsRead';

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

const Messages = () => {
  const route = useRoute();
  const {jobId} = route.params;

  const [messageImage, setMessageImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(null);
  const [local, setLocal] = useState([]);

  const {list: messages, loading: loadingMessages} = useGetFirebase(
    `jobs/${jobId}/messages`,
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
    result: resultAddMessage,
    loading: loadingAddMessage,
    error: addMessageError,
  } = useAddFirebase();

  const {
    updateFirebase,
    loading: updatingMessage,
    error: errorUpdatingMessage,
  } = useUpdateFirebase('jobs');

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
      addMessage(`jobs/${jobId}/messages`, {
        ...messages[0],
        createdAt: firestore.FieldValue.serverTimestamp(),
        sent: true,
        received: false,
      });
    },
    [addMessage, jobId],
  );

  useEffect(() => {
    if (messages.length > 0) {
      setMessagesAsRead(jobId, user.uid);
    }
  }, [messages, jobId]);

  useEffect(() => {
    const uploadImage = async () => {
      const messageID = messageIdGenerator();

      const waitingSendImageMessage = {
        _id: messageID,
        image:
          'https://res.cloudinary.com/enalbis/image/upload/v1614849090/PortManagement/loader_ro9a3e.gif',
        messageType: 'image',
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: {
          _id: userLoggedIn?.id,
          name: userLoggedIn?.firstName,
          avatar: userLoggedIn?.profileImage,
        },
      };

      const result = await addMessage(
        `jobs/${jobId}/messages`,
        waitingSendImageMessage,
      );

      const image = await cloudinaryUpload(
        messageImage,
        `/PortManagement/Jobs/${jobId}/Photos`,
      );

      updateFirebase(`${jobId}/messages/${result.id}`, {
        ...waitingSendImageMessage,
        image: image,
      });

      addPhoto(`jobs/${jobId}/photos`, {
        createdAt: firestore.FieldValue.serverTimestamp(),
        image: image,
      });
    };
    if (messageImage !== null) {
      uploadImage();
    }
  }, [messageImage]);

  // if (loadingMessages) {
  //   return (
  //     <View>
  //       <Text>Cargando mensajes</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView contentContainerStyle={{height: '100%', marginTop: 20}}>
      <GiftedChat
        bottomOffset={-3}
        isLoadingEarlier={loadingAddPhoto}
        renderBubble={(props) => (
          <Bubble
            {...props}
            textStyle={{
              right: {
                color: 'white',
              },
            }}
            wrapperStyle={{
              right: {
                backgroundColor: '#5BAB9C',
              },
            }}
          />
        )}
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
        // renderTime={(props) => (
        //   <Time
        //     {...props}
        //     textStyle={{
        //       right: {
        //         color: 'black',
        //       },
        //       left: {
        //         color: 'white',
        //       },
        //     }}
        //   />
        // )}
        renderTime={(props) => (
          <View style={props.containerStyle}>
            <Text
              style={{
                marginHorizontal: 10,
                marginBottom: 5,
                color: props.position === 'left' ? 'black' : 'white',
              }}>
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

export default React.memo(Messages);
