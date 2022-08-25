let database;


function setup(){
    var config = {
        apiKey: "AIzaSyBSGlboijsMh_XAq8AhtjQlabfFvQQjdSY",
        authDomain: "phonectrl-3a20f.firebaseapp.com",
        databaseURL: "https://phonectrl-3a20f.firebaseio.com",
        projectId: "phonectrl-3a20f",
        storageBucket: "",
        messagingSenderId: "213411049039"
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
