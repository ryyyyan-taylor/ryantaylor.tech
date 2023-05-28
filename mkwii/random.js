const chars = [
	"Baby Mario",
	"Baby Luigi",
	"Baby Peach",
	"Baby Daisy",
	"Toad",
	"Toadette",
	"Wet Bones",
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
	"Wet Bowser",
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

const courselist = [
	"Luigi Circuit",
	"Moo Moo Meadows",
	"Mushroom Gorge",
	"Toad's Factory",
	"Mario Circuit",
	"Coconut Mall",
	"DK Summit",
	"Wario's Gold Mine",
	"Daisy Circuit",
	"Koopa Cape",
	"Maple Treeway",
	"Grumble Volcano",
	"Dry Dry Ruins",
	"Moonview Highway",
	"BC Wii",
	"GCN Peach Beach",
	"DS Yoshi Falls",
	"SNES Ghost Valley 2",
	"N64 Mario Raceway",
	"N64 Sherbet Land",
	"GBA Shy Guy Beach",
	"DS Delfino Square",
	"GCN Waluigi Stadium",
	"DS Desert Hills",
	"BC 3",
	"N64 DK's Jungle Parkway",
	"GCN Mario Circuit",
	"SNES Mario Circuit 3",
	"DS Peach Gardens",
	"GCN DK Mountain",
	"BC 64"
];

window.onload = function gettierlist() {
	// myFunction();
	betterLoad();
}

function betterLoad() {

	// GET PAGE ELEMENTS
	var tierlist = document.getElementById("vehs");
	var tierlist2 = tierlist.getElementsByTagName("li");
	var charlist = document.getElementById("chars");
	var charlist2 = charlist.getElementsByTagName("li")



	// RESET COLORS
	for (var i = 0; i < tierlist2.length; i++) {
		tierlist2[i].style = "background-color: none";
	}
	for (var i = 0; i < charlist2.length; i++) {
		charlist2[i].style = "background-color: none";
	}

	// GET CHARACTERS
	const shuffled = [...chars].sort(() => 0.5 - Math.random());
	var toPlay = shuffled.slice(0, 2);

	console.log(toPlay)

	// GET VEHICLES
	var vlist = []
	for (let i = 0; i < toPlay.length; i++) {
		var vehs = [];
		find = chars.indexOf(toPlay[i]);
		if (find < 8)
			vehs = smallk.concat(smallb);
		else if (find < 16)
			vehs = medk.concat(medb);
		else
			vehs = largek.concat(largeb);

		var index = Math.floor(Math.random() * vehs.length)
		var newveh = vehs[index];
		vlist.push(newveh);
	}

	// FILL BOXES ON PAGE
	document.getElementById("whichVeh").innerHTML = vlist[0];
	document.getElementById("w1").style = "display:inline"
	document.getElementById("whichVeh2").innerHTML = vlist[1];
	document.getElementById("w2").style = "display:inline"

	document.getElementById("whichChar").innerHTML = toPlay[0];
	document.getElementById("whichChar2").innerHTML = toPlay[1];

	// HIGHLIGHTS
	var tierlist = document.getElementById("vehs");
	var tierlist2 = tierlist.getElementsByTagName("li");
	var charlist = document.getElementById("chars");
	var charlist2 = charlist.getElementsByTagName("li")

	var charcount = 0

	for (var i = 0; i < tierlist2.length; i++) {
		if (tierlist2[i].innerHTML == vlist[0]) {
			tierlist2[i].style = "background-color: gold; font-size: 225%";
		}
		else if (tierlist2[i].innerHTML == vlist[1]) {
			tierlist2[i].style = "background-color: lightskyblue; font-size: 225%";
		}
		if (charcount < 2) {
			if (charlist2[i].innerHTML == toPlay[0]) {
				charlist2[i].style = "background-color: gold; font-size: 225%";
				charcount++;
			}
			else if (charlist2[i].innerHTML == toPlay[1]) {
				charlist2[i].style = "background-color: lightskyblue; font-size: 225%";
				charcount++;
			}
		}
	}

	courses();

}

function courses() {
	var random = courselist.sort(() => .5 - Math.random()).slice(0, 3);
	document.getElementById("courselist").innerHTML = random;
}

function win(buttonid) {
	console.log("win");

	if (buttonid == 1) {
		var winveh = document.getElementById("whichVeh");
		var lossveh = document.getElementById("whichVeh2");
		var winchar = document.getElementById("whichChar");
		var losschar = document.getElementById("whichChar2");
	} else {
		var winveh = document.getElementById("whichVeh2");
		var lossveh = document.getElementById("whichVeh");
		var winchar = document.getElementById("whichChar2");
		var losschar = document.getElementById("whichChar");
	}

	var tierlist = document.getElementById("vehs");
	var tierlist2 = tierlist.getElementsByTagName("li");
	var charlist = document.getElementById("chars");
	var charlist2 = charlist.getElementsByTagName("li")


	// VEHICLES
	var swap = true;
	var swapped = false;

	for (var i = 0; i < tierlist2.length; i++) {
		if (swap) {
			if (tierlist2[i].innerHTML == winveh.innerHTML) {
				swap = false;
				if (swapped) {
					tierlist2[i].innerHTML = lossveh.innerHTML;
					console.log("swapped winner vehicle to lower spot");
				}
			}
			else if (tierlist2[i].innerHTML == lossveh.innerHTML) {
				tierlist2[i].innerHTML = winveh.innerHTML;
				console.log("swapped loser out of top place");
				swapped = true;
			}
		}
	}

	var newtierlist = [];
	for (var i = 0; i < tierlist2.length; i++) {
		s = tierlist2[i].innerHTML;
		newtierlist.push(s);
	}
	document.getElementById('vehsout').value = newtierlist;

	// CHARACTERS
	var swap = true;
	var swapped = false;

	for (var i = 0; i < charlist2.length; i++) {
		if (swap) {
			if (charlist2[i].innerHTML == winchar.innerHTML) {
				swap = false;
				if (swapped) {
					charlist2[i].innerHTML = losschar.innerHTML;
					console.log("swapped winner character to lower spot");
				}
			}
			else if (charlist2[i].innerHTML == losschar.innerHTML) {
				charlist2[i].innerHTML = winchar.innerHTML;
				console.log("swapped loser character out of top place");
				swapped = true;
			}
		}
	}

	var newcharlist = [];
	for (var i = 0; i < charlist2.length; i++) {
		s = charlist2[i].innerHTML;
		newcharlist.push(s);
	}
	document.getElementById('charsout').value = newcharlist;

	var veh1 = document.getElementById("whichVeh");
	var veh2 = document.getElementById("whichVeh2");

	var char1 = document.getElementById("whichChar");
	var char2 = document.getElementById("whichChar2");


	for (var i = 0; i < tierlist2.length; i++) {
		if (tierlist2[i].innerHTML == veh1.innerHTML) {
			tierlist2[i].style.backgroundColor = "gold";
		}
		else if (tierlist2[i].innerHTML == veh2.innerHTML) {
			tierlist2[i].style.backgroundColor = "lightskyblue";
		}
	}
	for (var i = 0; i < charlist2.length; i++) {
		if (charlist2[i].innerHTML == char1.innerHTML) {
			charlist2[i].style.backgroundColor = "gold";
		}
		else if (charlist2[i].innerHTML == char2.innerHTML) {
			charlist2[i].style.backgroundColor = "lightskyblue"
		}
	}
	console.log(veh1, veh2, char1, char2)
}