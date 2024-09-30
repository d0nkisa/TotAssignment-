import React, { useState } from 'react';
import { createUser } from '../api/api';
import ActionButton from './common/ActionButton';
import { errorToast } from '../utils/toastify';

const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const isValidEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };
      
      if (!name || !email) {
        errorToast("All fields are required!");
        return;
      } else if (!isValidEmail(email)) {
        errorToast('Please enter a valid email address');
        return;
      } else {
        await createUser(name, email);
        setName('');
        setEmail('');
      }
  };

  return (
    <form className='UserForm' onSubmit={handleSubmit}>
      <h2>Create User</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <ActionButton action={handleSubmit} buttonText='Create User'/>
    </form>
  );
};

export default UserForm;
