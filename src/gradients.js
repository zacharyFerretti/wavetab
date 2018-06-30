var gradientData;

function readFile()
{
    // get the path of the json file(s)
    var path = chrome.extension.getURL("assets/data/default.json");

    // request and read the file
    var req = new XMLHttpRequest();
    req.addEventListener("load", reqOnLoad)
    req.open("GET", path);
    req.send();
}

function reqOnLoad()
{
    gradientData = JSON.parse(this.responseText);
    
    chrome.storage.local.get({
        currentGradient: 0,
        selectMode: "random"
    }, function(items) {
        if (items.selectMode == "random")
            pickColors();
        else
            pickColors(items.currentGradient);
    });

    generateGradientLibrary();
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

		var idString = makeIDString(gradientData.default[i].id)

		tooltip.innerText = idString + ": " + gradientData.default[i].name +
					"\n\n[" + gradientData.default[i].package + "]";
		gradientElem.appendChild(tooltip);

		// give it an action to carry out on click
		gradientElem.onclick = onGradientClick;

		// add it to the DOM inside the container
		gradLibContainer.appendChild(gradientElem);
	}
}

function onGradientClick(event)
{
	// get the ID of the gradient clicked
	var id = parseInt(event.target.innerText.substring(0, 3));
    pickColors(id);
    
    chrome.storage.local.set({currentGradient: id});
}

function makeIDString(id)
{
	var idString = "";

	// add leading zeroes if needed
	if (id < 100)
		idString += "0";

	if (id < 10)
		idString += "0";

	idString += id;

	return idString;
}