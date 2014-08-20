<?php

if(!(isset($_POST['ip']) || !(isset($_POST['port'])))) {
	exit;
}

if(isset($_POST['query'])) {
	print_r(file_get_contents("http://mcapi.sweetcode.de/api/v2/?query&ip={$_POST['ip']}&port={$_POST['port']}"));
}

if(isset($_POST['info'])) {
	print_r(file_get_contents("http://mcapi.sweetcode.de/api/v2/?ip={$_POST['ip']}&port={$_POST['port']}"));
}

?>