let database;


function setup(){
    var config = {
        apiKey: "AIzaSyAsmPDo7Ro1poiojuwzt1c5eX0VEfDk06I",
        authDomain: "phonecontrol-b621f.firebaseapp.com",
        databaseURL: "https://phonecontrol-b621f-default-rtdb.firebaseio.com",
        projectId: "phonecontrol-b621f",
        storageBucket: "",
        messagingSenderId: "539323362345",
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
