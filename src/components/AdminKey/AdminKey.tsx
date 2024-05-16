'use client'

import React, { useState } from 'react'
import './AdminKey.scss'
import { useRouter } from 'next/navigation';


const AdminKey = () => {
    const [formData, setFormData] = useState({ authkey: "", });
    const router = useRouter();

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const createAuthKey = () => {
        //Check if key is ok and then set it and refresh the page.
        document.cookie = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME! + "=" + formData.authkey
        
        router.refresh()
    }

    const sendNewAuthKey = () => {
        //fetch to send a new authkey.
    }


    return (
        <div className='admin-key'>
            <div className="section ">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
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
                                                    <button className="btn mt-4">Skicka nyckel</button>
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