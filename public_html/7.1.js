function processInputString() {
    var inputString = document.getElementById("inputString").value;
    var substring = document.getElementById("substring").value;
    var position = document.getElementById("position").value;

    var resultDiv = document.getElementById("processedResults");
    resultDiv.innerHTML = "";

    resultDiv.innerHTML += "Input STRING: " + inputString + "<br>";
    resultDiv.innerHTML += "# characters in string: " + inputString.length + "<br>";
    resultDiv.innerHTML += "String in uppercase: " + inputString.toUpperCase() + "<br>";
    resultDiv.innerHTML += "String in lowercase: " + inputString.toLowerCase() + "<br>";

    if (position < 0) {
        position = inputString.length + position;
    }
    
    resultDiv.innerHTML += "Character at position:  " + inputString.charAt(position) + "<br>";
    resultDiv.innerHTML += "Location of Sub-string:  " + inputString.indexOf(substring) + "<br>";
    resultDiv.innerHTML += "Replace substring 'www':  " + inputString.replace(/www/g, 'World Wide Web') + "<br>";
    resultDiv.innerHTML += "Last '11' chars in string:  " + inputString.slice(-11) + "<br>";
}