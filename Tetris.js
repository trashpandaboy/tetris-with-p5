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
var milliseconds = 0;
var seconds = 0;
var timeout;
var millisecondsStep = 50;

var lastStepPerformedAtMillisec = -1;
var delayBetweenStepsMillisec = 300;

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
  var minutes = parseInt( seconds / 60);

  return (minutes + "").padStart(2,'0') + ":" + ( parseInt(seconds - (minutes * 60)) + "").padStart(2,'0');
}

function setup() {
  if(customFont != null)
  {
    textFont(customFont);
  }

  frameRate(60);
  createCanvas(this.widthCanv,this.heightCanv);
  
  tetrisPlayField = new TetrisPlayField(playfieldRows, playfieldColumns, 5, 44);
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
      performStep();
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
  strokeWeight(4);
  strokePrimaryColor();
  // line(0, cellHeight, widthCanv, cellHeight);

  strokeWeight(0);
  textSize(cellHeight / 2);
  textAlign(LEFT, CENTER);
  text("SCORE", 20, (cellHeight*0.5));
  text( ("0").padStart(6,'0'), cellWidth*3, (cellHeight*0.5));  
  text("TIME", widthCanv- (8*(cellWidth/2)), (cellHeight*0.5));
  text(getPlayTimeAsText(), widthCanv-(4*(cellWidth/2)), (cellHeight*0.5));
}

function drawSquareFrame()
{
  strokeWeight(4);
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

function performStep(){
  if(lastStepPerformedAtMillisec < 0 || milliseconds > lastStepPerformedAtMillisec + delayBetweenStepsMillisec)
  {
    lastStepPerformedAtMillisec = milliseconds;
    this.tetrisPlayField.step();
  }
}

function keyPressed(){
    //% left
    //& up
    //' right
    //( down
    if(key == '%')
    {
      this.tetrisPlayField.moveLeft();
    }
    else if(key == '&')
    {
      this.tetrisPlayField.rotate();
    }
    else if(key == '\'')
    {
      this.tetrisPlayField.moveRight();
    }
    else if(key == '(')
    {

    }
    else
    { 
      if(gameOver)
      {
        // frameRate(60);
        lastStepPerformedAtMillisec = 0;
        milliseconds = 0;
        seconds = 0;
        gameOver = false;
        timer();
      }
    }
}

function rotationPerformed()
{
  lastStepPerformedAtMillisec += delayBetweenStepsMillisec / 4;
}

function add() {
  milliseconds += millisecondsStep;
  if(milliseconds >= 1000)
  {
    seconds = milliseconds / 1000;
  }

  timer();
}

function timer() {
  timeout = setTimeout(add, millisecondsStep);
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