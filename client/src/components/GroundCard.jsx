import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';



const GroundCard = ({ id, name, location, price, image }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-gray-700 w-80 p-4 shadow-md rounded-sm">
            <img src={image} alt={name} className="w-full h-40 object-cover mb-4" />
            <h3 className="text-xl text-white font-bold mb-2">{name}</h3>
            <p className="text-white mb-2 font-semibold">{location}</p>
            <p className="text-white mb-2 font-bold">₹ <span className='font-normal'>{price}/hr</span></p>
            <button
                onClick={() => {
                    navigate(`/ground/${id}`);
                }}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg">
                View
            </button>
        </div>
    );
};

export default GroundCard;




export const BookingCard = ({ id, user, ground, date, time }) => {
    return (
        <div className="bg-gray-700 w-80 p-4 shadow-md rounded-md">
            <h3 className="text-white text-xl font-bold mb-2">{ground}</h3>
            <p className="text-white mb-2 font-semibold">Date: {date}</p>
            <p className="text-white mb-2 font-semibold">Time: {time}</p>
            {/* <p className="text-gray-700 mb-2 font-bold">₹ <span className='font-normal'>{price}</span></p> */}
            {/* <button
                onClick={() => {
                    navigate(`/ground/${id}`);
                }}
                className="bg-green-700 text-white px-4 py-2 rounded-full">
                View
            </button> */}
        </div>
    )
}



// export const BookingCard = ({ id, ground, date, time, onDelete }) => {
//     return (
//         <div className="bg-gray-700 w-80 p-4 shadow-md rounded-md">
//             <h3 className="text-white text-xl font-bold mb-2">{ground}</h3>
//             <p className="text-white mb-2 font-semibold">Date: {date}</p>
//             <p className="text-white mb-2 font-semibold">Time: {time}</p>
//             <button onClick={() => handleDeleteBooking(booking._id)} className="bg-red-700 text-white px-4 py-2 rounded-full">
//                 Delete
//             </button>
//         </div>
//     )
// }

// const handleDeleteBooking = async (bookingId) => {
//     try {
//         const { data } = await axios.delete(`${BASE_URL}/api/v1/admin/delete-booking/${bookingId}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             }
//         });
//         if (data.success) {
//             // Update state or perform any necessary actions after deletion
//             // For example, fetch updated bookings
//             getBookings();
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };



// export const BookingCard = ({ id, ground, date, time, onDelete }) => {
//     const navigate = useNavigate();
//     const token = localStorage.getItem('token');
//     const email = localStorage.getItem('email');
//     const user = localStorage.getItem('username');

//     const handleDeleteBooking = async (id) => {
//         try {
//             const { data } = await axios.delete(`${BASE_URL}/api/v1/user/delete-booking/${id}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 }
//             });
//             if (data.success) {
//                 onDelete(); // Call onDelete function passed as prop to update state or perform actions
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div className="bg-gray-700 w-80 p-4 shadow-md rounded-md">
//             <h3 className="text-white text-xl font-bold mb-2">{ground}</h3>
//             <p className="text-white mb-2 font-semibold">Date: {date}</p>
//             <p className="text-white mb-2 font-semibold">Time: {time}</p>
//             <button onClick={() => handleDeleteBooking(id)} className="bg-red-700 text-white px-4 py-2 rounded-full">
//                 Delete
//             </button>
//         </div>
//     )
// };
