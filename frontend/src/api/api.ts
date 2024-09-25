const API_BASE_URL = 'http://localhost:5000';

export const createUser = async (id: number, name: string, email: string, createdAt: number, updatedAt: number) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, email, createdAt, updatedAt }),
  });
  return response.json();
};

export const createReservation = async (userId: number, tableNumber: number, reservationTime: string) => {
  const response = await fetch(`${API_BASE_URL}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, tableNumber, reservationTime }),
  });
  return response.json();
};

export const getReservations = async (startDate: string, endDate: string) => {
  const response = await fetch(`${API_BASE_URL}/reservations?startDate=${startDate}&endDate=${endDate}`);
  return response.json();
};
