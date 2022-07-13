<?php
class Configuration{
    public $host = "";
    public $dbname = "";
    public $username = "";
    public $password = "";

    public function __construct($host, $dbname, $username, $password) 
    {
        $this->host = $host;
        $this->dbname = $dbname;
        $this->username = $username;
        $this->password = $password;
    }
}
class Vozilo{
    public $sifra = 0;
    public $vrsta = "";
    public $tip = "";
    public $model = "";
    public $proizvodac = "";
    public $oznaka = "";
    public $mjenjac = "";
    public $motor = "";
    public $godina = 0;
    public $snaga = 0;
    public $salon = 0;
    public $cijena = 0;

    public function __construct($sifra, $vrsta, $tip, $model, $proizvodac, $oznaka, $mjenjac, $motor, $godina, $snaga, $salon, $cijena) 
    {
        $this->sifra = $sifra;
        $this->vrsta = $vrsta;
        $this->tip = $tip;
        $this->model = $model;
        $this->proizvodac = $proizvodac;
        $this->oznaka = $oznaka;
        $this->mjenjac = $mjenjac;
        $this->motor = $motor;
        $this->godina = $godina;
        $this->snaga = $snaga;
        $this->salon = $salon;
        $this->cijena = $cijena;
    }


}

class Salon{
    public $id = 0;
    public $ime = "";

    public function __construct($id, $ime)
    {
        $this->id = $id;
        $this->ime = $ime;
    }
}

function write_to_console($data) {
    $console = $data;
    if (is_array($console))
    $console = implode(',', $console);
   
    echo "<script>console.log('Console: " . $console . "' );</script>";
}

?>