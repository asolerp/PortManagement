import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Text, StyleSheet} from 'react-native';
// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useAddFirebase} from '../../hooks/useAddFirebase';

import firestore from '@react-native-firebase/firestore';
import {useGetDocFirebase} from '../../hooks/useGetDocFIrebase';
import {useGetFirebase} from '../../hooks/useGetFirebase';

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

  const onSend = useCallback(
    (messages = []) => {
      console.log(messages);
      addMessage(`jobs/${job.id}/messages`, {
        ...messages[0],
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    },
    [addMessage, job],
  );

  if (loadingMessages) {
    return (
      <View>
        <Text>Cargando mensajes</Text>
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      renderDay={(props) => (
        <View style={props.containerStyle}>
          <Text
            style={{
              color: '#969696',
              marginBottom: 10,
              textAlign: 'center',
              fontSize: 12,
            }}>
            {`${props.currentMessage.createdAt
              .toDate()
              .toLocaleString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}`}
          </Text>
        </View>
      )}
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
  );
};

export default Messages;
