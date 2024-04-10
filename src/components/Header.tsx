
import React, { useEffect, useState } from 'react';
import '../styles/components/Header.scss';

import BasicDateCalendar from '../components/Calendar';

const Header = () => {
    const utilities : string[] = [
        "Utsikt mot trädgården",
        "Gratis parkering inkluderad",
        "Privat bastu",
        "Varmvatten",
        "Väsentligheter - Handdukar, lakan, tvål och toalettpapper",
        "Wifi",
        "TV",
        "Öppen spis inomhus: vedeldad",
        "Central luftkonditionering",
    ]

    // var today = new Date();
    // var tomorrow = new Date(new Date);
    // tomorrow.setDate(today.getDate() + 1);
    return (
        <div className='header'>
            <img className='header-image' src="https://a0.muscache.com/im/pictures/miso/Hosting-686760093059295825/original/f16b8db3-c5b2-4e51-b1c9-fd25636a4309.jpeg?im_w=1920" alt="" />

            <div className='calendar-div container'>
                <div className='utilities'>
                    <h2>Bekvämligheter</h2>
                    <ul>
                        {
                            utilities.map((x, index) => <li key={index}>{x}</li>)
                        }
                    </ul>
                </div>
                <BasicDateCalendar />
            </div>

        </div>
    )
}

export default Header