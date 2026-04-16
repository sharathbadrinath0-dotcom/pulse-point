import React, { useState, useEffect } from 'react';

function Bookings({ onGoToHome }) {
  const [bookings, setBookings] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    classId: '',
    membership: 'Monthly ($89/month)',
    status: 'Confirmed'
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const TEMP_USER_ID = '67f8a1b2c3d4e5f6g7h8i9j0';

  // Fetch classes and bookings
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
      fname: b.fname || '',
      lname: b.lname || '',
      email: b.email || '',
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
    setFormData({
      fname: '',
      lname: '',
      email: '',
      classId: '',
      membership: 'Monthly ($89/month)',
      status: 'Confirmed'
    });
    setEditingId(null);
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#f7f5f2', color: '#1a1a1a', minHeight: '100vh' }}>
      <nav style={{ background: '#1a1a1a', padding: '14px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '2px' }}>PULSE<span style={{ color: '#e84444' }}>FIT</span></div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '25px', margin: 0 }}>
          <li><button onClick={onGoToHome} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '0.9rem', cursor: 'pointer' }}>← Home</button></li>
          <li style={{ color: '#fff', fontSize: '0.9rem' }}>My Bookings</li>
        </ul>
      </nav>

      <div style={{ background: '#1a1a1a', color: '#fff', padding: '50px 40px' }}>
        <p style={{ color: '#e84444', fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Manage bookings</p>
        <h1 style={{ fontSize: '2.2rem' }}>Class Bookings</h1>
      </div>

      <section style={{ padding: '60px 40px', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '32px' }}>

          {/* Form */}
          <div style={{ background: '#fff', border: '1px solid #e0dbd4', padding: '28px' }}>
            <h3>{editingId ? 'Edit Booking' : 'Add New Booking'}</h3>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', marginBottom: '6px' }}>First name</label>
              <input type="text" value={formData.fname} onChange={e => setFormData({...formData, fname: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }} />
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', marginBottom: '6px' }}>Last name</label>
              <input type="text" value={formData.lname} onChange={e => setFormData({...formData, lname: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }} />
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', marginBottom: '6px' }}>Email address</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }} />
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', marginBottom: '6px' }}>Class</label>
              <select value={formData.classId} onChange={e => setFormData({...formData, classId: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}>
                <option value="">-- Choose a class --</option>
                {classes.map(cls => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name} — {cls.instructor}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', marginBottom: '6px' }}>Membership type</label>
              <select value={formData.membership} onChange={e => setFormData({...formData, membership: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}>
                <option>Casual ($22)</option>
                <option>Monthly ($89/month)</option>
                <option>Premium ($149/month)</option>
              </select>
            </div>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', marginBottom: '6px' }}>Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={saveBooking} style={{ flex: 1, background: '#e84444', color: '#fff', border: 'none', padding: '14px', cursor: 'pointer' }}>
                {editingId ? 'Save Changes' : 'Add Booking'}
              </button>
              {editingId && <button onClick={resetForm} style={{ flex: 1, background: 'transparent', border: '1px solid #1a1a1a', padding: '14px', cursor: 'pointer' }}>Cancel</button>}
            </div>
          </div>

          {/* Table */}
          <div style={{ background: '#fff', border: '1px solid #e0dbd4', padding: '28px' }}>
            <h3>All Bookings</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#1a1a1a', color: '#fff' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>#</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Class</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '11px' }}>{i + 1}</td>
                    <td style={{ padding: '11px' }}><strong>{b.fname || ''} {b.lname || ''}</strong><br /><span style={{ fontSize: '0.78rem', color: '#888' }}>{b.email || ''}</span></td>
                    <td style={{ padding: '11px' }}>{b.class?.name || b.className || ''}</td>
                    <td style={{ padding: '11px' }}>
                      <span style={{ padding: '3px 9px', fontSize: '0.68rem', background: b.status === 'Confirmed' ? '#eaf6ea' : '#fef0f0', color: b.status === 'Confirmed' ? '#1a5c1a' : '#a32d2d', borderRadius: '3px' }}>
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: '11px' }}>
                      <button onClick={() => editBooking(b)} style={{ background: '#1a1a1a', color: '#fff', border: 'none', padding: '5px 12px', marginRight: '6px', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => deleteBooking(b._id)} style={{ background: 'transparent', color: '#e84444', border: '1px solid #e84444', padding: '5px 12px', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {message && <div style={{ position: 'fixed', bottom: '30px', right: '30px', background: '#1a5c1a', color: '#fff', padding: '12px 24px', borderRadius: '4px' }}>{message}</div>}
    </div>
  );
}

export default Bookings;