//Firebase

import firestore from '@react-native-firebase/firestore';

export const setMessagesAsRead = async (jobId, userId) => {
  console.log(jobId, userId);
  // Create a new batch instance
  const batch = firestore().batch();

  try {
    const querySnapshot = await firestore()
      .collection('jobs')
      .doc(jobId)
      .collection('messages')
      .where('received', '==', false)
      .where('user.id', '!=', userId)
      .get();
    querySnapshot.forEach((doc) => {
      console.log(doc, 'doc');
      const docRef = firestore()
        .collection('jobs')
        .doc(jobId)
        .collection('messages')
        .doc(doc.id);
      batch.update(docRef, {received: true});
    });

    batch.commit();
  } catch (err) {
    console.log(err);
  }
};
