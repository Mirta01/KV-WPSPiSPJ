<?php
include "classes.php";
include "headers.php";
cors();

$con = new Configuration("127.0.0.1", "autokuca", "root", "");
try
{
    $Connection = new PDO("mysql:host=$con->host;dbname=$con->dbname", $con->username, $con->password);
    //echo "Connected to " . $con->dbname . " at " . $con->host; 
}
catch(PDOException $e)
{
    die("Did not connect to ". $con->dbname." : ".$e->getMessage());
}

?>