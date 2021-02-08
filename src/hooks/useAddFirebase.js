import firestore from '@react-native-firebase/firestore';

import {useState} from 'react';

export const useAddFirebase = (coll) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const addFirebase = async (document) => {
    setLoading(true);
    try {
      await firestore().collection(coll).add(document);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    addFirebase,
    loading,
    error,
  };
};
