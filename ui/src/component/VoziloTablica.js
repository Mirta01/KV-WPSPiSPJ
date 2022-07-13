import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import {Button, Table, Dropdown, Modal, Form} from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider'
import {BsFillTrashFill, BsFillPencilFill, BsFillCartPlusFill, BsFillCartXFill} from "react-icons/bs"

const baseURL = "http://localhost:7000/";

function VoziloTablica()
{
    const startYear = 1970

    const[vozilo, setVozilo]= useState([]);
    const[salon, setSalon]= useState([]);
    const[narucena, setNarucena]= useState([]);
    const[slobodna, setSlobodna]= useState([]);
    const[filter, setFilter]= useState('Vozila');
    //modal
    const[sortiraj, setSortiraj]= useState(false)
    //modal-inputs
    const[proizvodacModal, setProizvodacModal]= useState('');
    const[salonModal, setSalonModal]= useState('');
    const[godinaModal, setGodinaModal]= useState(startYear);
    const[cijenaModal, setCijenaModal]= useState(0);
    const[vrstaModal, setVrstaModal]= useState('');
    const[motorModal, setMotorModal]= useState([]);
    const[mjenjacModal, setMjenjacModal]= useState('');
    const[saloni, setSaloni] = useState([]);


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

                <Button className='addBtn' active={sortiraj} variant="outline-dark" onClick={e => {console.log(sortiraj); setSortiraj(!sortiraj)}}>Sortiraj</Button>
            </div>
        </nav>

        <div className="sorting" style={{display: sortiraj ? 'flex' : 'none'}}>
            <div className="sorting-group">
                <div className='op'>
                    Proizvođač:
                    <div className='inputs-modal d-flex'>
                        <Dropdown>
                        <Dropdown.Toggle className="selectSortBorder" variant="outline-dark" id="dropdown-basic">{proizvodacModal}</Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-scroll">
                                {
                                    vozilo.map(x => {
                                        return <Dropdown.Item key={x.sifra.toString()} onClick={e => {setProizvodacModal(e.target.innerText)}}>{x.proizvodac}</Dropdown.Item>
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="danger" style={{display: proizvodacModal === '' ? 'none' : 'flex'}} onClick={e => setProizvodacModal('')}>X</Button>
                    </div> 
                </div>
                <div className='op'>
                    Salon:
                    <div className='inputs-modal d-flex'>
                        <Dropdown>
                        <Dropdown.Toggle className="selectSortBorder" variant="outline-dark" id="dropdown-basic">{salonModal}</Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-scroll" onChange={e => GetIdSalon(e.target.value)}>
                                {
                                    saloni.map(x => {
                                        return <Dropdown.Item key={x.id.toString()} onClick={e => {setSalonModal(e.target.innerText)}}>{x.ime}</Dropdown.Item>
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="danger" style={{display: salonModal === '' ? 'none' : 'flex'}} onClick={e => setSalonModal('')}>X</Button>
                    </div> 
                </div>
                <div className='op'>

            <Form.Group className='slider-group'>
                    <Form.Label>Godina od:</Form.Label>
                    <div className='inputs-modal'>
                        <RangeSlider
                        className="slider-group-input"
                        value={godinaModal}
                        min={startYear}
                        max={new Date().getFullYear()}
                        tooltip='auto'
                        tooltipPlacement='bottom'
                        onChange={e => setGodinaModal(e.target.value)}
                        />
                    </div>
            </Form.Group>
            <Form.Group className='slider-group'>
                <Form.Label>Cijena do:</Form.Label>
                <div className='inputs-modal'>
                    <RangeSlider
                    className="slider-group-input"
                    value={cijenaModal}
                    min={0}
                    max={100000}
                    tooltip='auto'
                    tooltipPlacement='bottom'
                    tooltipLabel={currVal => `${currVal} €`}
                    onChange={e => setCijenaModal(e.target.value)}
                    />
                </div>
            </Form.Group>
            </div>
            
            </div>
            
            <div className="sorting-group">
            Vrsta:
                <Form>
                    <div key={`inline-radio`} className="mb-0 inputs-modal d-flex">
                        <Form.Check
                            inline
                            label="Automobil"
                            name="group1"
                            type='radio'
                            id={`inline-radio-1`}
                            checked={vrstaModal === "Automobil"}
                            onChange={e => setVrstaModal("Automobil")}
                        />
                        <Form.Check
                            inline
                            label="Mototcikl"
                            name="group1"
                            type='radio'
                            id={`inline-radio-2`}
                            checked={vrstaModal === "Motocikl"}
                            onChange={e => setVrstaModal("Motocikl")}
                        />
                        <Button className="radio-btn-default" variant="danger" style={{display: vrstaModal === '' ? 'none' : 'flex'}} onClick={e => setVrstaModal('')}>X</Button>
                    </div>
                </Form>
            <div className='op'>
            Mjenač:
            <Form>
                <div key={`inline-radio`} className="mb-0 inputs-modal d-flex">
                    <Form.Check
                        inline
                        label="Ručni"
                        name="group1"
                        type='radio'
                        id={`inline-radio-1`}
                        checked={mjenjacModal === "Ručni"}
                        onChange={e => setMjenjacModal("Ručni")}
                    />
                    <Form.Check
                        inline
                        label="Automatski"
                        name="group1"
                        type='radio'
                        id={`inline-radio-2`}
                        checked={mjenjacModal === "Automatski"}
                        onChange={e => setMjenjacModal("Automatski")}
                    />
                    <Button className="radio-btn-default" variant="danger" style={{display: mjenjacModal === '' ? 'none' : 'flex'}} onClick={e => setMjenjacModal('')}>X</Button>
                </div>
            </Form>
                <Form>
                    <div key={`inline-checkbox`} className="motor-input mb-3 inputs-modal">
                        <p className="motor-input-radio">Motor:</p>
                        <Form.Check
                            className="motor-input-radio"
                            label="Benzin"
                            name="group1"
                            type='checkbox'
                            id={`inline-checkbox-1`}
                            onChange={e => HandleMotorModal("Benzin")}
                            />
                        <Form.Check
                            className="motor-input-radio"
                            label="Diesel"
                            name="group1"
                            type='checkbox'
                            id={`inline-checkbox-2`}
                            onChange={e => HandleMotorModal("Diesel")}
                            />
                        <Form.Check
                            className="motor-input-radio"
                            label="Hibrid"
                            name="group1"
                            type='checkbox'
                            id={`inline-checkbox-3`}
                            onChange={e => HandleMotorModal("Hibrid")}
                            />
                        <Form.Check
                            className="motor-input-radio"
                            label="Plin"
                            name="group1"
                            type='checkbox'
                            id={`inline-checkbox-4`}
                            onChange={e => HandleMotorModal("Plin")}
                            />
                        <Form.Check
                            className="motor-input-radio"
                            label="Električni"
                            name="group1"
                            type='checkbox'
                            id={`inline-checkbox-5`}
                            onChange={e => HandleMotorModal("Električni")}
                        />
                    </div>
            </Form>
            </div>
            </div>
        </div>

        <div>
        <Table striped bordered hover className='tableD'>
            <thead>
                <tr>
                    <th scope='col'>Šifra</th>
                    <th scope='col'>Vrsta</th>
                    <th scope='col'>Tip</th>
                    <th scope='col'>Model</th>
                    <th scope='col'>Proizvođač</th>
                    <th scope='col'>Godina proizvodnje</th>
                    <th scope='col'>Snaga motora</th>
                    <th scope='col'>Salon</th>

                    {(function () {
                    switch (filter) {
                        case "Naručena":
                            return(
                                <>
                                    <th scope='col'>Oznaka</th>
                                    <th scope='col' style={{width: '9%'}}>Obriši naruđbu</th>
                                </>
                            )
                        case "Slobodna":
                            return(
                                <>
                                    <th scope='col'>Oznaka</th>
                                    <th scope='col' style={{width: '6%'}}>Naruči</th>
                                </>
                            )
                        default:
                            return(
                                <>
                                    <th scope='col'>Cijena</th>
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
                            return FilterSearch(narucena).map(x => {
                                return(<tr key = {x.sifra.toString()}>
                                    <td>{x.sifra}</td>
                                    <td>{x.vrsta}</td>
                                    <td>{x.tip}</td>
                                    <td>{x.model}</td>
                                    <td>{x.proizvodac}</td>
                                    <td>{x.godina}. godina</td>
                                    <td>{x.snaga} kW</td>
                                    <td>{x.salon}</td>
                                    <td>{x.oznaka}</td>
                                    <td onClick={() => {DeleteOrder(x.sifra)}}><BsFillCartXFill/></td>
                                </tr>)
                            })
                        case "Slobodna":
                            return FilterSearch(slobodna).map(x => {
                                return(<tr key = {x.sifra.toString()}>
                                    <td>{x.sifra}</td>
                                    <td>{x.vrsta}</td>
                                    <td>{x.tip}</td>
                                    <td>{x.model}</td>
                                    <td>{x.proizvodac}</td>
                                    <td>{x.godina}. godina</td>
                                    <td>{x.snaga} kW</td>
                                    <td>{x.salon}</td>
                                    <td>{x.oznaka}</td>
                                    <td onClick={() => {CreateOrder(x.sifra, x.salon)}}><BsFillCartPlusFill/></td>
                                </tr>)
                            })
                        default:
                            return FilterSearch(vozilo).map(x => {
                                return(<tr key = {x.sifra.toString()}>
                                    <td>{x.sifra}</td>
                                    <td>{x.vrsta}</td>
                                    <td>{x.tip}</td>
                                    <td>{x.model}</td>
                                    <td>{x.proizvodac}</td>
                                    <td>{x.godina}. godina</td>
                                    <td>{x.snaga} kW</td>
                                    <td>{x.salon}</td>
                                    <td>{x.cijena} €</td>
                                    <td onClick={() => {DeleteVehicle(x.sifra, x.model, x.proizvodac)}}><BsFillTrashFill/></td>
                                    <td>
                                        <Link to={"/alter/"+x.sifra} className='text-dark'>
                                            <BsFillPencilFill/>
                                        </Link>
                                    </td>
                                </tr>)
                            })
                        }
                    }
                )()}
            </tbody>
        </Table>
      </div>

        </>
    )

    function DeleteVehicle(sifra, model, proizvodac) {
        var answer = window.confirm(`Želite li obrisati ${proizvodac} ${model}?`);
        if (answer) {
            axios.post(baseURL + "delete.php", {
                sifra: sifra
            },
            {
                headers : {
                    "Content-Type": "multipart/form-data"
            }})
            .then((res) => {
                window.location.reload(false)
            }).catch((res) => {
                alert(`${proizvodac} ${model} je naručen.\nMolimo vas stornirajte narudžbu i pokušajte ponovo.`)
            })
        }
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

        saloni.forEach(el => {
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

    function HandleMotorModal (newMotor) {
        if ( motorModal.includes(newMotor) )
        {
            setMotorModal(motorModal.filter(motor => motor !== newMotor))
        }
        else
        {
            setMotorModal([...motorModal, newMotor])
        }
    }

    function GetIdSalon(imesalon) {
        var idsalon;

        saloni.forEach(el => {
            if(imesalon === el.ime){
                idsalon = el.id;
            }
        });

        return idsalon;
    }

    function FilterSearch(arr) {
        return arr.filter(value => {
            return  ( parseInt(value.cijena) <= cijenaModal || cijenaModal == 0 ) &&
                    ( parseInt(value.godina) >= godinaModal || godinaModal === startYear ) &&
                    ( value.mjenjac === mjenjacModal        || mjenjacModal === '' ) &&
                    ( motorModal.includes(value.motor)      || motorModal.length === 0 ) &&
                    ( value.proizvodac === proizvodacModal  || proizvodacModal === '' ) &&
                    ( value.salon === salonModal            || salonModal === '' ) &&
                    ( value.vrsta === vrstaModal            || vrstaModal=== '' )
            })
    }
}

export default VoziloTablica;

//treba sortiranje napraviti da funkcijonira..
// to jest ako stisnemo sortiraj samo po cijenam do 10 000 € onda samo da te pokaže