<?php
	if ($_GET) {
		if ($_GET['phone'] == "1234567"){
			echo '{"mess":"спасибо телефон отпрален", "valid":"1"}';
			}else {echo '{"mess":"вводить нужно 1234567","valid":"0"}';}
	}
?>