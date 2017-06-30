// page elements
var timeElem = document.getElementById("time");
var container = document.getElementById("container");
var optionsElem = document.getElementById("options");

// flags
var showingOptions = false;

// a bunch of these are from https://webgradients.com/
var colorPairs = [
	["#acacac", "#171717"], // grey, black
	["#ff6060", "#ff50a8"], // red, pink
	["#fda085", "#f6d365"], // yellow, orange
	["#246644", "#7dd04f"], // dark green, light green
	["#ff88a7", "#c5aeff", "#aee5ff"], // pink, purple, blue
	["#a18cd1", "#fbc2eb"], // purple
	["#ff9a9e", "#fecfef"], // pink
	["#fbc2eb", "#a6c1ee"], // blue, purple
	["#a1c4fd", "#c2e9fb"], // blue
	["#d4fc79", "#96e6a1"], // green
	["#cfd9df", "#e2ebf0"], // silver
	["#43e97b", "#38f9d7"], // green, teal
	["#5ee7df", "#b490ca"], // blue, purple
	["#667eea", "#764ba2"], // deep purple
	["#cd9cf2", "#f6f3ff"], // lighter purple
	["#6a11cb", "#2575fc"] // deep blue
];

function updateTime() {
	var d = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
	timeElem.innerHTML = d;
}

function pickColors() {
	// pick a random gradient from the array
	var randNum = Math.floor(Math.random() * colorPairs.length);
	
	// build a string from the colors
	var colorString = "";
	// for each item (color) in the array...
	for (var color = 0; color < colorPairs[randNum].length; color++) {
		// add the color to the string
		colorString += colorPairs[randNum][color];
		
		// if this is NOT the last color...
		if (color != colorPairs[randNum].length - 1) {
			// add a comma before the next one
			colorString += ", "
		}
	}
	
	container.style.background = "linear-gradient(45deg, " + colorString + ")";
	container.style.backgroundSize = "600% 600%";
	container.style.animation = "Animation 8s ease-in-out infinite";
}

function toggleOptions() {
	// if the options aren't displaying, show them
	if (!showingOptions) {
		timeElem.style.display = "none";
		optionsElem.style.display = "block";
		showingOptions = true;
	} else {
		// show the time
		timeElem.style.display = "block";
		optionsElem.style.display = "none";
		showingOptions = false;
	}
}

var timer = setInterval(updateTime, 999);
updateTime();
pickColors();