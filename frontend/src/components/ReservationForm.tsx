import React, { useState } from 'react';
import { createReservation } from '../api/api';

const ReservationForm: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [reservationTime, setReservationTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newReservation = await createReservation(Number(userId), Number(tableNumber), reservationTime);
    console.log('Reservation created:', newReservation);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Reservation</h2>
      <input type="number" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      <input type="number" placeholder="Table Number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} required />
      <input type="datetime-local" value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} required />
      <button type="submit">Create Reservation</button>
    </form>
  );
};

export default ReservationForm;
