import React, { useState } from 'react';
import { createUser } from '../api/api';

const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await createUser(10, name, email, Date.now(), Date.now());
    console.log('User created:', newUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
