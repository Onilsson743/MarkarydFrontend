'use client'

import React, { useEffect, useState } from 'react';
import "./BookingDatePrices.scss";
import { AddNewDateRangePrice, GetAllPrices } from '@/scripts/BookingPricesFetch';
import { IDateRangePrice, IDateRangePriceFetch } from '@/models/IDateRangePrices';
import DateRangePrice from '../DateRangePrice/DateRangePrice';

const BookingDatePrices = () => {
    const [datePrices, setDatePrices] = useState<IDateRangePrice[]>([]);
    const [defaultPrice, setDefaultPrice] = useState<IDateRangePrice>();
    const [defaultPriceMessage, setDefaultPriceMessage] = useState<string>();
    const [toggleDefaultPrice, setToggleDefaultPrice] = useState<boolean>(false)
    const [formData, setFormData] = useState({ defaultPrice: 0 });
    const [addNewPrice, setAddNewPrice] = useState<boolean>(false);
    const [newDateForm, setNewDateForm] = useState({startDate : "", endDate : "", price : 0})

    const GetPrices = async () => {
        var result: Response = await GetAllPrices();
        if (result.ok) {
            const data: IDateRangePrice[] = await result.json();
            const dateRangeList: IDateRangePrice[] = data.filter(x => x.isDefaultPrice == false);
            if (dateRangeList && dateRangeList.length > 0) {
                setDatePrices(dateRangeList)
            }

            const defaultPrice: IDateRangePrice[] = data.filter(x => x.isDefaultPrice == true);
            if (defaultPrice && defaultPrice.length == 1) {
                setDefaultPrice(defaultPrice[0])
            } else {

            }
        }
    }

    useEffect(() => {
        GetPrices();
    }, [])

    const HandleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const HandleChangeNewForm = (event: any) => {
        const { name, value } = event.target;
        setNewDateForm((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const SaveDefaultPrice = async () => {
        if (formData.defaultPrice > 0) {
            var newDefaultPrice: IDateRangePrice = {
                price: formData.defaultPrice,
                isDefaultPrice: true
            }
            const response = await AddNewDateRangePrice(newDefaultPrice)

            if (response.ok) {
                var data: IDateRangePrice = await response.json();
                setDefaultPrice(data)
                setToggleDefaultPrice(false)
            }
        }
    }
    const SaveNewPrice = async () => {
        
        var newDatePrice: IDateRangePriceFetch = {
            startDate : newDateForm.startDate,
            endDate : newDateForm.endDate,
            price: newDateForm.price,
            isDefaultPrice: false
        }
        const response = await AddNewDateRangePrice(newDatePrice)

        if (response.ok) {
            var data: IDateRangePrice = await response.json();
            setDatePrices(datePrices => [...datePrices, data])
            setAddNewPrice(false)
        }
        
    }


    return (
        <div className='booking-date-prices container'>
            <h2>Grundpris</h2>
            <div className='price-section'>
                <div className='info-box'>
                    {toggleDefaultPrice ? (
                        <>
                            <div className='text'>
                                <label htmlFor="defaultPrice">Pris:</label>
                                <input type="number" name="defaultPrice" id="defaultPrice" value={formData.defaultPrice} onChange={(e) => HandleChange(e)} />

                            </div>
                            <div className='buttons'>
                                <button className='admin-btn save-button' onClick={() => SaveDefaultPrice()}>Spara</button>
                                <button className='admin-btn' onClick={() => setToggleDefaultPrice(false)}>Ångra</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='text'>
                                {defaultPrice ? (
                                    <>
                                        <p>Pris: {defaultPrice.price} sek/natt</p>
                                    </>
                                ) : (
                                    <>
                                        <p>Inget grundpris pris satt</p>
                                    </>
                                )}

                            </div>
                            <button className='admin-btn' onClick={() => setToggleDefaultPrice(true)}>Ändra</button>
                        </>
                    )}
                </div>
            </div >

            <h2>Specifika Datum</h2>
            {datePrices.map((x, index) => <DateRangePrice datePrice={x} key={index}/>)}
            {addNewPrice ? (
                <div className='price-section'>
                    <div className='info-box add-new-form'>
                        <div className='form-box'>
                            <form>
                                <label htmlFor="startDate">Från:</label>
                                <input type="date" name="startDate" id="startDate" value={newDateForm.startDate} onChange={(e) => HandleChangeNewForm(e)} />

                                <label htmlFor="endDate">Till:</label>
                                <input type='date' name="endDate" id="endDate" value={newDateForm.endDate}  onChange={(e) => HandleChangeNewForm(e)} />

                                <label htmlFor="price">Pris:</label>
                                <input type='number' name="price" id="price" value={newDateForm.price} onChange={(e) => HandleChangeNewForm(e)} />

                            </form>
                        </div>
                        <div className='buttons'>
                            <button className='admin-btn save-button' onClick={() => SaveNewPrice()}>Lägg till</button>
                            <button className='admin-btn' onClick={() => setAddNewPrice(false)}>Avbryt</button>
                        </div>
                    </div>
                </div>
            ) : (
                <button className='admin-btn' onClick={() => setAddNewPrice(true)}>Lägg till nytt pris</button>
            )}
        </div >
    )
}

export default BookingDatePrices