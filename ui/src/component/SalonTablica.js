import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import {Button, Table} from 'react-bootstrap'
import {BsFillTrashFill} from "react-icons/bs"

const baseURL = "http://localhost:7000/";

function SalonTablica()
{
    const[salon, setSalon]= useState([]);

    useEffect(() => {
        axios.get(baseURL + "salon.php").then((response) => {
            setSalon(response.data);
        });
    },[]);

    return (
        <>
        <nav className="navbar navbar-light">
            <Link className='navTitle' to={"/"}>
                VuV AUTOMOBILI
            </Link>
            <div className='d-flex flex-direction-row'>
                <Link to={"/createSalon"}>
                    <Button className='addBtn' variant="outline-dark">
                    Dodaj</Button>
                </Link>
                <Link to={"/"}>
                    <Button className='addBtn' variant="outline-dark">
                    Vozila</Button>
                </Link>
            </div>
        </nav>

        <Table striped bordered hover className='tableD'>
            <thead>
                <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Ime</th>
                    <th scope='col'>Obriši</th>
                </tr>
            </thead>
            <tbody>
                {
                    salon.map(x => {
                        return(<tr key = {x.id.toString()}>
                            <td>{x.id}</td>
                            <td>{x.ime}</td>
                            <td onClick={() => {DeleteSalon(x.id, x.ime)}}><BsFillTrashFill/></td>
                        </tr>)
                    })
                }
            </tbody>
        </Table>
        </>
    )

    function DeleteSalon(id, ime) {


        axios.post(baseURL + "deleteSalon.php", {
            id: id
        },
        {
            headers : {
                "Content-Type": "multipart/form-data"
        }})
        .then((res) => {
            window.location.reload(false)
        }).catch((res) => {
            alert(`${ime} jos uvijek posjeduje vozila.\nMolimo vas izbriste ih ili prebacite u drugi salon i pokušajte ponovo.`)
        })
    }
}

export default SalonTablica;