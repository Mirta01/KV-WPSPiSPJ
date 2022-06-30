<?php
include 'connection.php';

$sQuery = "SELECT * FROM salon";
$oRecord = $Connection->query($sQuery);
$aSaloni = array();

while($oRow=$oRecord->fetch(PDO::FETCH_BOTH)){
    $id = $oRow['id'];
    $ime = $oRow['ime'];

    $oSalon = new Salon($id, $ime);
    array_push($aSaloni, $oSalon);
}

echo json_encode($aSaloni);
?>