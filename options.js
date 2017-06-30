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
	// Use default value
	chrome.storage.sync.get({
		showTime: true,
		showDate: true,
		use24HourTime: false
	}, function(items) {;
		document.getElementById('showTime').checked = items.showTime;
		document.getElementById('showDate').checked = items.showDate;
		document.getElementById('use24HourTime').checked = items.use24HourTime;
	});
}