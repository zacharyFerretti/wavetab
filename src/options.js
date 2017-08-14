// elements
var timeOption = document.getElementById('showTime');
var dateOption = document.getElementById('showDate');
var use24Time = document.getElementById('use24HourTime');

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
	chrome.storage.sync.set(options);
}

function restoreOptions() {
	// Use default values
	chrome.storage.sync.get({
		showTime: true,
		showDate: true,
		use24HourTime: false
	}, function(items) {
		// set up switches according to stored options
		timeOption.checked = items.showTime;
		dateOption.checked = items.showDate;
		use24Time.checked = items.use24HourTime;
		
		// if settings say elements don't display, then hide them
		if (!items.showTime) {
			timeElem.style.display = "none";
		}
		if (!items.showDate) {
			dateElem.style.display = "none";
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