import React, { useState } from 'react';
import { createUser } from '../api/api';
import ActionButton from './common/ActionButton';

const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      await createUser(name, email);
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
