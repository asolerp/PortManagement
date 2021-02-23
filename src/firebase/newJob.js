//Firebase

import firestore from '@react-native-firebase/firestore';

export const newJob = async (job, tasks) => {
  try {
    const result = await firestore().collection('jobs').add(job);
    // Create a new batch instance
    const batch = firestore().batch();

    tasks.forEach((task) => {
      const newTask = {
        name: task.name,
        jobId: result.id,
        description: task.description,
        priority: task.priority.value,
        workers: task.workers.value,
      };
      const docRef = firestore()
        .collection('jobs')
        .doc(result.id)
        .collection('tasks')
        .doc();
      batch.set(docRef, newTask);
    });

    batch.commit();
  } catch (err) {
    console.log(err);
  }
};
