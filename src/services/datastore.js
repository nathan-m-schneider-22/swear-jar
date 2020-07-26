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

export function fetchNotes(category, callback) {
  console.log('FETCHING ', category);
  database.ref(`notes/${category}`).on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
  // do something here
  // callback() when done
}
export function addNote(category, newNote) {
  firebase.database().ref(`notes/${category}`).push(newNote);
}
export function deleteNote(category, id) {
  firebase.database().ref(`notes/${category}`).child(id).remove();
}
export function pushChanges(category, id, note) {
  firebase.database().ref(`notes/${category}`).child(id).set(note);
}
export function focus(category, id, zIndex) {
  firebase.database().ref(`notes/${category}`).child(id).update({ zIndex });
}
