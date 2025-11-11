import React from 'react';
import Bannar from '../../components/Bannar/Bannar';
import Lawyers from '../Lawyers/Lawyers';
import { useLoaderData } from 'react-router';
import LawService from '../LawService/LawService';

const Home = () => {

    const data = useLoaderData()
    // console.log(data)



    return (
        <div>
          <Bannar></Bannar>
          <Lawyers data={data}></Lawyers>
          <LawService></LawService>
        </div>
    );
};

export default Home;