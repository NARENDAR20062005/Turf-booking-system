import React from 'react';
import SidePanel from '../components/SidePanel';
import Grounds from './Grounds';
import Bookings from './Bookings';
import { useDispatch, useSelector } from 'react-redux';
import { setScrollPosition } from '../redux/slices/scrollPositionSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Landing = () => {

    const dispatch = useDispatch();
    const [grounds, setGrounds] = useState([]);
    const token = localStorage.getItem('token');
    const scrollPosition = useSelector(state => state.scrollPosition.scrollPosition);

    const getAllGrounds = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/admin/fetch-ground`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            // console.log("data is", data);
            if (data.success) {
                setGrounds(data.grounds);
            }
            // console.log(grounds);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllGrounds();
    }, []);

    const handleScroll = (direction) => {
        const container = document.getElementById('groundContainer');
        const cardWidth = 350; // Adjust based on your card width
        const totalWidth = grounds.length * cardWidth;
        const maxScroll = Math.max(totalWidth - container.offsetWidth, 0);
    
        if (direction === 'left') {
          dispatch(setScrollPosition(Math.max(scrollPosition - container.offsetWidth, 0)));
        } else if (direction === 'right') {
          dispatch(setScrollPosition(Math.min(scrollPosition + container.offsetWidth, maxScroll)));
        }
      };



    return (
        <div>
            <SidePanel/>
            <p className='ml-10 mt-5 mb-3 font-bold text-5xl p-8'>Listed Turfs</p>
            <div className='flex flex-wrap justify-start gap-5'>
                <Grounds />
            </div>
            <div className='flex flex-wrap justify-start gap-5'>
                <Bookings />
            </div>
        </div>

        
    );
};

export default Landing;
