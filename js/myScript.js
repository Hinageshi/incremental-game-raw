var number 			= {"unit":0, "generator":0, "generatorception":0};
var baseCost 		= {"generator":10, "generatorception":100};
var currentCost 	= {"generator":10, "generatorception":100};
var unitPerSecond 	= 0;

function addUnit(){
	number.unit++;
	affAll();
}

function addGenerator(){
	if (number.unit >= currentCost.generator){
		number.generator++;
		number.unit -= currentCost.generator;
		currentCost.generator += baseCost.generator;
	}
	affAll();
}

function addGeneratorception(){
	if (number.unit >= currentCost.generatorception){
		number.generatorception++;
		number.unit -= currentCost.generatorception;
		currentCost.generatorception += baseCost.generatorception;
	}
	affAll();
}

setInterval(function(){
	number.generator += 1 * number.generatorception;
	unitPerSecond = 1 * number.generator;
	number.unit += 1 * number.generator;
	affAll();
}, 1000);

function affAll(){
	if(number.unit < currentCost.generator){
		document.getElementById('buttonGenerators').disabled = true;
	} else {
		document.getElementById('buttonGenerators').disabled = false;
	}
	if (number.unit < currentCost.generatorception){
		document.getElementById('buttonGeneratorceptions').disabled = true;
	} else {
		document.getElementById('buttonGeneratorceptions').disabled = false;
	}

	document.getElementById('txtUnitsPerSecond').innerHTML = unitPerSecond;

	document.getElementById('txtNbUnites').innerHTML = number.unit;
	document.getElementById('txtNbGenerators').innerHTML = number.generator;
	document.getElementById('txtNbGeneratorceptions').innerHTML = number.generatorception;

	document.getElementById('txtCostGenerators').innerHTML = currentCost.generator;
	document.getElementById('txtCostGeneratorceptions').innerHTML = currentCost.generatorception;
}

function save(name, thingToSave){
	var url = "http://127.0.0.1:8080/save?name=" + name + "&json=" + JSON.stringify(thingToSave);
	console.log(url);
	var xhr;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	} else {
		alert("Votre navigateur ne supporte pas les objects XMLHttpRequest.");
	}

	xhr.onreadystatechange = function(){

	};

	xhr.open("GET", url, true);
	xhr.send(null);
}

function saveAll(){
	save("json/number.json", number);
	save("json/baseCost.json", baseCost);
	save("json/currentCost.json", currentCost);
}

function load(nameFile){
	var url = "http://127.0.0.1:8080/load?file=" + nameFile;
	console.log(url);
	var xhr;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	} else {
		alert("Votre navigateur ne supporte pas les objects XMLHttpRequest.");
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			json = JSON.parse(xhr.responseText);
			switch(nameFile){
				case "json/number.json":
					console.log("json/number.json");
					number['unit'] = json['unit'];
					number['generator'] = json['generator'];
					number['generatorception'] = json['generatorception'];

					document.getElementById("txtNbUnites").innerHTML = json['unit'];
					document.getElementById("txtNbGenerators").innerHTML = json['generator'];
					document.getElementById("txtNbGeneratorceptions").innerHTML = json['generatorception'];
					break;

				case "json/baseCost.json":
					console.log("json/baseCost.json");
					baseCost['generator'] = json['generator'];
					baseCost['generatorception'] = json["generatorception"];
					break;

				case "json/currentCost.json":
					console.log("json/currentCost.json");
					currentCost['generator'] = json['generator'];
					currentCost['generatorception'] = json['generatorception'];

					document.getElementById("txtCostGenerators").innerHTML = json['generator'];
					document.getElementById("txtCostGeneratorceptions").innerHTML = json['generatorception'];
					break;
			}
		}
	};

	xhr.open("GET", url, true);
	xhr.send(null);
}

function loadAll(){
	load("json/number.json");
	load("json/baseCost.json");
	load("json/currentCost.json");
}

affAll();