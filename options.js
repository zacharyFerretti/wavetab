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
	options[this.id] = event.target.checked;
	chrome.storage.sync.set(options);
}

function restoreOptions() {
	// Use default values
	chrome.storage.sync.get({
		showTime: true,
		showDate: true,
		use24HourTime: false
	}, function(items) {;
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

function updateDisplay() {
	
}