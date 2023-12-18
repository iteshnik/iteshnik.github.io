<?php
	if ($_POST) {
		if ($_POST['capcha'] == "1234"){
			echo '{"res":1, "date":"'.date('d/m/Y H:i').'"}';
			}else {echo '{"res":0}';}
	}else{
		echo "Не передан параметр!";
	}


/*		$file=fopen('/ajax/msg.dat','w');
		
		$name = $_POST['name'];
		$text = $_POST['text'];
		$msg =  $name + "/n" + $text;
		
		fwrite($file, $msg);

		fclose($file);*/
?>