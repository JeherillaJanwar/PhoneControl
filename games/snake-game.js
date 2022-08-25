//Delcare Global Variables
let s;
const scl = 32;
let food;
let isdarkMode = false;
let cv
// p5js Setup function - required

function setup() {
   cv = createCanvas(640, 640);
  cv.parent(document.getElementById("canvasParent"));
    s = new Snake();
  frameRate (7);
  pickLocation();

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

// p5js Draw function - required

function draw() {
  background(25, 175);
  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();

  // food red
  fill (255,0,100);
  rect(food.x+5 , food.y + 5, scl - 10, scl - 10);

  //shine on the food
  fill (220,255,200, 175);
  rect(food.x+scl/4, food.y + 15 / 2, 2, 5);

  // food leaf
  fill (0,255,100);
  rect(food.x+scl/2, food.y - 5 / 2, 2, 10);
}

// Pick a location for food to appear

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(width / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
  // Check the food isn't appearing inside the tail

  for (var i = 0; i < s.tail.length; i++) {
    var pos = s.tail[i];
    var d = dist(food.x, food.y, pos.x, pos.y);
    if (d < 1) {
      pickLocation();
    }
  }
}

// CONTROLS function

function keyPressed() {
  if (keyCode === UP_ARROW){
      s.dir(0, -1);
  }else if (keyCode === DOWN_ARROW) {
      s.dir(0, 1);
  }else if (keyCode === RIGHT_ARROW) {
      s.dir (1, 0);
  }else if (keyCode === LEFT_ARROW) {
      s.dir (-1, 0);
  }
}

// SNAKE OBJECT

class Snake {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
  }

  dir (x,y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  eat (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  death() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
      }
    }
  }

  update(){
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }
    this.tail[this.total-1] = createVector(this.x, this.y);
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, width - scl);

  }
  show(){
    noStroke()
    fill(10, 255, 200, 200)
    for (var i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
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
    s.dir(1, 0);
  }
  if(dir == 'up'){
    s.dir(0, -1);
  }
  if(dir == 'left'){
    s.dir(-1, 0);
  }
  if(dir == 'down'){
    s.dir(0, 1);
  }
}

function toggleDarkMode() {
  isdarkMode = isdarkMode ? false : true;
  if (isdarkMode) {
    document.getElementById("darkbtn").style.filter = "invert(100%)";
    document.getElementById("body").style.backgroundColor = "#161616";

  } else {
    document.getElementById("darkbtn").style.filter = "invert(0%)";
    document.getElementById("body").style.backgroundColor = "#f1f2ec";

  }
}

