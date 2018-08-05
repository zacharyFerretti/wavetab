// options groups
var groupGeneral = document.getElementById("opt-general");
var groupGradients = document.getElementById("opt-gradients");
var groupGradientLib = document.getElementById("opt-gradient-library");
var groupSupport = document.getElementById("opt-support");

var selectRandomOption = document.getElementById("opt-grad-random");
var selectManualOption = document.getElementById("opt-grad-select");

// gradient options
var cgNameElem = document.getElementById("cgName");
var cgPackageElem = document.getElementById("cgPackage");
var cgIDElem = document.getElementById("cgID");

var gradLibContainer = document.getElementById("opt-gradient-library");

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

// save preference when a slider changes
function updatePrefs(event) {
	options[event.target.id] = event.target.checked;
	chrome.storage.sync.set(options);

	// refresh the date if needed
	var id = event.target.id;
	if (id == "showDayOfWeek" || id == "showDayOfMonth" || id == "showYear")
	{
		formatDateString();
		updateDate();
	}
}

// called when one of the gradien selection radios is pressed
function changeSelectionMode(event)
{
	// change it to either "random" or "select"
	options["selectMode"] = event.target.id.substring(9);
	chrome.storage.sync.set(options);
}

// called when the slider for gradient speed is dragged
function changeGradientSpeed(event)
{
	// update the label
	document.getElementById("opt-speed-label").innerText = this.value + " seconds";

	// save it to the options obj
	options["gradientSpeed"] = this.value;
	chrome.storage.sync.set(options);

	// update the speed
	container.style.animation = "Animation " + this.value + "s ease-in-out infinite";

}

function restoreOptions() {
	// Use default values
	chrome.storage.sync.get({
		showTime: true,
		showDate: true,
		use24HourTime: false,
		selectMode: "random",
		currentGradient: 0,
		gradientSpeed: 25,
		showDayOfWeek: true,
		showDayOfMonth: true,
		showYear: true
	}, function(items) {
		// set up switches according to stored options
		document.getElementById('showTime').checked = items.showTime;
		document.getElementById('showDate').checked = items.showDate;
		document.getElementById('use24HourTime').checked = items.use24HourTime;
		document.getElementById("showDayOfWeek").checked = items.showDayOfWeek;
		document.getElementById("showDayOfMonth").checked = items.showDayOfMonth;
		document.getElementById("showYear").checked = items.showYear;

		// set the slider position to the current value		
		document.getElementById("opt-speed").value = items.gradientSpeed;
		document.getElementById("opt-speed-label").innerText = items.gradientSpeed + " seconds";

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
		
		// if options say elements don't display, then hide them
		if (items.showTime) {
			timeElem.style.display = "block";
		}
		if (items.showDate) {
			dateElem.style.display = "block";
		}
	});
}

function resetOptions()
{
	var userIsSure = confirm("This will reset all of WaveTab's options to their defaults. Do you want to continue?");
	if (userIsSure)
	{
		// reset and clear options/storage
		options = {};
		chrome.storage.sync.clear();

		options.showTime = true;
		options.showDate = true;
		options.use24HourTime = false;
		options.selectMode = "random";
		options.currentGradient = 0;
		options.gradientSpeed = 25;
		options.showDayOfWeek = true,
		options.showDayOfMonth = true,
		options.showYear = true

		// set the storage
		chrome.storage.sync.set(options);

		// refresh the page so the options are applied
		document.location.reload();
	}
}

function resetDateOptions()
{
	var userIsSure = confirm("This will reset WaveTab's date format options to their defaults. Do you want to continue?");
	if (userIsSure)
	{
		// reset and clear options/storage
		options.showDate = true;
		options.showDayOfWeek = true,
		options.showDayOfMonth = true,
		options.showYear = true

		// set the storage
		chrome.storage.sync.set(options);

		// refresh the page so the options are applied
		document.location.reload();
	}
}

// called when storage changes
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