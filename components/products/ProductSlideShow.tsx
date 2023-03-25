
import { FC } from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css'
import styles from './../../styles/ProductSlidesShow.module.css'

interface Props {
    images: string[]
    height?: string
}


export const ProductSlideShow:FC<Props> = ({ images, height }) => {

  return (
    <Slide
        easing="ease"
        duration={ 7000 }
        indicators
    >
        {
            images.map( image => {
                return (
                    <div key={ image } className={styles['each-slide']}>
                        <div style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover'
                        }}>

                        </div>
                    </div>
                )
            })
        }

    </Slide>
  )
}
