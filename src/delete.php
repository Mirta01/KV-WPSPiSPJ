<?php
include 'connection.php';

if (isset($_POST["sifra"]))
{
    $sQuery = "DELETE FROM vozilo WHERE vozilo.sifra = ". $_POST["sifra"];
    $oRecord = $Connection->query($sQuery);
    echo $sQuery;
}

?>