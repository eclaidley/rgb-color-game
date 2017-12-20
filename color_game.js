var numberOfSquares = 9;
var colors = generateRandomColors(numberOfSquares);

var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");

// generate random colors to fill squares
function generateRandomColors(num) {
	// make array 
	var colorArray = []
	// repeat num times
	for(var i = 0; i < num; i++) {
		// get random color and push into array
		colorArray.push(randomColor());
	}
	// return array at end
	return colorArray;
}

function randomColor() {
	// pick "red" value using random number from 0 to 255
	var randomRed = Math.floor(Math.random() * 256);
	// pick "green" value using random number from 0 to 255
	var randomGreen = Math.floor(Math.random() * 256);
	// pick "blue" value using random number from 0 to 255
	var randomBlue = Math.floor(Math.random() * 256)
	// return random color value in RGB format
	return "rgb(" + randomRed + ", " + randomGreen + ", " + randomBlue + ")";
}

var pickedColor = pickColor();
function pickColor(){
	// pick random number between 0 and last index in array
	var randomNumber = Math.floor(Math.random() * colors.length);
	// use that number to access color in array and return color
	return colors[randomNumber];
}

var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;

for(var i = 0; i < squares.length; i++) {
	// add initial colors to squares
	squares[i].style.backgroundColor = colors[i];
	// add click listeners to squares
	squares[i].addEventListener("click", function() {
		// grab color of clicked square
		var clickedColor = this.style.backgroundColor
		// compare color to pickedColor
		if(clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again?"
			changeSquareColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
		}
		else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try Again";
		}
	});
}

function changeSquareColors(color) {
	// loop through all squares
	for(var i = 0; i < squares.length; i++) {
		// change all square colors to match pickedColor
		squares[i].style.backgroundColor = color;
	}
}

var difficultyMode = document.querySelectorAll(".difficulty");
for(var i = 0; i < difficultyMode.length; i++) {
	difficultyMode[i].addEventListener("click", function() {
		// remove selected class from easy, medium and hard buttons
		// add selected class to only the button that was clicked
		difficultyMode[0].classList.remove("selected");
		difficultyMode[1].classList.remove("selected");
		difficultyMode[2].classList.remove("selected")
		this.classList.add("selected");
		// figure out how many squares to show based on difficulty
		if(this.textContent === "Easy"){
			numberOfSquares = 3;
		}
		else if(this.textContent === "Medium"){
			numberOfSquares = 6;
		}
		else {
			numberOfSquares = 9;
		}
		reset();
	});
}

// resets the game
function reset() {
	// generate all new colors
	colors = generateRandomColors(numberOfSquares);
	// pick new random color from array
	pickedColor = pickColor();
	// change color display to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	// change colors of squares on page
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		// if easy mode, only display top row of squares
		// if medium mode, hide bottom row of squares
		else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "teal";
}

resetButton.addEventListener("click", function() {
	reset();
});