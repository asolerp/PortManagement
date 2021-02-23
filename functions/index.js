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

    if (taskBefore.done !== taskAfter.done) {
      admin
        .firestore()
        .collection(`jobs`)
        .doc(taskAfter.jobId)
        .update({'stats.done': taskAfter.done ? increment : decrement});
    }
  });

exports.onDeleteTask = functions.firestore
  .document('jobs/{jobId}/tasks/{taskId}')
  .onDelete((snap, context) => {
    const decrement = FieldValue.increment(-1);
    const taskDeleted = snap.data();

    admin
      .firestore()
      .collection(`jobs`)
      .doc(taskDeleted.jobId)
      .update({
        'stats.total': decrement,
        'stats.done': taskDeleted.done && decrement,
      });
  });

exports.onCreateTask = functions.firestore
  .document('jobs/{jobId}/tasks/{taskId}')
  .onCreate((snap, context) => {
    const increment = FieldValue.increment(1);
    const taskCreated = snap.data();

    admin
      .firestore()
      .collection(`jobs`)
      .doc(taskCreated.jobId)
      .update({'stats.total': increment});
  });
