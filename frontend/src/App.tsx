import React from 'react';
import UserForm from './components/UserForm';
import ReservationForm from './components/ReservationForm';
import ReservationsList from './components/ReservationsList';
import './styles.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Restaurant Reservation System</h1>
      <UserForm />
      <ReservationForm />
      <ReservationsList />
      <ToastContainer />
    </div>
  );
};

export default App;
