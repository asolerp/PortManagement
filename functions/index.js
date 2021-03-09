const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const FieldValue = require('firebase-admin').firestore.FieldValue;

admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});

exports.newUser = functions.auth.user().onCreate((user) => {
  admin.firestore().collection(`users`).doc(user.uid).set({email: user.email});
});

exports.editJobTaskStatus = functions.firestore
  .document('jobs/{jobId}/tasks/{taskId}')
  .onUpdate((change, context) => {
    const increment = FieldValue.increment(1);
    const decrement = FieldValue.increment(-1);

    const taskBefore = change.before.data();
    const taskAfter = change.after.data();

    console.log(context.params.taskId);

    let promises = [];

    let incrementOrDecrementStats = () => {
      admin
        .firestore()
        .collection(`jobs`)
        .doc(taskAfter.jobId)
        .update({'stats.done': taskAfter.done ? increment : decrement});
    };

    let updateTaskStat = () => {
      admin
        .firestore()
        .collection('stats')
        .where('taskId', '==', context.params.taskId)
        .limit(1)
        .get()
        .then((query) => {
          const stat = query.docs[0];
          return stat.ref.update({
            taskPriority: taskAfter.priority,
            date: taskAfter.date,
            done: taskAfter.done,
          });
        })
        .catch((err) => console.log(err));
    };

    if (taskBefore.workers.length > taskAfter.workers.length) {
      const workersUnAsigned = taskBefore.workers.filter(
        (oldWorker) =>
          !taskAfter.workers.some((newWorker) => oldWorker.id === newWorker.id),
      );
      console.log('UnAsigned Worker', workersUnAsigned);
    }

    if (taskBefore.done !== taskAfter.done) {
      promises.push(incrementOrDecrementStats());
    }

    promises.push(updateTaskStat());

    return Promise.all(promises).catch((err) => console.log(err));
  });

exports.onDeleteTask = functions.firestore
  .document('jobs/{jobId}/tasks/{taskId}')
  .onDelete((snap, context) => {
    const decrement = FieldValue.increment(-1);
    const taskDeleted = snap.data();

    let promises = [];

    const deleteTaskStat = () => {
      admin
        .firestore()
        .collection('stats')
        .where('taskId', '==', context.params.taskId)
        .limit(1)
        .get()
        .then((query) => {
          const stat = query.docs[0];
          return stat.ref.delete();
        })
        .catch((err) => console.log(err));
    };

    const decrementStats = () => {
      admin
        .firestore()
        .collection(`jobs`)
        .doc(taskDeleted.jobId)
        .update({
          'stats.total': decrement,
          'stats.done': taskDeleted.done ? decrement : FieldValue.increment(0),
        });
    };

    promises.push(deleteTaskStat());
    promises.push(decrementStats());

    return Promise.all(promises);
  });

exports.onCreateJob = functions.firestore
  .document('jobs/{jobId}')
  .onCreate((snap, context) => {
    const jobCreated = snap.data();

    const addNewStats = () => {
      admin.firestore().collection('stats').add({
        jobId: snap.id,
        priority: jobCreated.priority,
        date: jobCreated.date,
        done: false,
      });
    };

    return Promise.all([addNewStats()]);
  });
