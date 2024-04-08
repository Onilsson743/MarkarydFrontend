'use client'

import React, { useEffect, useState } from 'react';
import '../styles/components/ImageSlider.scss';
import Calendar  from '../components/Calendar';

interface props {
    images: string[]
}

const ImageSlider: React.FC<props> = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
              prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 7000);  
        return () => clearInterval(interval);
    }, []);   
    
    var today = new Date();
    var tomorrow = new Date(new Date);
    tomorrow.setDate(today.getDate() + 1);
    return (
        <div className='image-slider'>
            {/* {
                images.map((image, index) =>
                    <img key={index} className={(index === currentImageIndex) ? " active " :
                        (index === currentImageIndex - 1 || (index === images.length - 1 && currentImageIndex === 0)) ? " prev " : " hide "
                        }
                        src={image} alt={`Slide ${index}`} />
                )
            } */}

            <div className='header'>

            </div>
            <Calendar />
        </div>
    )
}

export default ImageSlider