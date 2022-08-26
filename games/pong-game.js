let database;
let x = 200;
let y ;
let ex = 20;
let ey = 20;
let er = 20;
let rwidth = 100;
let rheight = 20;
let exs = 2;
let eys = 2;
let barspeed = 5;
let point = 0;
let isdarkMode = false

function setup(){

    cv = createCanvas(400,600);
    cv.parent(document.getElementById("canvasParent"));
    y = height-20;

    let config = {
        apiKey: "AIzaSyDVeRD0P145hETu39Ryh4HM8rvlTSj4Kos",
        authDomain: "try2-70357.firebaseapp.com",
        databaseURL: "https://try2-70357.firebaseio.com",
        projectId: "try2-70357",
        storageBucket: "",
        messagingSenderId: "99106327684" 
        };

    firebase.initializeApp(config);
    database = firebase.database();

    let ref = database.ref('game');
    ref.on('value', gotData, errData);
}



function draw(){
    background(0);
    fill(255,60,80);
    ellipse(ex, ey, er)
    fill(255);
    rect(x, y, rwidth, rheight);
    textSize(32)
    text(point, 20,50);
    checkSide();
    checkBounce();
    ex += exs;
    ey += eys;

    if(checkKill()){
        point = 0
        ex = width-80
        ey = 20
        exs = 2;
        eys = 2;
    }
}


function gotData(data){
    let moves = data.val();
    let keys = Object.keys(moves);
    let lastItem = keys.length
    let k = keys[lastItem-1];
    let lastDirection = moves[k].direction;
    checkDirection(lastDirection)
}
    
function errData(err){
    console.log(err);
}



function checkDirection(dir){
    if(dir == 'right'){
        x+=barspeed;
    }
    if(dir == 'left'){
        x-=barspeed;
        
    }
}



function checkSide(){
    if (ex+er/2 > width || ex-er/2<0){
        exs *= -1;
    }  
    if (ey+er/2 > height || ey-er/2<0){
        eys *= -1;
    }  
}


function checkBounce(){
    if (ex >= x && ex <= (x + rwidth)){
        if(ey + er/2 >= y && ey <= (y + rheight)){
            bounce();
        }
    }
}

function checkKill(){
    return(ey + er/2 > height)    
}


function testmode(){
    text(x+'x : y'+y,100,200);
    text(ex+'ex : ey'+ey,100,500);   
}



function bounce(){
    eys *= -1;
    point++;
}


function toggleDarkMode() {
    isdarkMode = isdarkMode ? false : true;
    // document.getElementById("darkbtn").style.backgroundColor = "white";
    if (isdarkMode) {
      document.getElementById("darkbtn").style.filter = "invert(100%)";
      document.getElementById("body").style.backgroundColor = "#161616";
    } else {
      document.getElementById("darkbtn").style.filter = "invert(0%)";
      document.getElementById("body").style.backgroundColor = "#f1f2ec";
    }
    print(isdarkMode);
  }
  
