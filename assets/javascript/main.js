
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

let currentTime = moment();

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
  $('#trainInput').val('');
  $('#destInput').val('');
  $('#trainTinput').val('');
  $('#freqInput').val('');
})

function databasePull(){
  database.ref().on('child_added', function(childSnapshot){
    console.log("test data pull", JSON.stringify(childSnapshot.val()));
    let row = $('<tr>');
    let arrival = moment(childSnapshot.val().trainData.trainT, 'HH:mm').subtract(1, 'year');
    // console.log("Train Arrival converted:", arrival);
    let freq = childSnapshot.val().trainData.freq;
    // console.log("Set train frequency",freq);
    let differ = currentTime.diff(moment(arrival), "minutes");
    // console.log("Difference in minutes between current time and train:", differ);
    let timeRemaining = differ % freq;
    // console.log("Time remaining:",timeRemaining);
    let minTillTrain = freq - timeRemaining;
    // console.log("minutes till train", minTillTrain);
    let nextTrain = moment().add(minTillTrain, "minutes");
    // console.log("next train:", nextTrain);
    let nextTrainTime = (moment(nextTrain, 'minutes').format('h:mm A'));

    $('.table').append(row);
    $(row).append('<td>' + childSnapshot.val().trainData.name + '</td>');
    $(row).append('<td>' + childSnapshot.val().trainData.dest + '</td>');
    $(row).append('<td>' + freq + '</td>');
    $(row).append('<td>' + nextTrainTime + '</td>');
    $(row).append('<td>' + minTillTrain + '</td>');
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
}

// setInterval(databasePull, 5000);

databasePull();
