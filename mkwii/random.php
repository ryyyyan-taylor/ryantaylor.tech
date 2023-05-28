<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>brrrr</title>
	<script src="random.js"></script>
	<link rel="stylesheet" href="style.css">
	<link rel="shortcut icon" href="../assets/favicon.ico" type="image/x-icon">
</head>
<body class="theme-orange">

	<button type="button" id="go" roll="button" class="btn btn-theme-outline" onclick="betterLoad()">ReRoll</button>

	
	<br>
	<div id ="output">
		<p id ="whichChar"></p>
		<p id ="whichVeh"></p>
		<p id ="whichChar2"></p>
		<p id ="whichVeh2"></p>
		<button roll="button" class="winner btn btn-theme-outline" id="w1" onclick="win(1)">Winner</button>
		<button roll="button" class="winner btn btn-theme-outline" id="w2" onclick="win(2)">Winner</button>
	</div>

	<div id="lists">
		<ol id="vehs">
			<?php
				$file = file_get_contents("vehs.txt");
				$arrfields = explode(',', $file);
				foreach($arrfields as $field){
					echo "<li>".$field."</li>" ;
				}
			?>
		</ol>
		<ol id="chars">
			<?php
				$file = file_get_contents("chars.txt");
				$arrfields = explode(',', $file);
				foreach($arrfields as $field){
					echo "<li>".$field."</li>" ;
				}
			?>
		</ol>
	</div>
	<div id="output"></div>
	<form method="post">
		<input type="submit" name="button1" roll="button" class="btn btn-theme-outline" id="syncbtn" value="Sync"/>
		<input type="hidden" name="vehsout" id="vehsout" value=""/>
		<input type="hidden" name="charsout" id="charsout" value=""/>
	</form>
	
	<!-- <form class="form-inline" style="display: none">
		<input type="radio" id="1p" name="numplayers" value="p1">
		<label for="1p">1 Player</label>
		<input type="radio" id="2p" name="numplayers" value="p2" checked="checked">
		<label for="2p">2 Players</label>
	</form> -->

	<!-- <form class="specs" style="display: none">

		<div id="choice">
			<label for="size">Char sizes:</label>
			<select id="size" name="size">
				<option value="allsizes">All</option>
				<option value="small">Small</option>
				<option value="medium">Medium</option>
				<option value="large">Large</option>
			</select>
		</div>
		
		<div id="choice">
			<label for="drift">Drift Type:</label>
			<select id="drift" name="drift">
				<option value="alldrift">All</option>
				<option value="inside">Inside</option>
				<option value="outside">Outside</option>
			</select>
		</div>
		
		<div id="choice">
			<label for="vehicle">Vehicle Type:</label>
			<select id="vehicle" name="vehicle">
				<option value="allvehicles">All</option>
				<option value="karts">Karts</option>
				<option value="bikes">Bikes</option>
			</select>
		</div>
	</form> -->


	<p id="courselist"></p>
	<button type="button" id="go" roll="button" class="btn btn-theme-outline" onclick="courses()">ReRoll</button>


	<?php
		if(array_key_exists('button1', $_POST)) {
			
			$vehList = $_POST["vehsout"] ?? "";
			$charList = $_POST["charsout"] ?? "";
	
			if (empty($vehList) || empty($charList)) exit;
	
			file_put_contents("vehs.txt", print_r($vehList, true));
			file_put_contents("chars.txt", print_r($charList, true));
			
			echo("<meta http-equiv='refresh' content='1'>");
		}
	?>

</body>
</html>