import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/helper';
import { useNavigate, useParams } from 'react-router-dom';
import Switch from 'react-switch';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const UpdateGround = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');

    const [inputs, setInputs] = useState({});
    const [ground, setGround] = useState({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    }

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    }

    const handleSwitchChange = () => {
        setInputs(prevState => ({
            ...prevState,
            published: !prevState.published
        }));
    }

    const getGroundDetails = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/admin/fetch-ground/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (data?.success) {
                const fetchedGround = data?.ground;
                setGround(fetchedGround);
                setInputs({
                    ground_name: fetchedGround.ground_name,
                    location: fetchedGround.location,
                    description: fetchedGround.description,
                    price: fetchedGround.price,
                    published: fetchedGround.published,
                    availableSlots: fetchedGround.availableSlots.join(', '), // Convert array to string
                    images: fetchedGround.images.join(', '), // Convert array to string
                    latitude: fetchedGround.coordinates.latitude,
                    longitude: fetchedGround.coordinates.longitude,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGroundDetails();
    }, []);

    const handleInputChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.ground_name || !inputs.description || !inputs.price || !inputs.location) {
            toast.error("Fields cannot be empty");
            return;
        }

        try {
            const formData = {
                ground_name: inputs.ground_name,
                description: inputs.description,
                price: inputs.price,
                location: inputs.location,
                published: inputs.published,
                coordinates: {
                    latitude: inputs.latitude,
                    longitude: inputs.longitude
                },
                images: inputs.images.split(',').map(url => url.trim()), // Convert string to array
                availableSlots: inputs.availableSlots.split(',').map(timeslot => timeslot.trim()) // Convert string to array
            };

            const { data } = await axios.put(`${BASE_URL}/api/v1/admin/update-ground/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (data.success) {
                toast.success("Ground updated");
                navigate(`/ground/${id}`);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Check log.");
        }
    }

    const handleConfirmDelete = async () => {
        try {
            const { data } = await axios.delete(`${BASE_URL}/api/v1/admin/delete-ground/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (data?.success) {
                toast.success("Ground deleted");
                navigate('/all-grounds');
            } else {
                toast.error("Failed to delete ground");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete ground");
        }
        setIsDeleteModalOpen(false);
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Edit Turf</h2>
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
                    <label className="block text-gray-700 mb-2">Map Coordinates</label>
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
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded-full"
                    >
                        Update Turf
                    </button>
                    <button
                        type="button"
                        className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-full"
                        onClick={handleDeleteClick}
                    >
                        Delete Turf
                    </button>
                </div>
            </form>
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}

export default UpdateGround;




// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Switch from 'react-switch';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateGround, deleteGround  } from '../redux/slices/groundsSlice';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { BASE_URL } from '../utils/helper';


// const UpdateGround = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { loading, error } = useSelector(state => state.ground);

//     const [inputs, setInputs] = useState({
//         ground_name: "",
//         location: "",
//         description: "",
//         price: "",
//         published: false,
//         images: "",
//         availableSlots: "",
//         coordinates: {
//             latitude: "",
//             longitude: "",
//         },
//     });

//     useEffect(() => {
//         // Fetch existing ground data
//         axios.get(`${BASE_URL}/api/v1/admin/fetch-ground/${id}`)
//             .then(response => {
//                 const ground = response.data.ground;
//                 setInputs({
//                     ground_name: ground.ground_name,
//                     location: ground.location,
//                     description: ground.description,
//                     price: ground.price,
//                     published: ground.published,
//                     images: ground.images.join(', '),
//                     availableSlots: ground.availableSlots.join(', '),
//                     coordinates: {
//                         latitude: ground.coordinates.latitude,
//                         longitude: ground.coordinates.longitude,
//                     },
//                 });
//             })
//             // .catch((err) => {
//             //     console.error(err);
//             // });
//     }, [id]);

//     const handleSwitchChange = () => {
//         setInputs(prevState => ({
//             ...prevState,
//             published: !prevState.published
//         }));
//     };

//     const handleInputChange = (e) => {
//         setInputs(prevState => ({
//             ...prevState,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(updateGround({ id, inputs })).unwrap()
//             .then(() => {
//                 navigate('/grounds');
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     };
//     const handleDeleteClick = () => {
//         setIsDeleteModalOpen(true);
//     };

//     const handleCancelDelete = () => {
//         setIsDeleteModalOpen(false);
//     };

//     const handleConfirmDelete = () => {
//         dispatch(deleteGround(id)).unwrap()
//             .then(() => {
//                 navigate('/grounds');
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     };

//     return (
//         <div className="p-8">
//             <h2 className="text-2xl font-bold mb-4">Edit Turf</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Turf Name*</label>
//                     <input
//                         type="text"
//                         name="ground_name"
//                         value={inputs.ground_name}
//                         onChange={handleInputChange}
//                         className="w-full border border-gray-300 rounded px-4 py-2"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Location*</label>
//                     <input
//                         type="text"
//                         name="location"
//                         value={inputs.location}
//                         onChange={handleInputChange}
//                         className="w-full border border-gray-300 rounded px-4 py-2"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Map Coordinates</label>
//                     <input
//                         type="text"
//                         name="latitude"
//                         placeholder='Enter Latitude'
//                         value={inputs.latitude}
//                         onChange={handleInputChange}
//                         className="w-1/2 border border-gray-300 rounded px-4 py-2"
//                     />
//                     <input
//                         type="text"
//                         name="longitude"
//                         placeholder='Enter Longitude'
//                         value={inputs.longitude}
//                         onChange={handleInputChange}
//                         className="w-1/2 border border-gray-300 rounded px-4 py-2"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Description*</label>
//                     <textarea
//                         name="description"
//                         value={inputs.description}
//                         onChange={handleInputChange}
//                         className="w-full border border-gray-300 rounded px-4 py-2 h-32"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Price*</label>
//                     <input
//                         type="text"
//                         name="price"
//                         value={inputs.price}
//                         onChange={handleInputChange}
//                         className="w-full border border-gray-300 rounded px-4 py-2"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Published</label>
//                     <Switch
//                         onChange={handleSwitchChange}
//                         checked={inputs.published}
//                         onColor="#6fd26f"
//                         onHandleColor="#1ea624"
//                         handleDiameter={30}
//                         uncheckedIcon={false}
//                         checkedIcon={false}
//                         boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
//                         activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
//                         height={20}
//                         width={48}
//                         className="react-switch"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Time Slots*</label>
//                     <textarea
//                         placeholder='Enter time slots (7:00 PM, 8:00 PM...) separated by comma'
//                         name='availableSlots'
//                         value={inputs.availableSlots}
//                         onChange={handleInputChange}
//                         className="w-full border border-gray-300 rounded px-4 py-2 h-32"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Images</label>
//                     <textarea
//                         placeholder='Enter links separated by comma'
//                         name='images'
//                         value={inputs.images}
//                         onChange={handleInputChange}
//                         className="w-full border border-gray-300 rounded px-4 py-2 h-32"
//                     />
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <button
//                         type="submit"
//                         className="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded-full"
//                     >
//                         Update Turf
//                     </button>
//                     <button
//                         type="button"
//                         className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-full"
//                         onClick={handleDeleteClick}
//                     >
//                         Delete Turf
//                     </button>
//                 </div>
//             </form>
//             {/* <DeleteConfirmationModal
//                 isOpen={isDeleteModalOpen}
//                 onCancel={handleCancelDelete}
//                 onConfirm={handleConfirmDelete}
//             /> */}
//         </div>
//     )
// };

// export default UpdateGround;
