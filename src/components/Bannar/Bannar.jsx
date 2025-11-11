import React from 'react';
import BannarImage from '../../assets/banner-img-1.png'



// linear-gradient(to bottom, rgba(15, 15, 15, 0), rgba(15, 15, 15, 1)),
const Bannar = () => {
    return (
        <div style={{backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 15, 0), rgba(15, 15, 15, 1)),
        url(${BannarImage})`, backgroundSize:'cover',height: '80vh'}} className=' rounded-2xl my-6'>
            

           <div className='pt-40'>
             <h2 className='text-white text-5xl text-center font-bold'>It avoids subjective claims or <br />exaggeration that might raise red  <br />flags legally</h2>
            <p className='text-white text-center pt-6'>Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. Whether it's <br /> a routine checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.</p>
           </div>
        </div>
    );
};

export default Bannar;