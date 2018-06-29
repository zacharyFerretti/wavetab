// options groups
var groupGeneral = document.getElementById("opt-general");
var groupGradients = document.getElementById("opt-gradients");
var groupGradientLib = document.getElementById("opt-gradient-library");
var groupSupport = document.getElementById("opt-support");

// elements
var timeOption = document.getElementById('showTime');
var dateOption = document.getElementById('showDate');
var use24Time = document.getElementById('use24HourTime');

// gradient options
var cgNameElem = document.getElementById("cgName");
var cgPackageElem = document.getElementById("cgPackage");
var cgIDElem = document.getElementById("cgID");

var gradLibContainer = document.getElementById("grad-lib-container");

// switch between showing the options panel and the time/date
function toggleOptions() {
	if (!showingOptions) {
		textDisplay.style.display = "none";
		optionsElem.style.display = "block";
		showingOptions = true;
	} else {
		textDisplay.style.display = "block";
		optionsElem.style.display = "none";
		showingOptions = false;
	}
}

// save preference in chrome sync data
function updatePrefs(event) {
	options[event.target.id] = event.target.checked;
	chrome.storage.local.set(options);
}

function restoreOptions() {
	// Use default values
	chrome.storage.local.get({
		showTime: true,
		showDate: true,
		use24HourTime: false
	}, function(items) {
		// set up switches according to stored options
		timeOption.checked = items.showTime;
		dateOption.checked = items.showDate;
		use24Time.checked = items.use24HourTime;
		
		// if settings say elements don't display, then hide them
		if (items.showTime) {
			timeElem.style.display = "block";
		}
		if (items.showDate) {
			dateElem.style.display = "block";
		}
	});
}

function updateDisplay(changes) {
	for (key in changes) {
		var storageChange = changes[key];

		// hide/display elements that changed
		switch(key) {
			case "showTime":
				if (storageChange.newValue == false) {
					timeElem.style.display = "none";
				} else {
					timeElem.style.display = "block";
				}
				break;
			case "showDate":
				if (storageChange.newValue == false) {
					dateElem.style.display = "none";
				} else {
					dateElem.style.display = "block";
				}
				break;
		}
	}
}

// switch between option categories
// called when a category tab is clicked
function switchTab(event)
{
	// hide all the options divs
	hideOptionsGroups();

	// will be something like "opt-tab-general", so cut off the beginning to get just "general"
	var group = event.target.attributes.id.nodeValue.substring(8);

	// show that group of options
	document.getElementById("opt-" + group).style.display = "block";
}

function hideOptionsGroups()
{
	groupGeneral.style.display = "none";
	groupGradients.style.display = "none";
	groupGradientLib.style.display = "none";
	groupSupport.style.display = "none";
}

function generateGradientLibrary()
{
	for (var i = 0; i < gradientData.default.length; i++)
	{
		// create a display element for the gradient
		var gradientElem = document.createElement("div");
		gradientElem.classList.add("grad-lib-box");

		// have it use the colors in the gradientObj's color array
		var colorString = makeColorString(gradientData.default[i].colors);
		gradientElem.style.background = "linear-gradient(45deg, " + colorString + ")";

		// give it a tooltip
		var tooltip = document.createElement("span");
		tooltip.classList.add("tooltip");
		tooltip.innerText = gradientData.default[i].id + ": " + gradientData.default[i].name +
					"\n\n[" + gradientData.default[i].package + "]";
		gradientElem.appendChild(tooltip);

		// add it to the DOM inside the container
		gradLibContainer.appendChild(gradientElem);
	}
}