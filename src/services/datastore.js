import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDCEQYfcxMsPPtTwyNDHe-dApFD-JGS3QU',
  authDomain: '<your-auth-domain>',
  databaseURL: 'https://firenotes-6cc55.firebaseio.com/',
  storageBucket: '<your-storage-bucket>',
  projectId: 'firenotes-6cc55',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    console.log('Pulling snapshot', snapshot.val());
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
  // do something here
  // callback() when done
}
export function addNote(newNote) {
  firebase.database().ref('notes').push(newNote);
}
export function deleteNote(id) {
  firebase.database().ref('notes').child(id).remove();
}
export function pushChanges(id, note) {
  firebase.database().ref('notes').child(id).set(note);
}
