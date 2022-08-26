let database;


function setup(){
    var config = {
        apiKey: "AIzaSyBy9bA_kz9QJ6x-BUvEzJS-q1AhavbIX7o",
        authDomain: "ctrl-e5cb6.firebaseapp.com",
        projectId: "ctrl-e5cb6",
        databaseURL: "https://ctrl-e5cb6-default-rtdb.firebaseio.com/",
        storageBucket: "",
        messagingSenderId: "792254185253",
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
