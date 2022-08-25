let database;


function setup(){
    var config = {
        apiKey: "AIzaSyBKS71W1WbRjnDW3whpAotUT217xRcv_CY",
        authDomain: "phonectrl-b01b8.firebaseapp.com",
        projectId: "phonectrl-b01b8",
        storageBucket: "phonectrl-b01b8.appspot.com",
        messagingSenderId: "765246585907",
        appId: "1:765246585907:web:5275d48b39a865bb02f746",
        measurementId: "G-MFZ6PTPXGQ"
    };

    firebase.initializeApp(config);
    database = firebase.database();

    var ref = database.ref('game');
    ref.on('value', gotData, errData);
}


function right(){
    sentData('right')
}
function left(){
    sentData('left')
}
function down(){
    sentData('down')
}
function up(){
    sentData('up')
}



function sentData(direction){
    var ref = database.ref('game');
    let data = {
        direction: direction
    }
   ref.push(data, dataSent);

    function dataSent(status){
        // console.log(status)
    }
}


function gotData(data){
    // console.table(data)
}
function errData(err){
    // console.log(err)
}
