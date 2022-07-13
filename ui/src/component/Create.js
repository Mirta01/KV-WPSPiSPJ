import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import {Button, Form} from 'react-bootstrap'

const baseURL = "http://localhost:7000/";

function Create()
{
    const [vrsta, setVrsta] = useState('Automobil');
    const [tip, setTip] = useState('Limuzina');
    const [model, setModel] = useState('');
    const [proizvodac, setProizvodac] = useState('');
    const [oznaka, setOznaka] = useState('');
    const [mjenjac, setMjenjac] = useState('');
    const [motor, setMotor] = useState('');
    const [godina, setGodina] = useState('');
    const [snaga, setSnaga] = useState('');
    const [salon, setSalon] = useState('');
    const [cijena, setCijena] = useState('');
    const [saloni, setSaloni] = useState([]);

    var thisYear = new Date().getFullYear();

    useEffect(() => {
        axios.get(baseURL + "salon.php").then((response) => {
            setSaloni(response.data);
            if(response.data.length > 0)
            {
                setSalon(response.data[0].id)
            }
        });
    },[]);

    return (
        <>
        <nav className="navbar navbar-light">
            <Link className='navTitle' to={"/"}>
                VuV AUTOMOBILI
            </Link>
        </nav>

        <div className="formBody">
            <Form onSubmit={e => {
                e.preventDefault()
                axios({
                    method: 'post',
                    url: 'http://localhost:7000/create.php',
                        data: {
                                vrsta: vrsta,
                                tip: tip,
                                model: model,
                                proizvodac: proizvodac,
                                oznaka: oznaka.toUpperCase(),
                                mjenjac: mjenjac,
                                motor: motor,
                                godina: godina,
                                snaga: snaga,
                                salon: salon,
                                cijena: cijena
                            },
                    headers: {"Content-Type": "multipart/form-data"},
                }).then(function (response) {
                    window.location = "/";
                }).catch(function (response){
                    console.log(response);
                });
            }}>
                
                <Form.Group className="mb-3">
                    <Form.Label>Vrsta vozila</Form.Label>
                    <Form.Select onChange={e => setVrsta(e.target.value)} required>
                    <option selected>Automobil</option>
                    <option>Motocikl</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tip</Form.Label>
                    <Form.Select onChange={e => setTip(e.target.value)} required>
                    {
                        vrsta === "Automobil" ? <>
                            <option selected>Limuzina</option>
                            <option>Coupé</option>
                            <option>Kabriolet</option>
                            <option>Kombi</option>
                            <option>Crossover</option>
                            <option>Karavan</option>
                            <option>Terenski automobil</option>
                            <option>Sedan</option>
                            <option>Hatchback</option>
                        </>
                        : <></>
                    }
                    {
                        vrsta === "Motocikl" ?
                        <>
                            <option>Choppere</option>
                            <option>Kruzer</option>
                            <option>Touring</option>
                            <option>Supermoto</option>
                            <option>Skuter</option>
                            <option>Off road</option>
                            <option>Criuser</option>
                            <option>Standard</option>
                        </>
                        : <></>
                    }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setModel(e.target.value)}>
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" required/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setProizvodac(e.target.value)}>
                    <Form.Label>Proizvođač</Form.Label>
                    <Form.Control type="text" required/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setOznaka(e.target.value)}>
                    <Form.Label>Oznaka</Form.Label>
                    <Form.Control type="text" minLength={17} maxLength={17} required/>
                </Form.Group>

                <Form.Group key={`inline-radio`} className="mb-3">
                    <Form.Label>Mjenjač</Form.Label>
                    <div className='mjenjac-style'>
                        <Form.Check
                            inline
                            label="Ručni"
                            name="group1"
                            type='radio'
                            id={`inline-radio-1`}
                            onChange={e => setMjenjac("Ručni")}
                        />
                        <Form.Check
                            inline
                            label="Automatski"
                            name="group1"
                            type='radio'
                            id={`inline-radio-2`}
                            onChange={e => setMjenjac("Automatski")}
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Motor</Form.Label>
                    <Form.Select onChange={e => setMotor(e.target.value)} required>
                        <option selected>Benzin</option>
                        <option>Diesel</option>
                        <option>Hibrid</option>
                        <option>Plin</option>
                        <option>Električni</option>
                    </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3" onInput={e => setGodina(e.target.value)}>
                    <Form.Label>Godina</Form.Label>
                    <Form.Control min={1950} max={thisYear} type="number" required/>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setSnaga(e.target.value)}>
                    <Form.Label>Snaga motora</Form.Label>
                    <Form.Control type="number" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Salon</Form.Label>
                    <Form.Select onChange={e => GetIdSalon(e.target.value)} required>
                        {
                            saloni.map(x => {
                                return <option key={x.id.toString()}>{x.ime}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" onInput={e => setCijena(e.target.value)}>
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control min={0} max={100000} type="number" required/>
                </Form.Group>

                <Button
                variant="outline-primary"
                type="submit">Spremi</Button>{' '}
            </Form>
        </div>
        </>
    )

    function GetIdSalon(imesalon) {
        var idsalon;

        saloni.forEach(el => {
            if(imesalon === el.ime){
                idsalon = el.id;
            }
        });
        
        setSalon(idsalon);
    }

}

export default Create;
