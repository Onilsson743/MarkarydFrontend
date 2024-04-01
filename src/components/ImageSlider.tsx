'use client'

import React, { useEffect, useState } from 'react';
import '../styles/components/ImageSlider.scss';

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
    }, [currentImageIndex]);    

    return (
        <div className='image-slider'>
            {
                images.map((image, index) =>
                    <img className={(index === currentImageIndex) ? " active " :
                        (index === currentImageIndex - 1 || (index === images.length - 1 && currentImageIndex === 0)) ? " prev " : " hide "
                        }
                        src={image} alt={`Slide ${index}`} />
                )
            }
        </div>
    )
}

export default ImageSlider