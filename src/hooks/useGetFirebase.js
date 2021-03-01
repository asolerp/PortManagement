import firestore from '@react-native-firebase/firestore';

import {useState, useEffect} from 'react';

export const useGetFirebase = (coll, order) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [list, setList] = useState([]);

  const onResult = (QuerySnapshot) => {
    setLoading(false);
    setList(QuerySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
  };

  const onError = (err) => {
    setLoading(false);
    setError(err);
  };

  useEffect(() => {
    let subscriber;
    if (order) {
      subscriber = firestore()
        .collection(coll)
        .orderBy(order.field, order.type)
        .onSnapshot(onResult, onError);
    } else {
      subscriber = firestore().collection(coll).onSnapshot(onResult, onError);
    }

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return {
    list,
    loading,
    error,
  };
};
