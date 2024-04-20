// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/database';
// import './UpdatedBooking.css'

// const UpdatedBooking = () => {
//   // State to store fetched bookings
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     // Fetch updated bookings data
//     const fetchUpdatedBookings = async () => {
//       try {
//         const db = firebase.database();
//         const updatedBookingsRef = db.ref('completed-bookings');

//         // Listen for data changes
//         updatedBookingsRef.on('value', (snapshot) => {
//           const data = snapshot.val();
//           if (data) {
//             // Convert data object to an array
//             const updatedBookingsArray = Object.keys(data).map((key) => ({
//               id: key,
//               ...data[key],
//             }));
//             // Update state with fetched data
//             setBookings(updatedBookingsArray);
//           } else {
//             // If no data found, set bookings to an empty array
//             setBookings([]);
//           }
//         });
//       } catch (error) {
//         console.error('Error fetching updated bookings:', error);
//       }
//     };

//     // Call fetch function
//     fetchUpdatedBookings();

//     // Clean up Firebase listener
//     return () => {
//       firebase.database().ref('completed-bookings').off('value');
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Updated Bookings</h2>
//       <ul>
//         {bookings.map((booking) => (
//           <li key={booking.id}>
//             <p>Booking ID: {booking.id}</p>
//             {/* Render other booking details here */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UpdatedBooking;
