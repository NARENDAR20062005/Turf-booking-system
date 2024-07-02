import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import GroundCard from '../components/GroundCard';
import ImageSlider from '../components/ImageSlider';
import { BASE_URL } from '../utils/helper';
import { setGrounds } from '../redux/slices/groundsSlice';
import { setScrollPosition } from '../redux/slices/scrollPositionSlice';

const Landing = () => {
  const dispatch = useDispatch();
  const grounds = useSelector(state => state.grounds.grounds);
  const scrollPosition = useSelector(state => state.scrollPosition.scrollPosition);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/grounds`);
        if (response.data.success) {
          dispatch(setGrounds(response.data.grounds));
        }
      } catch (error) {
        console.error('Error fetching grounds:', error);
      }
    };

    fetchGrounds();
  }, [dispatch]);

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
    <div className="relative bg-gray-200 min-h-screen p-8">
      {/* Image Slider */}
      <ImageSlider />

      {/* Scroll Buttons */}
      <div className="flex w-full absolute z-10 justify-between mt-40">
        <button onClick={() => handleScroll('left')} className="text-white m-1 rounded-full">
          <img className='w-10' src="../src/images/la.svg" alt="left arrow" />
        </button>
        <button onClick={() => handleScroll('right')} className="text-white m-1 rounded-full">
          <img className='w-10' src="../src/images/ra.svg" alt="right arrow" />
        </button>
      </div>

      {/* Grounds Section */}
      <div id="groundContainer" className="flex mx-4 sm:mx-16 my-8 overflow-x-auto justify-between relative">
        <div className="flex justify-between my-5" style={{ transform: `translateX(-${scrollPosition}px)`, transition: 'transform 0.3s' }}>
          {grounds.map((ground) => (
            <div key={ground._id} className="mr-5">
              <GroundCard
                id={ground._id}
                name={ground.ground_name}
                location={ground.location}
                price={ground.price}
                image={ground.images[0]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
