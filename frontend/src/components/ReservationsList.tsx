import React, { useState } from 'react';
import { getReservations } from '../api/api';
import ActionButton from './common/ActionButton';

const ReservationList: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reservations, setReservations] = useState([]);

  const handleFetch = async () => {
    const result = await getReservations(startDate, endDate);
    setReservations(result);
  };

  return (
    <form className='UserForm'>
      <h2>Reservations</h2>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <ActionButton action={handleFetch} buttonText='Fetch Reservations'/>
      <div className='table_component'>
        <table>
          <tr>
            <th>User ID</th>
            <th>Table ID</th>
            <th>Reservation Time</th>
          </tr>
          
          {reservations.map((reservation: any) => (
            <tr key={reservation.id}>
              <td>{reservation.user_id}</td>
              <td>{reservation.table_number}</td>
              <td>{reservation.reservation_time}</td>
            </tr>
          ))}
        </table>
      </div>
    </form>
  );
};

export default ReservationList;
