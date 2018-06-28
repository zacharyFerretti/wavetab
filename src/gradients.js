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
    pickColors(0);
}