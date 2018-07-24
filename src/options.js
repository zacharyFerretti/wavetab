// options groups
var groupGeneral = document.getElementById("opt-general");
var groupGradients = document.getElementById("opt-gradients");
var groupGradientLib = document.getElementById("opt-gradient-library");
var groupSupport = document.getElementById("opt-support");

// elements
var timeOption = document.getElementById('showTime');
var dateOption = document.getElementById('showDate');
var use24Time = document.getElementById('use24HourTime');

var selectRandomOption = document.getElementById("opt-grad-random");
var selectManualOption = document.getElementById("opt-grad-select");

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

// called when one of the gradien selection radios is pressed
function changeSelectionMode(event)
{
	// change it to either "random" or "select"
	options["selectMode"] = event.target.id.substring(9);
	chrome.storage.local.set(options);
}

// called when the slider for gradient speed is dragged
function changeGradientSpeed(event)
{
	// update the label
	document.getElementById("opt-speed-label").innerText = this.value + " seconds";

	// save it to the options obj
	options["gradientSpeed"] = this.value;
	chrome.storage.local.set(options);
}

function restoreOptions() {
	// Use default values
	chrome.storage.local.get({
		showTime: true,
		showDate: true,
		use24HourTime: false,
		selectMode: "random",
		currentGradient: 0,
		gradientSpeed: 25
	}, function(items) {
		// set up switches according to stored options
		timeOption.checked = items.showTime;
		dateOption.checked = items.showDate;
		use24Time.checked = items.use24HourTime;

		if (items.selectMode == "random")
		{
			selectRandomOption.checked = true;
			selectManualOption.checked = false;
		}
		else
		{
			selectManualOption.checked = true;
			selectRandomOption.checked = false;
		}
		
		// setup gradient speed
		document.getElementById("opt-speed").value = items.gradientSpeed;
		document.getElementById("opt-speed-label").innerText = items.gradientSpeed + " seconds";
		
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
	var group = event.target.id.substring(8);

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