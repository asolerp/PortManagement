import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Text, StyleSheet} from 'react-native';
// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useAddFirebase} from '../../hooks/useAddFirebase';

import {useGetDocFirebase} from '../../hooks/useGetDocFIrebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Messages = ({job}) => {
  const [messages, setMessages] = useState([]);
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

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  console.log(userLoggedIn);

  const onSend = useCallback((messages = []) => {
    // addMessage(`jobs/${job.id}/tasks`, newTask);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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
