import {errorToast} from "../utils/toastify";

const API_BASE_URL = 'http://localhost:5000';

export const createUser = async (name: string, email: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      errorToast(`Failed to create user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    errorToast('An error occurred while creating the user.');
  }
};

export const createReservation = async (userId: number, tableNumber: number, reservationTime: string) => {
  try{
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, tableNumber, reservationTime }),
    });
    
    if (!response.ok) {
      errorToast(`Failed to create user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    errorToast('An error occurred while creating the user.');
  }
};

export const getReservations = async (startDate: string, endDate: string) => {
  try{
    const response = await fetch(`${API_BASE_URL}/reservations?startDate=${startDate}&endDate=${endDate}`);
    
    if (!response.ok) {
      errorToast(`Failed to create user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    errorToast('An error occurred while creating the user.');
  }
};
