<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>brrrr</title>
	<script src="random.js"></script>
	<link rel="stylesheet" href="style.css">
</head>
<body>

	<input type="radio" id="1p" name="numplayers" value="p1">
	<label for="1p">1 Player</label><br>
	<input type="radio" id="2p" name="numplayers" value="p2" checked="checked">
	<label for="2p">2 Players</label><br>

	<label for="size">Char sizes:</label>
	<select id="size" name="size">
		<option value="allsizes">All</option>
		<option value="small">Small</option>
		<option value="medium">Medium</option>
		<option value="large">Large</option>
	</select>

	<label for="drift">Drift Type:</label>
	<select id="drift" name="drift">
		<option value="alldrift">All</option>
		<option value="inside">Inside</option>
		<option value="outside">Outside</option>
	</select>

	<label for="vehicle">Vehicle Type:</label>
	<select id="vehicle" name="vehicle">
		<option value="allvehicles">All</option>
		<option value="karts">Karts</option>
		<option value="bikes">Bikes</option>
	</select>

	<button type="button" onclick="myFunction()">Go</button>

	<form method="post">
        <input type="submit" name="button1"
                class="button" value="Sync"/>
		<input type="hidden" name="list" id='list' value=""/>
    </form>

	<br>
	<div id ="output">
		<div id ="p1" class="playerbox">
			<p id ="whichChar"></p>
			<p id ="whichVeh"></p>
			<button class="winner" id="w1" onclick="win()">Winner</button>
		</div>
		<div id ="p2" class="playerbox">
			<p id ="whichChar2"></p>
			<p id ="whichVeh2"></p>
			<button class="winner" id="w2" onclick="win2()">Winner</button>
		</div>
	</div>

	<div id="tierlist">
		<ol id="tiers">
			<?php
				// $file = fopen("test.txt", "r");
				// $i=0;
				// while(!feof($file)){
				// 	$members[]= fgets($file);
				// }
				// fclose($file);
				// $arrlength =count($members);
				// for($i=0;$i<($arrlength);$i++){
				// 	$members[$i] = rtrim($members[$i]);
				// 	echo "<li>".$members[$i]."</li>" ;
				// }

				$file = file_get_contents("list.txt");
				$arrfields = explode(',', $file);

				foreach($arrfields as $field){
					echo "<li>".$field."</li>" ;
				}
			
			if(array_key_exists('button1', $_POST)) {
				button1();
			}
			function button1() {
				
				if($_POST['list']==""){
					exit;
				}
				$myList = $_POST['list'];

				file_put_contents("list.txt", print_r($myList, true));
				
				sleep(1);
				Header('Location: '.$_SERVER['PHP_SELF']);
				Exit();
			}
			
			?>
		</ol>
	</div>
	<div id="output"></div>
</body>
</html>