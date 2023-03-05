let database;


function setup(){
    var config = {
        apiKey: "AIzaSyDI-Yvcsy2fDXP-WIzTyWuIUnJWQZbbir8",
        authDomain: "just-built.firebaseapp.com",
        databaseURL: "https://just-built-default-rtdb.firebaseio.com",
        projectId: "just-built",
        storageBucket: "",
        messagingSenderId: "890321614965"
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
