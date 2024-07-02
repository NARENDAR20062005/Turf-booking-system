
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Switch from 'react-switch';
import { useDispatch, useSelector } from 'react-redux';
import { createGround } from '../redux/slices/groundsSlice';
import toast from 'react-hot-toast';

const CreateGround = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.ground);

    const [inputs, setInputs] = useState({
        ground_name: "",
        location: "",
        description: "",
        price: "",
        published: false,
        images: [],
        availableSlots: [],
        coordinates: {
            latitude: "",
            longitude: "",
        },
    });

    const handleSwitchChange = () => {
        setInputs(prevState => ({
            ...prevState,
            published: !prevState.published
        }));
    };

    const handleInputChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputs.ground_name || !inputs.description || !inputs.price || !inputs.location) {
            toast.error("Fields cannot be empty");
            return;
        }

        dispatch(createGround(inputs)).unwrap()
            .then(() => {
                navigate('/grounds');
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Create Turf</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Turf Name*</label>
                            <input
                                type="text"
                                name="ground_name"
                                value={inputs.ground_name}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Location*</label>
                            <input
                                type="text"
                                name="location"
                                value={inputs.location}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Map Co-ordinates</label>
                            <input
                                type="text"
                                name="latitude"
                                placeholder='Enter Latitude'
                                value={inputs.latitude}
                                onChange={handleInputChange}
                                className="w-1/2 border border-gray-300 rounded px-4 py-2"
                            />
                            <input
                                type="text"
                                name="longitude"
                                placeholder='Enter Longitude'
                                value={inputs.longitude}
                                onChange={handleInputChange}
                                className="w-1/2 border border-gray-300 rounded px-4 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Description*</label>
                            <textarea
                                name="description"
                                value={inputs.description}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-4 py-2 h-32"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Price*</label>
                            <input
                                type="text"
                                name="price"
                                value={inputs.price}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Published</label>
                            <Switch
                                onChange={handleSwitchChange}
                                checked={inputs.published}
                                onColor="#6fd26f"
                                onHandleColor="#1ea624"
                                handleDiameter={30}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={20}
                                width={48}
                                className="react-switch"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Time Slots*</label>
                            <textarea
                                placeholder='Enter time slots (7:00 PM, 8:00 PM...) separated by comma'
                                name='availableSlots'
                                value={inputs.availableSlots}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-4 py-2 h-32"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Images</label>
                            <textarea
                                placeholder='Enter links separated by comma'
                                name='images'
                                value={inputs.images}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-4 py-2 h-32"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded-full"
                        >
                            Create Turf
                        </button>
                    </form>
                </div>
            )
    
};

export default CreateGround;
