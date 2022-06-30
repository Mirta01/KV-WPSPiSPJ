<?php
include 'connection.php';

if(isset($_POST["sifra"]))
{
    $sQuery = "UPDATE vozilo SET vrsta='".$_POST['vrsta']."', tip='".$_POST["tip"]."',model='".$_POST['model']."', proizvodac='".$_POST['proizvodac']."',  oznaka='".$_POST['oznaka']."', godina=".$_POST['godina'].", snaga=".$_POST['snaga'].", salon=".$_POST['salon']." WHERE sifra=".$_POST["sifra"].";";
    $oRecord = $Connection->query($sQuery);
}

?>