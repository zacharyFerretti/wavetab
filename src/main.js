// page elements
var textDisplay = document.getElementById("text-display");
var timeElem = document.getElementById("time");
var dateElem = document.getElementById("date");
var container = document.getElementById("container");
var optionsElem = document.getElementById("options");

// flags
var showingOptions = false;
var debug = false;

// storage object for options
var options = {};

function updateTime() {
	chrome.storage.local.get("use24HourTime", function(items) {
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

function pickColors(num)
{
	var randNum = 0;

	// make sure it exists already
	if (gradientData != undefined)
	{
		if (num == undefined) {
			// pick a random gradient from the array
			randNum = Math.floor(Math.random() * gradientData.default.length);
		}
		else {
			// use the one that was passed in
			randNum = num;
		}

		var gradientObj = gradientData.default[randNum];
		var colorString = makeColorString(gradientObj.colors);

		// get gradient speed and set it
		chrome.storage.local.get({
			gradientSpeed: 25
		}, function(items) {
			container.style.background = "linear-gradient(45deg, " + colorString + ")";
			container.style.backgroundSize = "200% 200%";
			container.style.animation = "Animation " + items.gradientSpeed + "s ease-in-out infinite";
		});

		// set the options menu info
		cgNameElem.innerText = gradientObj.name;
		cgPackageElem.innerText = gradientObj.package;
		cgIDElem.innerText = gradientObj.id;

		chrome.storage.local.set({currentGradient: gradientObj.id});
	}
}

function makeColorString(colorArray)
{
	var colorString = "";

	// for each item (color) in the array...
	for (var color = 0; color < colorArray.length; color++) {
		// add the color to the string
		colorString += colorArray[color];

		// if this is NOT the last color...
		if (color != colorArray.length - 1) {
			// add a comma before the next one
			colorString += ", ";
		}
	}

	return colorString;
}

function hideMessage() {
	document.getElementById("welcomeMsg").style.display = "none";
	document.getElementById("v2Msg").style.display = "none";
}

// when the page loads, do all this stuff
document.addEventListener("DOMContentLoaded", function() {
	// set up event listeners for checkboxes
	var checkboxes = document.querySelectorAll("input[type='checkbox']");
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].onchange = updatePrefs;
	}

	// setup event listeners for radio buttons
	var radioBtns = document.querySelectorAll("input[type='radio']");
	for (var i = 0; i < radioBtns.length; i++) {
		// add the right event based on the type of radio
		if (radioBtns[i].classList.contains("sidebar-radio"))
		{
			radioBtns[i].onchange = switchTab;

			// set first radio button as checked
			if (i == 0)
				radioBtns[i].checked = true;
			else
				radioBtns[i].checked = false;
		}
		else if (radioBtns[i].classList.contains("grad-selection-radio")){
			radioBtns[i].onclick = changeSelectionMode;
		}
	}

	// setup event listeners for buttons
	document.getElementById("info-icon").onclick = toggleOptions;
	document.getElementById("close-icon").onclick = toggleOptions;
	document.getElementById("close-msg1").onclick = hideMessage;
	document.getElementById("close-msg2").onclick = hideMessage;
	document.getElementById("opt-reset").onclick = resetOptions;

	// setup event listener for range slider
	document.getElementById("opt-speed").oninput = changeGradientSpeed;

	// add event listener for when storage changes
	chrome.storage.onChanged.addListener(updateDisplay);

	restoreOptions();

	setInterval(updateTime, 999);
	setInterval(updateDate, 1500);

	updateTime();
	updateDate();

	readFile();

	// show welcome message if necessary
	//chrome.storage.local.clear(); // test line to clear storage & see msg again
	chrome.storage.local.get({
		showWelcomeMsg: true,
		showV2Msg: true
	}, function (items) {
		// if the user is new to the extension
		if (items.showWelcomeMsg) {
			// show the welcome message
			document.getElementById("welcomeMsg").style.display = "block";

			// don't show the welcome or v2 message again
			chrome.storage.local.set({showWelcomeMsg: false, showV2Msg: false});
		}
		// if the user updated to v2
		else if (items.showV2Msg)
		{
			// show the v2 message
			document.getElementById("v2Msg").style.display = "block";

			// don't show the v2 message again
			chrome.storage.local.set({showV2Msg: false});
		}
	});
});

// quick debug to show a message again
function enableMessage(msgName)
{
	options["show" + msgName] = true;

	chrome.storage.local.set(options);
}
