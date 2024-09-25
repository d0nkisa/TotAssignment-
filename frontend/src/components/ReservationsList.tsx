import React, { useState, useEffect } from 'react';
import { getReservations } from '../api/api';

const ReservationList: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reservations, setReservations] = useState([]);

  const handleFetch = async () => {
    const result = await getReservations(startDate, endDate);
    setReservations(result);
  };

  return (
    <div>
      <h2>Reservations</h2>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <button onClick={handleFetch}>Fetch Reservations</button>
      
      <ul>
        {reservations.map((reservation: any) => (
          <li key={reservation.id}>
            User: {reservation.user_id}, Table: {reservation.table_number}, Time: {reservation.reservation_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
