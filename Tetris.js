let customFont = null;

//GameObject sizes
var cellWidth = 40;
var cellHeight = 40;

var playfieldColumns = 10;
var playfieldRows = 18;

var widthCanv = cellWidth * playfieldColumns + 8;
var heightCanv = cellHeight * playfieldRows + cellHeight + 8;

var tetrisPlayField = null;

//Game state
var gameOver = true;
var seconds = 0;
var minutes = 0;
var timeout;

function preload() {
  // try {
  //   customFont = loadFont('assets/kongtext.ttf');
  // } catch (error) {
  //   console.log(error);
  // }
}

//format total play time
function getPlayTimeAsText()
{
  return (minutes + "").padStart(2,'0') + ":" + (seconds + "").padStart(2,'0');
}

function setup() {
  if(customFont != null)
  {
    textFont(customFont);
  }

  frameRate(60);
  createCanvas(this.widthCanv,this.heightCanv);
  
  tetrisPlayField = new TetrisPlayField(playfieldRows, playfieldColumns, 0, 44);
  tetrisPlayField.initialize();
  strokePrimaryColor();
  strokeWeight(0);
}

function draw() {  
  background(224,225,152);
  if(!gameOver)
  {
    
    if(!gameOver)
    {
      drawField();
    }

    drawHeader();
  }
  else
  {
    strokeWeight(0);
    fillPrimaryColor();
    rect(0,52, widthCanv,heightCanv - cellHeight);
    
    clearTimeout(timeout);
    textSize(70);
    textAlign(CENTER, CENTER);
    fillSeconaryColor();
    textSize(38);
    strokeWeight(0);
    text("Press any key to start", widthCanv/2, heightCanv/2);
  }

  drawSquareFrame();
}

function drawHeader()
{
  strokeWeight(8);
  strokePrimaryColor();
  line(0, cellHeight, widthCanv, cellHeight);

  strokeWeight(1);
  textSize(cellHeight / 2);
  textAlign(LEFT, CENTER);
  text("SCORE", 20, (cellHeight*0.5));
  text( ("0").padStart(6,'0'), cellWidth*3, (cellHeight*0.5));  
  text("TIME", widthCanv- (8*(cellWidth/2)), (cellHeight*0.5));
  text(getPlayTimeAsText(), widthCanv-(4*(cellWidth/2)), (cellHeight*0.5));
}

function drawSquareFrame()
{
  strokeWeight(8);
  strokePrimaryColor();
  //x, y, x, y
  line(0, 0, widthCanv, 0);
  line(0, heightCanv, widthCanv, heightCanv);
  line(0, 0, 0, heightCanv);
  line(widthCanv, 0, widthCanv, heightCanv); 
}

function drawField()
{
  tetrisPlayField.draw();
}


function keyPressed(){
    //% left
    //& up
    //' right
    //( down
    if(key == '%')
    {
      
    }
    else if(key == '&')
    {
      gameOver = true;
    }
    else if(key == '\'')
    {

    }
    else if(key == '(')
    {

    }
    else
    { 
      if(gameOver)
      {
        seconds = 0;
        minutes = 0;
        frameRate(60);
        gameOver = false;
        timer();
      }
    }
}


function timer() {
  // timeout = setTimeout(add, 1000);
}

function strokePrimaryColor()
{
  stroke(53,82,31);
}

function fillPrimaryColor()
{
  fill(224,225,152)
}

function fillSeconaryColor()
{
  fill(53,82,31);
}