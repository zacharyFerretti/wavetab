var data;

function readFile()
{
    //var file = FileUtils.File("../data/default.json");
    /*
    console.log(path);

    var file = null;

    var reader = new FileReader();
    reader.readAsText(file);*/

    var path = chrome.extension.getURL("assets/data/default.json");

    var req = new XMLHttpRequest();
    req.addEventListener("load", reqOnLoad)
    req.open("GET", path);
    req.send();
}

function saveData(e)
{
    lines = e.target.result;
    data = JSON.parse(lines);
    console.log(data);
}

function reqOnLoad()
{
    data = JSON.parse(this.responseText);
    console.log(data);
}