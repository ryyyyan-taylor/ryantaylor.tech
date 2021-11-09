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

	var va = [toplay[0], vlist[0]];
	var vb = [toplay[1], vlist[1]];
	console.log(va);
	console.log(vb);
	document.getElementById("whichChar").innerHTML = va;
	document.getElementById("whichVeh").innerHTML = vb;
	console.log("------");
	
}






