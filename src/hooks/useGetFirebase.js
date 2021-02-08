import firestore from '@react-native-firebase/firestore';

import {useState, useEffect} from 'react';

export const useGetFirebase = (coll) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [list, setList] = useState([]);

  const onResult = (QuerySnapshot) => {
    setLoading(false);
    setList(QuerySnapshot.docs.map((doc) => doc.data()));
  };

  const onError = (err) => {
    setLoading(false);
    setError(err);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection(coll)
      .onSnapshot(onResult, onError);

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return {
    list,
    loading,
    error,
  };
};
