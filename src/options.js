// options groups
var groupGeneral = document.getElementById("opt-general");
var groupGradients = document.getElementById("opt-gradients");
var groupSupport = document.getElementById("opt-support");

// elements
var timeOption = document.getElementById('showTime');
var dateOption = document.getElementById('showDate');
var use24Time = document.getElementById('use24HourTime');

// gradient options
var cgNameElem = document.getElementById("cgName");
var cgPackageElem = document.getElementById("cgPackage");
var cgIDElem = document.getElementById("cgID");

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
	groupSupport.style.display = "none";
}