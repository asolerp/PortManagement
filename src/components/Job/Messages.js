import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Text, StyleSheet} from 'react-native';
// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useAddFirebase} from '../../hooks/useAddFirebase';

import {useGetDocFirebase} from '../../hooks/useGetDocFIrebase';
import {useGetFirebase} from '../../hooks/useGetFirebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Messages = ({job}) => {
  const {list: messages, loading: loadingMessages} = useGetFirebase(
    `jobs/${job.id}/messages`,
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

  console.log(userLoggedIn);

  const onSend = useCallback(
    (messages = []) => {
      console.log(messages);
      addMessage(`jobs/${job.id}/messages`, messages[0]);
      // setMessages((previousMessages) =>
      //   GiftedChat.append(previousMessages, messages),
      // );
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
