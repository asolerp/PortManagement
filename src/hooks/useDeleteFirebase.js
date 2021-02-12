import firestore from '@react-native-firebase/firestore';

import {useState} from 'react';

export const useDeleteFirebase = (coll, doc) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const deleteFirebase = async () => {
    setLoading(true);
    try {
      await firestore().collection(coll).doc(doc).delete();
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    deleteFirebase,
    loading,
    error,
  };
};