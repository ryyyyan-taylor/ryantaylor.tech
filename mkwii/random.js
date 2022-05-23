const chars = [
"Baby Mario",
"Baby Luigi",
"Baby Peach",
"Baby Daisy",
"Toad",
"Toadette",
"Koopa Troopa",
"Dry Bones",
"Mario",
"Luigi",
"Peach",
"Daisy",
"Yoshi",
"Birdo",
"Diddy Kong",
"Bowser Jr.",
"Wario",
"Waluigi",
"Donkey Kong",
"Bowser",
"King Boo",
"Rosalina",
"Funky Kong",
"Dry Bowser"
];

const smallk = [
"Standard Kart S",
"Baby Booster",
"Mini Beast",
"Cheep Charger",
"Tiny Titan",
"Blue Falcon"
];

const smallb = [
"Standard Bike S",
"Bullet Bike",
"Bit Bike",
"Quacker",
"Magikruiser",
"Jet Bubble"
];


const medk = [
"Standard Kart M",
"Classic Dragster",
"Wild Wing",
"Super Blooper",
"Daytripper",
"Sprinter"
];

const medb = [
"Standard Bike M",
"Mach Bike",
"Sugarscoot",
"Zip Zip",
"Sneakster",
"Dolphin Dasher"
];

const largek = [
"Standard Kart L",
"Offroader",
"Flame Flyer",
"Piranha Prowler",
"Jetsetter",
"Honeycoupe"
];

const largeb = [
"Standard Bike L",
"Flame Runner",
"Wario Bike",
"Shooting Star",
"Spear",
"Phantom"
];

const insideb = [
"Bullet Bike",
"Quacker",
"Magikruiser",
"Jet Bubble",

"Mach Bike",
"Sneakster",
"Dolphin Dasher",

"Flame Runner",
"Spear"
];


window.onload = function gettierlist(){
	readTextFile("/Users/danlaskarzewski/Downloads/user.json", function(text){
		var data = JSON.parse(text);
		console.log(data);
	});
}

function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

function myFunction(){
	var size = document.getElementsByName("size")[0].value;
	var drift = document.getElementsByName("drift")[0].value;
	var vehicle = document.getElementsByName("vehicle")[0].value;
	var ch;
	var chsize;
	var veh;
	var plist = []; 
	var numP = 1;
	var vlist = [];


	var tierlist = document.getElementById("tierlist");
	var tierlist2 = tierlist.getElementsByTagName("li");

	for (var i = 0; i < tierlist2.length; i++) {
		tierlist2[i].style = "background-color: none";
	}


	var p = document.querySelector('input[name="numplayers"]:checked').value;
	if(p == "p2")
		numP = 2;

	for(let i = 0; i < numP; i++){
		if(size == "allsizes"){
			ch = Math.floor(Math.random() * chars.length);
		}
		if(size == "small"){
			ch = Math.floor(Math.random() * 8);
		}
		if(size == "medium"){
			ch = Math.floor(Math.random() * 8) + 8;
		}
		if(size == "large"){
			ch = Math.floor(Math.random() * 8) + 16;
		}

		if(i == 1)
			if(ch == plist[0])
				if(ch%8==0)
					ch++;
				else ch--;
		plist.push(ch)
	}

	var toplay = [];
	for(let i = 0; i<plist.length; i++){
		toplay.push(chars[plist[i]]);
	}


	document.getElementById("whichChar").innerHTML = toplay[0];
	if (numP == 2)
		document.getElementById("whichChar2").innerHTML = toplay[1];


	for(let i = 0; i<plist.length; i++){

		if(plist[i]<8)
			chsize = "small";
		else if (plist[i]<16)
			chsize = "med";
		else 
			chsize = "large";



		if (chsize == "small")
			veh = [...smallk, ...smallb];
		if (chsize == "med")
			veh = [...medk, ...medb];
		if (chsize == "large")
			veh = [...largek, ...largeb];


		if(drift == "inside"){
			veh = veh.filter(x => insideb.includes(x));
		}
		if(drift == "outside"){
			veh = veh.filter(x => !insideb.includes(x));
		}

		if(vehicle == "karts"){
			if (chsize == "small")
				veh = veh.filter(x => smallk.includes(x));
			if (chsize == "med")
				veh = veh.filter(x => medk.includes(x));
			if (chsize == "large")
				veh = veh.filter(x => largek.includes(x));
			
		}
		if (vehicle == "bikes"){
			if (chsize == "small")
				veh = veh.filter(x => smallb.includes(x));
			if (chsize == "med")
				veh = veh.filter(x => medb.includes(x));
			if (chsize == "large")
				veh = veh.filter(x => largeb.includes(x));
		}

		var v = Math.floor(Math.random() * veh.length);
		vlist.push(veh[v]);


		for(s in veh){
			console.log(veh[s]);
		}
		console.log("-");

	}

	document.getElementById("whichVeh").innerHTML = vlist[0];
	document.getElementById("w1").style = "display:inline"
	if (numP == 2){
		document.getElementById("whichVeh2").innerHTML = vlist[1];
		document.getElementById("w2").style = "display:inline"
	}
	


	console.log("------");


	var tierlist = document.getElementById("tierlist");
	var tierlist2 = tierlist.getElementsByTagName("li");


	for (var i = 0; i < tierlist2.length; i++) {
		if(tierlist2[i].innerHTML == vlist[0] || tierlist2[i].innerHTML == vlist[1]) {
			console.log("changing color")
			// console.log(tierlist2[i].innerHTML)
			tierlist2[i].style = "background-color: yellow";
		}
	}
}

function win(){
	console.log("win2");
	var tierlist = document.getElementById("tierlist");
	var tierlist2 = tierlist.getElementsByTagName("li");
	var winveh = document.getElementById("whichVeh");
	var lossveh = document.getElementById("whichVeh2");

	console.log("vars");
	var swap = true;
	var swapped = false;

	for (var i = 0; i < tierlist2.length; i++) {
		if (swap){
			if(tierlist2[i].innerHTML == winveh.innerHTML){
				swap = false;
				if (swapped){
					tierlist2[i].innerHTML = lossveh.innerHTML;
					console.log("swapped winner vehicle to lower spot");
				}

			}
			else if(tierlist2[i].innerHTML == lossveh.innerHTML){
				tierlist2[i].innerHTML = winveh.innerHTML;
				console.log("swapped loser out of top place");
				swapped = true;
			}
		}
	}
	console.log("loop");

	var newtierlist = [];
	for (var i = 0; i < tierlist2.length; i++) {
		s = tierlist2[i].innerHTML;
		newtierlist.push(s);
	}

	document.getElementById("list").value = newtierlist

}

function win2(){
	console.log("win2");
	var tierlist = document.getElementById("tierlist");
	var tierlist2 = tierlist.getElementsByTagName("li");
	var winveh = document.getElementById("whichVeh2");
	var lossveh = document.getElementById("whichVeh");
	
	console.log("vars");
	var swap = true;
	var swapped = false;

	for (var i = 0; i < tierlist2.length; i++) {
		if (swap == true){
			if(tierlist2[i].innerHTML == winveh.innerHTML){
				swap = false;
				if (swapped){
					tierlist2[i].innerHTML = lossveh.innerHTML;
					console.log("swapped winner vehicle to lower spot");
				}

			}
			else if(tierlist2[i].innerHTML == lossveh.innerHTML){
				tierlist2[i].innerHTML = winveh.innerHTML;
				console.log("swapped loser out of top place");
				swapped = true;
			}
		}
	}
	console.log("loop");

	var newtierlist = [];
	for (var i = 0; i < tierlist2.length; i++) {
		s = tierlist2[i].innerHTML;
		newtierlist.push(s);
	}

	document.getElementById("list").value = newtierlist
}


function convertToJSON(tl) {
	console.log(tl);
	var jsonObject = {
	"tierlist": tl
	}

	document.getElementById('output').value = JSON.stringify(jsonObject);
}

function saveToFile(tl) {
	convertToJSON(tl);
	var jsonObjectAsString = document.getElementById('output').value;

	var blob = new Blob([jsonObjectAsString], {
	//type: 'application/json'
	type: 'octet/stream'
	});
	console.log(blob);

	var anchor = document.createElement('a');
	anchor.download = "user.json";
	anchor.href = window.URL.createObjectURL(blob);
	anchor.innerHTML = " ";
	anchor.click();

	console.log(anchor);

	document.getElementById('output').append(anchor);
}