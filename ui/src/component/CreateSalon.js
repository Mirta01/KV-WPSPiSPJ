import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import {Button, Form} from 'react-bootstrap'

function CreateSalon()
{
    const [ime, setIme] = useState('');

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
                    url: 'http://localhost:7000/createSalon.php',
                        data: {
                                ime: ime
                            },
                    headers: {"Content-Type": "multipart/form-data"},
                }).then(function (response) {
                    window.location = "/salon";
                }).catch(function (response){
                    console.log(response);
                });
            }}>
                <Form.Group className="mb-3" onInput={e => setIme(e.target.value)}>
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" required/>
                </Form.Group>

                <Button
                variant="outline-primary"
                type="submit">Spremi</Button>{' '}
            </Form>
        </div>
        </>
    )

}

export default CreateSalon;
