<?php
include 'connection.php';

$sQuery = "INSERT INTO vozilo (vrsta, tip, model, proizvodac, oznaka,godina,snaga, salon, mjenjac, motor, cijena) VALUES ( '".$_POST['vrsta']."', '".$_POST["tip"]."', '".$_POST['model']."', '".$_POST['proizvodac']."',  '".$_POST['oznaka']."', ".$_POST['godina'].", ".$_POST['snaga'].", ".$_POST['salon'].", '".$_POST['mjenjac']."','".$_POST['motor']."', ".$_POST['cijena'].");";
$oRecord = $Connection->query($sQuery);
?>