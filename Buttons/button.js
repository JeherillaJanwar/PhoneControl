let database;


function setup(){
    var config = {
        apiKey: "AIzaSyCFcpMq9wXWiDSzll4_dWzBeYySQ6m9cc4",
        authDomain: "ctrl-daa52.firebaseapp.com",
        databaseURL: "https://try2-70357.firebaseio.com",
        projectId: "ctrl-daa52",
        storageBucket: "",
        messagingSenderId: "676697146360"
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
