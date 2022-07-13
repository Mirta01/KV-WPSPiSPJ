<?php
include 'connection.php';

if (isset($_POST["sifra"]))
{
    try {
    $sQuery = "DELETE FROM vozilo WHERE vozilo.sifra = ". $_POST["sifra"];
    $oRecord = $Connection->query($sQuery);
    echo $sQuery;
    }
    catch (PDOException $e)
    {
        http_response_code(400);
    }
}

?>