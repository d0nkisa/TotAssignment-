import {errorToast, successToast} from "../utils/toastify";

const API_BASE_URL = 'http://localhost:5000';

export const createUser = async (name: string, email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      errorToast(`Failed to create user: User already exists!`);
    } else {
      successToast(`User ${name} was successfully created!`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    errorToast('An error occurred while creating the user.');
  }
};

export const createReservation = async (userId: number, tableNumber: number, reservationTime: string) => {
  try {
    const reservationDate = new Date(reservationTime);
    const reservationHour = reservationDate.getHours();

    if (reservationHour < 19 || reservationHour >= 23) {
      errorToast('Reservations are only allowed between 19:00 and 23:00.');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: Number(userId),
        tableNumber: Number(tableNumber),
        reservationTime: reservationDate.toISOString(),
      }),
    });


    if (!response.ok) {
      errorToast(`Failed to create reservation: ${response.statusText}`);
    } else {
      successToast(`Reservation for user ${userId} was successfully created for date ${reservationTime}!`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    errorToast('An error occurred while creating the reservation.');
  }
};

export const getReservations = async (startDate: string, endDate: string) => {
  try{
    const response = await fetch(`${API_BASE_URL}/reservations?startDate=${startDate}&endDate=${endDate}`);
    
    if (!response.ok) {
      errorToast(`Failed to get reservations: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    errorToast('An error occurred while getting reservations.');
  }
};
