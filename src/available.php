<?php
include 'connection.php';

$sQuery = "SELECT vozilo.*, salon.ime FROM vozilo, salon WHERE vozilo.sifra NOT IN (SELECT sifravozilo FROM narudba) AND vozilo.salon = salon.id";
$oRecord = $Connection->query($sQuery);

$aVozila = array();
    
while($oRow=$oRecord->fetch(PDO::FETCH_BOTH)){
    $sifra = $oRow['sifra'];
    $vrsta = $oRow['vrsta'];
    $tip = $oRow['tip'];
    $model = $oRow['model'];
    $proizvodac = $oRow['proizvodac'];
    $oznaka = $oRow['oznaka'];
    $godina = $oRow['godina'];
    $snaga = $oRow['snaga'];
    $salon = $oRow['ime'];

    $oVozilo = new Vozilo($sifra, $vrsta, $tip, $model, $proizvodac, $oznaka, $godina, $snaga, $salon);
    array_push($aVozila, $oVozilo);
}

function cmp($a, $b) {
    return strcmp($a->vrsta, $b->vrsta);
}

usort($aVozila, "cmp");

echo json_encode($aVozila);
?>