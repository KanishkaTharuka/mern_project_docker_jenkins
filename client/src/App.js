import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', age: '' });

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    window.location.reload();
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder='Name' onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder='Age' type='number' onChange={e => setForm({ ...form, age: e.target.value })} />
        <button type='submit'>Add</button>
      </form>

      <h2>Users</h2>
      <ul>
        {users.map((u, i) => <li key={i}>{u.name} ({u.age})</li>)}
      </ul>
    </div>
  );
}

export default App;
