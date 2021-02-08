//Firebase

import firestore from '@react-native-firebase/firestore';

export const newJob = async (data) => {
  try {
    await firestore().collection('jobs').add(data);
  } catch (err) {
    console.log(err);
  }
};
