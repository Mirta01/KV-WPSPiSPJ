<?php
include 'connection.php';

$sQuery = "INSERT INTO salon (ime) VALUES ( '".$_POST['ime']."');";
$oRecord = $Connection->query($sQuery);
?>