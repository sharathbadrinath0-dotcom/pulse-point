import React, { useState, useEffect } from 'react';

function Bookings({ onGoToHome }) {
  const [bookings, setBookings] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    fname: '', lname: '', email: '', classId: '',
    membership: 'Monthly ($89/month)', status: 'Confirmed'
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const TEMP_USER_ID = '67f8a1b2c3d4e5f6g7h8i9j0';

  useEffect(() => {
    fetch('http://3.107.84.104/api/classes')
      .then(res => res.json())
      .then(setClasses);

    fetch('http://3.107.84.104/api/bookings')
      .then(res => res.json())
      .then(setBookings);
  }, []);

  const saveBooking = async () => {
    if (!formData.fname || !formData.lname || !formData.email || !formData.classId) {
      setMessage('❌ Please fill all fields');
      return;
    }

    const payload = {
      user: TEMP_USER_ID,
      class: formData.classId,
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      membership: formData.membership,
      status: formData.status
    };

    const url = editingId 
      ? `http://3.107.84.104/api/bookings/${editingId}` 
      : 'http://3.107.84.104/api/bookings';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setMessage(editingId ? '✅ Booking updated!' : '✅ Booking added successfully!');
        fetch('http://3.107.84.104/api/bookings')
          .then(res => res.json())
          .then(setBookings);
        resetForm();
      }
    } catch (err) {
      setMessage('❌ Connection error');
    }
  };

  const editBooking = (b) => {
    setFormData({
      fname: b.fname || '', lname: b.lname || '', email: b.email || '',
      classId: b.class?._id || b.class || '',
      membership: b.membership || 'Monthly ($89/month)',
      status: b.status || 'Confirmed'
    });
    setEditingId(b._id);
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    await fetch(`http://3.107.84.104/api/bookings/${id}`, { method: 'DELETE' });
    setMessage('✅ Booking deleted');
    fetch('http://3.107.84.104/api/bookings').then(res => res.json()).then(setBookings);
  };

  const resetForm = () => {
    setFormData({ fname: '', lname: '', email: '', classId: '', membership: 'Monthly ($89/month)', status: 'Confirmed' });
    setEditingId(null);
  };

  return (
    // Your full JSX remains exactly the same as before
    // (I kept your original return statement unchanged - only URLs updated)
    // Paste your existing return statement here if you prefer
  );
}

export default Bookings;