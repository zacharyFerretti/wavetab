// page elements
var textDisplay = document.getElementById("text-display");
var timeElem = document.getElementById("time");
var dateElem = document.getElementById("date");
var container = document.getElementById("container");
var optionsElem = document.getElementById("options");

// flags
var showingOptions = false;
var showWelcomeMsg = true;

// storage object for options
var options = {};

// a bunch of these are from https://webgradients.com/
var colorPairs = [
	["#acacac", "#171717"], // grey, black
	["#ff6060", "#ff5050"], // red, pink
	["#fda085", "#f6d365"], // yellow, orange
	["#246644", "#7dd04f"], // dark green, light green
	["#ff88a7", "#c5aeff", "#aee5ff"], // pink, purple, blue
	["#a18cd1", "#fbc2eb"], // purple
	["#ff9a9e", "#fecfef"], // pink
	["#fbc2eb", "#a6c1ee"], // blue, purple
	["#8db8ff", "#a1e1ff"], // blue
	["#bbff6d", "#7de08b"], // green [10]
	["#43e97b", "#38f9d7"], // green, teal
	["#5ee7df", "#b490ca"], // blue, purple
	["#667eea", "#764ba2"], // deep purple
	["#c995f0", "#dbcfff"], // lighter purple
	["#6a11cb", "#2575fc"], // deep blue
	["#fffa86", "#ffdd25"], // yellow, orange
	["#d686ff", "#ffdd25"], // purple, orange
	["#f33f58", "#ffdd25"], // red, orange
	["#f33f58", "#8d25ff"], // red-pink, purple
	["#3ff36e", "#8d25ff"], // green, purple [20]
	["#3ff3da", "#8d25ff"], // light blue, purple
	["#7dded1", "#61e2a1"], // muted blue,  muted green
	["#d47dde", "#f5c070"], // muted purple,  muted orange
	["#84fab0", "#8fd3f4"], // light green,  light blue (012 tempting azure)
	["#8a81fe", "#51d7f4"], // light purple,  medium teal - brand color**
	["#A1FFCE", "#ffd1e8"], // https://uigradients.com/#Limeade
	["#fceabb", "#f8b500"], // https://uigradients.com/#SunontheHorizon
	["#f85032", "#e73827"], // https://uigradients.com/#BloodRed
	["#000428", "#839300"], // https://uigradients.com/#Frost
	["#42275a", "#734b6d"], // https://uigradients.com/#Mauve [30]
	["#3c536a", "#FD746C"], // modified https://uigradients.com/#Dusk
	["#e96443", "#904e95"], // https://uigradients.com/#GrapefruitSunset
	["#BA5370", "#F4E2D8"], // https://uigradients.com/#PurpleWhite
	["#4CA1AF", "#C4E0E5"], // https://uigradients.com/#Decent
	["#eacda3", "#d6ae7b"], // https://uigradients.com/#PaleWood
	["#B24592", "#F15F79"], // https://uigradients.com/#Blush
	["#c2e59c", "#64b3f4"], // https://uigradients.com/#GreenandBlue
	["#73c646", "#8DC26F"], // modified https://uigradients.com/#LittleLeaf
	["#673AB7", "#512DA8"], // https://uigradients.com/#DeepPurple
	["#ee9ca7", "#ffdde1"], // https://uigradients.com/#Piglet [40]
	["#D1913C", "#FFD194"], // https://uigradients.com/#KokoCaramel
	["#ab9eb6", "#203714"], // modified https://uigradients.com/#TalkingToMiceElf
	["#83a4d4", "#b6fbff"], // https://uigradients.com/#Friday
	["#70e1f5", "#ffd194"], // https://uigradients.com/#Shore
	["#9D50BB", "#6E48AA"], // https://uigradients.com/#Amethyst
	["#FBD3E9", "#BB377D"], // https://uigradients.com/#Cherryblossoms
	["#B993D6", "#8CA6DB"], // https://uigradients.com/#DirtyFog
	["#00d2ff", "#3a7bd5"], // https://uigradients.com/#Reef
	["#DE6262", "#FFB88C"], // https://uigradients.com/#ALostMemory
	["#f857a6", "#ff5858"], // https://uigradients.com/#DayTripper [50]
	["#5f2c82", "#49a09d"], // https://uigradients.com/#CalmDarya
	["#DAE2F8", "#D6A4A4"], // https://uigradients.com/#Moonrise
	["#24C6DC", "#514A9D"], // https://uigradients.com/#Mantle
	["#134E5E", "#71B280"], // https://uigradients.com/#Moss
	["#614385", "#516395"] // https://uigradients.com/#Kashmir [55]
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

function hideWelcomeMessage() {
	document.getElementById("welcomeMsg").style.display = "none";
}

// when the page loads, do all this stuff
document.addEventListener("DOMContentLoaded", function() {
	// set up event listeners for checkboxes
	var checkboxes = document.querySelectorAll("input[type='checkbox']");
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].onchange = updatePrefs;
	}

	// setup event listeners for buttons
	document.getElementById("info-icon").onclick = toggleOptions;
	document.getElementById("close-icon").onclick = toggleOptions;
	document.getElementById("close-welcome").onclick = hideWelcomeMessage;

	// add event listener for when storage changes
	chrome.storage.onChanged.addListener(updateDisplay);

	restoreOptions();

	setInterval(updateTime, 999);
	setInterval(updateDate, 1500);

	updateTime();
	updateDate();
	pickColors();

	// show welcome message if necessary
	//chrome.storage.sync.clear(); // test line to clear storage & see msg again
	chrome.storage.sync.get({
		showWelcomeMsg: true
	}, function (items) {
		if (items.showWelcomeMsg) {
			document.getElementById("welcomeMsg").style.display = "block";
			chrome.storage.sync.set({showWelcomeMsg: false});
		}
	});
});
