<?php
include 'connection.php';

if (isset($_POST["sifravozilo"]))
{
    $sQuery = "DELETE FROM narudba WHERE narudba.sifravozilo = ". $_POST["sifravozilo"];
    $oRecord = $Connection->query($sQuery);
    echo $sQuery;
}

?>