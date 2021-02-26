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

    let promises = [];

    let incrementOrDecrementStats = () => {
      admin
        .firestore()
        .collection(`jobs`)
        .doc(taskAfter.jobId)
        .update({'stats.done': taskAfter.done ? increment : decrement});
    };

    let updateTaskStat = (taskId) => {
      admin
        .firestore()
        .collection('stats')
        .where('taskId', '==', taskId)
        .update({
          taskPriority: taskAfter.priority,
          date: taskAfter.date,
          done: taskAfter.done,
        });
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

    promises.push(updateTaskStat(taskAfter.id));

    return Promise.all(promises);
  });

exports.onDeleteTask = functions.firestore
  .document('jobs/{jobId}/tasks/{taskId}')
  .onDelete((snap, context) => {
    const decrement = FieldValue.increment(-1);
    const taskDeleted = snap.data();

    const deleteTaskStat = () => {
      admin.firestore().collection('stats').where('taskId', '==', snap.id);
    };

    const decrementStats = () => {
      admin
        .firestore()
        .collection(`jobs`)
        .doc(taskDeleted.jobId)
        .update({
          'stats.total': decrement,
          'stats.done': taskDeleted.done && decrement,
        });
    };

    return Promise.all([deleteTaskStat(), decrementStats()]);
  });

exports.onCreateTask = functions.firestore
  .document('jobs/{jobId}/tasks/{taskId}')
  .onCreate((snap, context) => {
    const increment = FieldValue.increment(1);
    const taskCreated = snap.data();

    const addNewStats = () => {
      admin.firestore().collection('stats').add({
        taskId: snap.id,
        jobId: taskCreated.jobId,
        taskPriority: taskCreated.priority,
        date: taskCreated.date,
        done: false,
      });
    };

    const incrementStats = () => {
      admin
        .firestore()
        .collection(`jobs`)
        .doc(taskCreated.jobId)
        .update({'stats.total': increment});
    };

    return Promise.all([addNewStats(), incrementStats()]);
  });
