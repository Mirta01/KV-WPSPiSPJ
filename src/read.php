<?php
include 'connection.php';

if (isset($_GET["sifra"]))
{
    $sQuery = "SELECT * FROM vozilo WHERE sifra=".$_GET["sifra"];
    $oRecord = $Connection->query($sQuery);
    $aVozila = array();

    $oRow = $oRecord->fetch(PDO::FETCH_BOTH);

    $sifra = $oRow['sifra'];
    $vrsta = $oRow['vrsta'];
    $tip = $oRow['tip'];
    $model = $oRow['model'];
    $proizvodac = $oRow['proizvodac'];
    $oznaka = $oRow['oznaka'];
    $godina = $oRow['godina'];
    $snaga = $oRow['snaga'];
    $salon = $oRow['salon'];
    
    $oVozilo = new Vozilo($sifra, $vrsta, $tip, $model, $proizvodac, $oznaka, $godina, $snaga, $salon);
    array_push($aVozila, $oVozilo);
}
else
{
    $sQuery = "SELECT vozilo.*, salon.ime FROM vozilo LEFT JOIN salon ON vozilo.salon = salon.id";
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
}

function cmp($a, $b) {
    return strcmp($a->vrsta, $b->vrsta);
}

usort($aVozila, "cmp");

echo json_encode($aVozila);
?>