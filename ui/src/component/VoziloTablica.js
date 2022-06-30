import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import {Button, Table, Dropdown} from 'react-bootstrap'
import {BsFillTrashFill, BsFillPencilFill, BsFillCartPlusFill, BsFillCartXFill} from "react-icons/bs"

const baseURL = "http://localhost:7000/";

function VoziloTablica()
{
    const[vozilo, setVozilo]= useState([]);
    const[salon, setSalon]= useState([]);
    const[narucena, setNarucena]= useState([]);
    const[slobodna, setSlobodna]= useState([]);
    const[filter, setFilter]= useState('Vozila');


    useEffect(() => {
        axios.get(baseURL + "read.php").then((response) => {
            setVozilo(response.data);
        });
    },[]);

    useEffect(() => {
        axios.get(baseURL + "salon.php").then((response) => {
            setSalon(response.data);
        });
    },[]);
    
    useEffect(() => {
        axios.get(baseURL + "ordered.php").then((response) => {
            setNarucena(response.data);
        });
    },[]);
    
    useEffect(() => {
        axios.get(baseURL + "available.php").then((response) => {
            setSlobodna(response.data);
        });
    },[]);

    return (
        <>
        <nav className="navbar navbar-light">
            <Link className='navTitle' to={"/"}>
                VuV AUTOMOBILI
            </Link>
            <div className='d-flex flex-direction-row'>
                <Link to={"/create"}>
                    <Button className='addBtn' variant="outline-dark">
                    Dodaj</Button>
                </Link>

                <Dropdown>
                    <Dropdown.Toggle className="selectBorder" variant="outline-dark" id="dropdown-basic">{filter}</Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={e => {setFilter(e.target.innerText)}}>Vozila</Dropdown.Item>
                        <Dropdown.Item onClick={e => {setFilter(e.target.innerText)}}>Naručena</Dropdown.Item>
                        <Dropdown.Item onClick={e => {setFilter(e.target.innerText)}}>Slobodna</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/salon">Saloni</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </nav>
        <Table striped bordered hover className='tableD'>
            <thead>
                <tr>
                    <th scope='col'>Šifra</th>
                    <th scope='col'>Vrsta</th>
                    <th scope='col'>Tip</th>
                    <th scope='col'>Model</th>
                    <th scope='col'>Proizvođač</th>
                    <th scope='col'>Oznaka</th>
                    <th scope='col'>Godina proizvodnje</th>
                    <th scope='col'>Snaga motora</th>
                    <th scope='col'>Salon</th>

                    {(function () {
                    switch (filter) {
                        case "Naručena":
                            return(<th scope='col' style={{width: '9%'}}>Obriši naruđbu</th>)
                        case "Slobodna":
                            return(<th scope='col' style={{width: '6%'}}>Naruči</th>)
                        default:
                            return(
                                <>
                                    <th scope='col' style={{width: '4%'}}>Obriši</th>
                                    <th scope='col' style={{width: '4%'}}>Uredi</th>
                                </>
                            )
                        }})()}
                </tr>
            </thead>
            <tbody>
                {(function () {
                    switch (filter) {
                        case "Naručena":
                            return narucena.map(x => {
                                return(<tr key = {x.sifra.toString()}>
                                    <td>{x.sifra}</td>
                                    <td>{x.vrsta}</td>
                                    <td>{x.tip}</td>
                                    <td>{x.model}</td>
                                    <td>{x.proizvodac}</td>
                                    <td>{x.oznaka}</td>
                                    <td>{x.godina}. godina</td>
                                    <td>{x.snaga} kW</td>
                                    <td>{x.salon}</td>
                                    <td onClick={() => {DeleteOrder(x.sifra)}}><BsFillCartXFill/></td>
                                </tr>)
                            })
                        case "Slobodna":
                            return slobodna.map(x => {
                                return(<tr key = {x.sifra.toString()}>
                                    <td>{x.sifra}</td>
                                    <td>{x.vrsta}</td>
                                    <td>{x.tip}</td>
                                    <td>{x.model}</td>
                                    <td>{x.proizvodac}</td>
                                    <td>{x.oznaka}</td>
                                    <td>{x.godina}. godina</td>
                                    <td>{x.snaga} kW</td>
                                    <td>{x.salon}</td>
                                    <td onClick={() => {CreateOrder(x.sifra, x.salon)}}><BsFillCartPlusFill/></td>
                                </tr>)
                            })
                        default:
                            return vozilo.map(x => {
                                return(<tr key = {x.sifra.toString()}>
                                    <td>{x.sifra}</td>
                                    <td>{x.vrsta}</td>
                                    <td>{x.tip}</td>
                                    <td>{x.model}</td>
                                    <td>{x.proizvodac}</td>
                                    <td>{x.oznaka}</td>
                                    <td>{x.godina}. godina</td>
                                    <td>{x.snaga} kW</td>
                                    <td>{x.salon}</td>
                                    <td onClick={() => {DeleteVehicle(x.sifra)}}><BsFillTrashFill/></td>
                                    <td>
                                        <Link to={"/alter/"+x.sifra} className='text-dark'>
                                            <BsFillPencilFill/>
                                        </Link>
                                    </td>
                                </tr>)
                            })
                    }
                })()}
            </tbody>
        </Table>
        </>
    )

    function DeleteVehicle(sifra) {
        axios.post(baseURL + "delete.php", {
            sifra: sifra
        },
        {
            headers : {
                "Content-Type": "multipart/form-data"
        }})
        .then(window.location.reload(false))
    }
    
    function DeleteOrder(sifravozilo) {
        axios.post(baseURL + "deleteOrder.php", {
            sifravozilo: sifravozilo
        },
        {
            headers : {
                "Content-Type": "multipart/form-data"
        }})
        .then(window.location.reload(false))
    }
    
    function CreateOrder(sifravozilo, imesalon) {
        var idsalon;

        salon.forEach(el => {
            if(imesalon === el.ime){
                idsalon = el.id;
            }
        });

        axios.post(baseURL + "order.php", {
            sifravozilo: sifravozilo,
            idsalon: idsalon
        },
        {
            headers : {
                "Content-Type": "multipart/form-data"
        }})
        .then(window.location.reload(false))
    }
}

export default VoziloTablica;