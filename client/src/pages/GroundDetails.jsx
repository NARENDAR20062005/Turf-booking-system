// src/pages/GroundDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import { setGround } from '../redux/slices/groundsSlice';
import ImageViewer from 'react-simple-image-viewer';
import toast from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
import GoogleMap from '../components/GoogleMap';

const GroundDetails = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const ground = useSelector((state) => state.grounds.currentGround);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  useEffect(() => {
    const getGroundDetails = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/user/ground/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        if (data?.success) {
          dispatch(setGround(data.ground));
          setInputs({
            name: data.ground.ground_name,
            location: data.ground.location,
            description: data.ground.description,
            price: data.ground.price,
            images: data.ground.images,
            availableSlots: data.ground.availableSlots,
            latitude: data.ground.coordinates.latitude,
            longitude: data.ground.coordinates.longitude,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getGroundDetails();
  }, [dispatch, id, token]);

  const openImageViewer = (index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const handleDateChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDate(new Date(selectedValue));
  };

  const handleTimeSlotChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTimeSlot(selectedValue);
  };

  const isCurrentDate = selectedDate.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

  const bookGround = async (e) => {
    e.preventDefault();
    if (selectedDate === "" || selectedTimeSlot === "") {
      toast.error("Select date and time");
      return;
    }
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/user/book-slot/${id}`, {
        date: selectedDate,
        timeSlot: selectedTimeSlot,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (data.success) {
        toast.success("Ground booked!");
        navigate('/bookings');
      }
    } catch (error) {
      console.log(error);
      toast.error("already booked");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen p-4 lg:pt-5">
      <h2 className="text-2xl lg:text-4xl lg:mt-4 lg:ml-4 font-bold mb-4">{inputs.name}</h2>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-1/2 lg:p-4 mt-8 lg:mt-4'>
          <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
            <h1 className='text-xl font-semibold mb-2'>Location</h1>
            <p className="text-lg mb-2">{inputs.location}</p>
            <GoogleMap
              lat={inputs.latitude}
              long={inputs.longitude}
              name={inputs.name}
            />
          </div>
          <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
            <h1 className='text-xl font-semibold mb-2'>About {inputs.name}</h1>
            <p className="text-gray-700">{inputs.description}</p>
          </div>
          <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center shadow-md'>
            <h1 className='text-xl font-semibold mb-2'>Amenities</h1>
            <p className="text-gray-700">Parking, Washroom</p>
          </div>
        </div>
        <div className='lg:w-1/2 lg:p-4 mt-8 lg:mt-4'>
          <div className='flex flex-col bg-gray-100 border border-gray-300 p-5 rounded-lg justify-center mb-4 shadow-md'>
            <h1 className='text-xl font-semibold mb-3'>Images</h1>
            <div className="flex flex-row overflow-scroll">
              {inputs.images?.map((image, index) => (
                <div key={index} className="">
                  <img
                    src={image}
                    onClick={() => openImageViewer(index)}
                    className="cursor-pointer"
                    alt={`Image ${index + 1}`}
                    style={{ maxWidth: '200px', height: '150px', margin: "5px" }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='bg-gray-100 flex flex-col border border-gray-300 p-6 rounded-lg justify-center mb-4 shadow-md'>
            <h1 className='text-xl font-semibold mb-2'>Book Ground</h1>
            <form onSubmit={bookGround}>
              <div className="mb-4">
                <label className="block text-md font-semibold mb-2">Select Date:</label>
                <input
                  type="date"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleDateChange}
                  value={selectedDate.toISOString().split('T')[0]}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-md font-semibold mb-2">Select Time Slot:</label>
                <select
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleTimeSlotChange}
                  value={selectedTimeSlot}
                  required
                >
                  <option value="" disabled>Select Time Slot</option>
                  {inputs.availableSlots?.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Book Ground
              </button>
            </form>
          </div>
        </div>
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={inputs.images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
          }}
        />
      )}
    </div>
  );
};

export default GroundDetails;
