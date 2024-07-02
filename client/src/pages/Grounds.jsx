// src/pages/Grounds.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import { setGrounds } from '../redux/slices/groundsSlice';
import GroundCard from '../components/GroundCard';
const Grounds = () => {
  const dispatch = useDispatch();
  const { grounds } = useSelector((state) => state.grounds);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/user/grounds`);
        if (data.success) {
          dispatch(setGrounds(data.grounds));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGrounds();
  }, [dispatch]);

  return (
    <div className='bg-gray-200 min-h-screen p-8'>
        <p className='ml-5 md:ml-10 mt-5 mb-10 font-semibold text-3xl text-center md:text-left'>Available Turfs</p>
        <div className='flex flex-wrap justify-center md:justify-start gap-5'>
            
            {grounds?.map((ground) =>
                <div key={ground?._id} className="mx-2 md:ml-10 mt-10">
                    <GroundCard
                        id={ground?._id}
                        name={ground?.ground_name}
                        location={ground.location}
                        price={ground.price}
                        image={ground?.images[0]}
                    />
                </div>
            )}
        </div>
    </div>
)
};

export default Grounds;




