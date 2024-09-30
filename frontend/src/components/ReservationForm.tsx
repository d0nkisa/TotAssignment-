import React, { useState } from 'react';
import { createReservation } from '../api/api';
import ActionButton from './common/ActionButton';
import { errorToast } from '../utils/toastify';

const ReservationForm: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [reservationTime, setReservationTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !tableNumber || !reservationTime) {
      errorToast("All fields are required!");
      return;
    } else if(Number(userId) <= 0 || (Number(tableNumber) > 5 || Number(tableNumber) <= 0)) {
      errorToast("Invalid data! User ID must be greater than zero and table numbers can vary from 1 to 5!");
      return;
    } else {
      const result = await createReservation(Number(userId), Number(tableNumber), reservationTime);
      console.log(result);
    }
  };

  return (
    <form className='ReservationForm' onSubmit={handleSubmit}>
      <h2>Create Reservation</h2>
      <input type="number" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
      <input type="number" placeholder="Table Number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} required />
      <input type="datetime-local" value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} required />
      <ActionButton action={handleSubmit} buttonText='Create Reservation'/>
    </form>
  );
};

export default ReservationForm;
