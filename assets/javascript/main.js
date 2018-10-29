
const config = {
  apiKey: "AIzaSyC-MssCY30HLQ-LbrgrRIIrCKhQFVzx4Cc",
  authDomain: "trainschedulers-a42f8.firebaseapp.com",
  databaseURL: "https://trainschedulers-a42f8.firebaseio.com",
  projectId: "trainschedulers-a42f8",
  storageBucket: "trainschedulers-a42f8.appspot.com",
  messagingSenderId: "631098993119"
};
firebase.initializeApp(config);

const database = firebase.database();

let train = {
  name: "",
  dest: "",
  freq: null,
}
