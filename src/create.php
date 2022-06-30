<?php
include 'connection.php';

$sQuery = "INSERT INTO vozilo (vrsta, tip, model, proizvodac, oznaka,godina,snaga, salon) VALUES ( '".$_POST['vrsta']."', '".$_POST["tip"]."', '".$_POST['model']."', '".$_POST['proizvodac']."',  '".$_POST['oznaka']."', ".$_POST['godina'].", ".$_POST['snaga'].", ".$_POST['salon'].");";
$oRecord = $Connection->query($sQuery);
?>