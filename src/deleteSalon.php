<?php
include 'connection.php';

if (isset($_POST["id"]))
{
    try {
        $sQuery = "DELETE FROM salon WHERE salon.id = ". $_POST["id"];
        $oRecord = $Connection->query($sQuery);
    }
    catch (PDOException $e)
    {
        http_response_code(400);
    }
}

?>