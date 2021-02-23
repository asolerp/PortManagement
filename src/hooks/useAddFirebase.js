import firestore from '@react-native-firebase/firestore';

import {useState} from 'react';

export const useAddFirebase = (coll) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const addFirebase = async (document) => {
    setLoading(true);
    try {
      const res = await firestore().collection(coll).add(document);
      setResult(res);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    addFirebase,
    result,
    loading,
    error,
  };
};
