
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
  trainT: null,
  freq: null,
}

function addTrainData(){
  console.log("completed");
  train.name = $('#trainInput').val().trim();
  train.dest = $('#destInput').val().trim();
  train.trainT = $('#trainTinput').val().trim();
  train.freq = $('#freqInput').val().trim();

  database.ref().push({
    trainData: train,
  })
}

$('#submit').on('click', function(event){
  console.log("I'm clicked and calling addTrainData");
  event.preventDefault();
  addTrainData();
})

database.ref().on('child_added', function(childSnapshot){
  console.log("test data pull", JSON.stringify(childSnapshot.val().trainData));
  let row = $('<tr>');
  $('.table').append(row);
  $(row).append('<td>' + childSnapshot.val().trainData.name + '</td>')
  $(row).append('<td>' + childSnapshot.val().trainData.dest + '</td>')
  $(row).append('<td>' + childSnapshot.val().trainData.freq + '</td>')
  $(row).append('<td>' + childSnapshot.val().trainData.trainT + '</td>')
})
