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

export function fetchcounts(callback) {
  console.log('FETCHING ');
  database.ref('counts').on('value', (snapshot) => {
    const newcountState = snapshot.val();
    callback(newcountState);
  });
}
export function addcount(newcount) {
  firebase.database().ref('counts').push(newcount);
}
export function pushChanges(id, count) {
  firebase.database().ref('counts').child(id).set(count);
}
