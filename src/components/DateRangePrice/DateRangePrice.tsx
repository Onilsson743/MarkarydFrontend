'use client'

import { FormatDate } from '@/functions/DateFunctions';
import { IDateRangePrice, IDateRangePriceFetch } from '@/models/IDateRangePrices';
import React, { useState } from 'react';
import './DateRangePrice.scss';
import { RemoveDateRangePrice } from '@/scripts/BookingPricesFetch';
import { DeleteButton } from '../DeleteButton/DeleteButton';

const DateRangePrice = ({ datePrice }: { datePrice: IDateRangePrice}) => {
    const [dateRangePrice, setDateRangePrice] = useState<IDateRangePrice | undefined>(datePrice);
    const [formData, setFormData] = useState({ startDate: "", endDate: "", price: 0 });
    const [toggle, setToggle] = useState<boolean>(false);

    if(dateRangePrice) {
        const Delete = async () => {
            var response: Response = await RemoveDateRangePrice(dateRangePrice.id!);
            if (response.ok) {
                setDateRangePrice(undefined)
            } else {
    
            }
        }
    
        const Update = () => {
            const updateDatePrice: IDateRangePriceFetch = {
                id: dateRangePrice?.id,
                price: formData.price,
                startDate: new Date(formData.startDate).toLocaleDateString(),
                endDate: new Date(formData.endDate).toLocaleDateString(),
                isDefaultPrice: false
            }
            //fetch to update the date
        }
    
        const HandleChange = (event: any) => {
            const { name, value } = event.target;
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        };
        return (
            <div className='price-section'>
                <div className='info-box'>
                    {toggle ? (
                        <div className='form-box'>
                            <form>
                                <label htmlFor="startDate">Från:</label>
                                <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={(e) => HandleChange(e)} />
    
                                <label htmlFor="endDate">Till:</label>
                                <input type='date' name="endDate" id="endDate" value={formData.endDate} onChange={(e) => HandleChange(e)} />
    
                                <label htmlFor="price">Pris:</label>
                                <input type='number' name="price" id="price" value={formData.price} onChange={(e) => HandleChange(e)} />
    
                            </form>
                            <div className='buttons'>
                                <DeleteButton remove={() => Delete()} />
                                {/* <button className='admin-btn delete-button' onClick={() => Delete()}>Radera</button> */}
                                <button className='admin-btn save-button' onClick={() => Update()}>Spara</button>
                                <button className='admin-btn' onClick={() => setToggle(false)}>Avbryt</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='text'>
                                <div className='dates'>
                                    <p>Från: {FormatDate(dateRangePrice.startDate!)}</p>
                                    <p>Till: {FormatDate(dateRangePrice.endDate!)}</p>
                                </div>
                                <p>Pris: {dateRangePrice.price} sek/natt</p>
                            </div>
                            <button className='admin-btn' onClick={() => setToggle(true)}>Ändra</button>
                        </>                    
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
    
}

export default DateRangePrice