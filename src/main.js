// page elements
var textDisplay = document.getElementById("text-display");
var timeElem = document.getElementById("time");
var dateElem = document.getElementById("date");
var container = document.getElementById("container");
var optionsElem = document.getElementById("options");

// flags
var showingOptions = false;

// storage object for options
var options = {};

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
	["#8db8ff", "#a1e1ff"], // blue
	["#bbff6d", "#7de08b"], // green
	["#43e97b", "#38f9d7"], // green, teal
	["#5ee7df", "#b490ca"], // blue, purple
	["#667eea", "#764ba2"], // deep purple
	["#c995f0", "#dbcfff"], // lighter purple
	["#6a11cb", "#2575fc"], // deep blue
	["#fffa86", "#ffdd25"], // yellow, orange
	["#d686ff", "#ffdd25"], // purple, orange
	["#f33f58", "#ffdd25"], // red, orange
	["#f33f58", "#8d25ff"], // red-pink, purple
	["#3ff36e", "#8d25ff"], // green, purple
	["#3ff3da", "#8d25ff"], // light blue, purple
	["#7dded1", "#8d25ff"], // muted blue,  muted green
	["#d47dde", "#f5c070"] // muted purple,  muted orange
];

function updateTime() {
	chrome.storage.sync.get("use24HourTime", function(items) {
		if (!items.use24HourTime) {
			timeElem.innerHTML = moment().format("h:mm A");
		} else {
			timeElem.innerHTML = moment().format("HH:mm");
		}
	});
}

function updateDate() {
	dateElem.innerHTML = moment().format("dddd, MMMM Do, YYYY");
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
			colorString += ", ";
		}
	}
	
	container.style.background = "linear-gradient(45deg, " + colorString + ")";
	container.style.backgroundSize = "600% 600%";
	container.style.animation = "Animation 8s ease-in-out infinite";
}

// when the page loads, do all this stuff
document.addEventListener("DOMContentLoaded", function() {
	// set up event listeners for checkboxes
	var checkboxes = document.querySelectorAll("input[type='checkbox']");
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].onchange = updatePrefs;
	}

	// setup event listeners for buttons
	var buttons = document.querySelectorAll("button");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = toggleOptions;
	}
	
	// add event listener for when storage changes
	chrome.storage.onChanged.addListener(updateDisplay);

	restoreOptions();
	
	setInterval(updateTime, 999);
	setInterval(updateDate, 1500);

	updateTime();
	updateDate();
	pickColors();
});