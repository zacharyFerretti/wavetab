// page elements
var textDisplay = document.getElementById("text-display");
var timeElem = document.getElementById("time");
var dateElem = document.getElementById("date");
var container = document.getElementById("container");
var optionsElem = document.getElementById("options");

// flags
var showingOptions = false;
var showWelcomeMsg = true;
var debug = false;

// colors
var randNum = 0;

// storage object for options
var options = {};

// a bunch of these are from https://webgradients.com/
var colorPairs = [
	["#aca9a9", "#171717"], // 0 grey, black
	["#ff6060", "#ff509a"], // 1 red, pink
	["#fda085", "#f6d365"], // 2 yellow, orange
	["#246644", "#7dd04f"], // 3 dark green, light green
	["#ff88a7", "#c5aeff", "#aee5ff"], // 4 pink, purple, blue
	["#a18cd1", "#fbc2eb"], // 5 purple
	["#ff9a9e", "#fecfef"], // 6 pink
	["#fbc2eb", "#a6c1ee"], // 7 blue, purple
	["#8db8ff", "#a1e1ff"], // 8 blue
	["#bbff6d", "#7de08b"], // 9 green
	["#43e97b", "#38f9d7"], // 10 green, teal
	["#5ee7df", "#b490ca"], // 11 blue, purple
	["#667eea", "#764ba2"], // 12 deep purple
	["#c995f0", "#dbcfff"], // 13 lighter purple
	["#6a11cb", "#2575fc"], // 14 deep blue
	["#fffa86", "#ffdd25"], // 15 yellow, orange
	["#d686ff", "#ffdd25"], // 16 purple, orange
	["#f33f58", "#ffdd25"], // 17 red, orange
	["#f33f58", "#8d25ff"], // 18 red-pink, purple
	["#3ff36e", "#8d25ff"], // 19 green, purple
	["#3ff3da", "#8d25ff"], // 20 light blue, purple
	["#7dded1", "#61e2a1"], // muted blue,  muted green
	["#d47dde", "#f5c070"], // muted purple,  muted orange
	["#84fab0", "#8fd3f4"], // light green,  light blue (012 tempting azure)
	["#8a81fe", "#51d7f4"], // light purple,  medium teal - brand color**
	["#A1FFCE", "#ffd1e8"], // 25 https://uigradients.com/#Limeade
	["#fceabb", "#f8b500"], // https://uigradients.com/#SunontheHorizon
	["#42275a", "#734b6d"], // https://uigradients.com/#Mauve
	["#e96443", "#904e95"], // https://uigradients.com/#GrapefruitSunset
	["#4CA1AF", "#C4E0E5"], // https://uigradients.com/#Decent
	["#eacda3", "#d6ae7b"], // 30 https://uigradients.com/#PaleWood
	["#B24592", "#F15F79"], // https://uigradients.com/#Blush
	["#c2e59c", "#64b3f4"], // https://uigradients.com/#GreenandBlue
	["#73c646", "#8DC26F"], // modified https://uigradients.com/#LittleLeaf
	["#673AB7", "#512DA8"], // https://uigradients.com/#DeepPurple
	["#ee9ca7", "#ffdde1"], // 35 https://uigradients.com/#Piglet
	["#83a4d4", "#b6fbff"], // https://uigradients.com/#Friday
	["#9D50BB", "#6E48AA"], // https://uigradients.com/#Amethyst
	["#FBD3E9", "#BB377D"], // https://uigradients.com/#Cherryblossoms
	["#B993D6", "#8CA6DB"], // https://uigradients.com/#DirtyFog
	["#00d2ff", "#3a7bd5"], // 40 https://uigradients.com/#Reef
	["#DE6262", "#FFB88C"], // https://uigradients.com/#ALostMemory
	["#f857a6", "#ff5858"], // https://uigradients.com/#DayTripper
	["#5f2c82", "#49a09d"], // https://uigradients.com/#CalmDarya
	["#24C6DC", "#514A9D"], // https://uigradients.com/#Mantle
	["#026471", "#71B280"], // 45 https://uigradients.com/#Moss
	["#ff9a9e", "#fad0c4"], // https://digitalsynopsis.com/design/beautiful-color-gradients-backgrounds/
	["#ffecd2", "#fcb69f"], //
	["#ff9a9e", "#fecfef"], //
	["#a1c4fd", "#c2e9fb"], //
	["#667eea", "#764ba2"], // 50
	["#89f7fe", "#66a6ff"], //
	["#48c6ef", "#6f86d6"], //
	["#a6f3fe", "#f6c4e2"], // modified
	["#a3bded", "#6991c7"], //
	["#ff758c", "#ff7eb3"], // 55
	["#96deda", "#50c9c3"], //
	["#B7F8DB", "#50A7C2"], //
	["#9c77e9", "#03c6ca"], //
	["#53b4cb", "#6c55b3"], //
	["#34f0e0", "#dcf002"] // 60
];

function updateTime() {
	chrome.storage.sync.get("use24HourTime", function(items) {
		if (!items.use24HourTime) {
			timeElem.textContent = moment().format("h:mm A");
		} else {
			timeElem.textContent = moment().format("HH:mm");
		}
	});
}

function updateDate() {
	dateElem.textContent = moment().format("dddd, MMMM Do, YYYY");
}

function pickColors(num) {
// step through the colors if debugging
	if (!debug) {
		// pick a random gradient from the array
		randNum = Math.floor(Math.random() * colorPairs.length);
	}
	else {
		// use the one that was passed in
		randNum = num;
	}

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
	container.style.animation = "Animation 25s ease-in-out infinite";
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
	pickColors(0);

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
