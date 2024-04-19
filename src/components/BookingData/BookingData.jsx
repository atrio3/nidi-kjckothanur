import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';
import './BookingData.css'; 

const BookingData = () => {
    const [tableData, setTableData] = useState([]);
    const [filterLocation, setFilterLocation] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const dbRef = ref(database);

        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const userDetailsArray = Object.entries(data.UserDetails || {}).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                setTableData(userDetailsArray);
            }
        });
    }, []);

    useEffect(() => {
        if (filterLocation !== '') {
            const filtered = tableData.filter(user => user.userLocation === filterLocation);
            setFilteredData(filtered);
        } else {
            setFilteredData(tableData);
        }
    }, [filterLocation, tableData]);

    useEffect(() => {
        if (searchQuery !== '') {
            const filtered = tableData.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredData(filtered);
        } else {
            setFilteredData(tableData);
        }
    }, [searchQuery, tableData]);

    const getUniqueLocations = () => {
        const uniqueLocations = new Set(); 
        tableData.forEach(user => uniqueLocations.add(user.userLocation));
        return Array.from(uniqueLocations);
    };

    const formatTime = (timeString) => {
        const timeParts = timeString.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        
        let amOrPm = 'AM';
        let formattedHours = hours;
        
        if (hours >= 12) {
            amOrPm = 'PM';
            formattedHours = hours === 12 ? 12 : hours - 12;
        }
        
        return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    return (
        <div className="booking-data-container">
            <h2 className="booking-data-title">Booking Data:</h2>
            <div className="filter-container">
                <label htmlFor="locationFilter">Filter by Location:</label>
                <select id="locationFilter" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
                    <option value="">Select Location</option>
                    {getUniqueLocations().map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
                <div className="search-container">
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by Name" />
                    <button onClick={() => setSearchQuery('')}>
                        Search
                    </button>
                </div>
            </div>
            <table className="booking-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Location-Selected</th>
                        <th>Phone No.</th>
                        <th>Driving ID</th>
                        <th>Selected Vehicle</th>
                        <th>Vehicle Price</th>
                        <th>Vehicle Category</th>
                        <th>Pickup Date</th>
                        <th>Drop-off Date</th>
                        <th>Time</th>
                        <th>Total Paid Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((userDetails, index) => (
                        <tr key={userDetails.id}>
                            <td>{index + 1}</td>
                            <td>{userDetails.name}</td>
                            <td>{userDetails.email}</td>
                            <td>{userDetails.address}</td>
                            <td>{userDetails.userLocation}</td>
                            <td>{userDetails.tel}</td>
                            <td>{userDetails.drivingID}</td>
                            <td>{userDetails.vehicle_name}</td>
                            <td>₹{userDetails.vehicle_price}</td>
                            <td>{userDetails.vehicle_category}</td>
                            <td>{formatDate(userDetails.pickUpDate)}</td>
                            <td>{formatDate(userDetails.dropOffDate)}</td>
                            <td>{formatTime(userDetails.time)}</td>
                            <td>₹{userDetails.rentAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookingData;
