'use client'

import React, { useState } from 'react'
import './AdminKey.scss'
import { useRouter } from 'next/navigation';
import { GenerateNewKey, ValidateKey } from '@/scripts/AuthFetch';


const AdminKey = () => {
    const [formData, setFormData] = useState({ authkey: "", });
    const [responseMessage, setResponseMessage] = useState<string>();
    const router = useRouter();

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const createAuthKey = async () => {
        var response = await ValidateKey(formData.authkey);
        if (response.ok) {
            var expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 6);
            document.cookie = `${process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!}=${formData.authkey};expires=${expirationDate}`;
            router.refresh()
        } else {
            setResponseMessage("Nyckeln gick ej att validera, vänligen testa igen.")
        }        
    }

    const sendNewAuthKey = async () => {
        var response : Response = await GenerateNewKey();
        if(response.ok) {
            setResponseMessage("En ny nyckel har skickats som ett email.")
        } else {
            setResponseMessage("Något gick fel, vänligen kontakta it support.")
        }
    }


    return (
        <div className='admin-key'>
            <h1 className='header-text'>Logga in som Admin</h1>
            <div className="section ">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center">
                            <div className="section  pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span>Ange nyckel </span><span>Skapa nyckel</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label htmlFor="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Lägg till ny nyckel</h4>
                                                    <div className="form-group">
                                                        <input type="text" name="authkey" className="form-style" placeholder="Ange nyckel..." id="authkey" autoComplete="off" value={formData.authkey} onChange={(e) => handleChange(e)} />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <button onClick={() => createAuthKey()} className="btn mt-4">Använd Nyckel</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Skapa ny nyckel</h4>
                                                    <button onClick={() => sendNewAuthKey()} className="btn mt-4">Skicka nyckel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminKey