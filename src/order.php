<?php
include 'connection.php';

$sQuery = "INSERT INTO narudba (sifravozilo, idsalon) VALUES (".$_POST['sifravozilo'].", ".$_POST['idsalon'].");";
$oRecord = $Connection->query($sQuery);
?>