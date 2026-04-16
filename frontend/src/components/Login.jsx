import React, { useState } from 'react';

function Login({ onLoginSuccess, onGoToHome }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister 
      ? 'http://3.107.84.104/api/auth/register' 
      : 'http://3.107.84.104/api/auth/login';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage(isRegister ? '✅ Account created! Logging in...' : '✅ Login successful!');
        setTimeout(() => onLoginSuccess(), 800);
      } else {
        setMessage('❌ ' + (data.message || 'Invalid credentials'));
      }
    } catch (err) {
      setMessage('❌ Connection error');
    }
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#f7f5f2', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', border: '1px solid #e0dbd4', padding: '40px', width: '420px', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{isRegister ? 'Create Account' : 'Login to PulseFit'}</h2>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', marginBottom: '6px' }}>Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} required />
            </div>
          )}

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', marginBottom: '6px' }}>Email</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} required />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 'bold', marginBottom: '6px' }}>Password</label>
            <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} required />
          </div>

          <button type="submit" style={{ width: '100%', background: '#e84444', color: '#fff', border: 'none', padding: '14px', fontSize: '1rem', cursor: 'pointer', marginBottom: '15px' }}>
            {isRegister ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginBottom: '15px' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsRegister(!isRegister)} style={{ color: '#e84444', background: 'none', border: 'none', cursor: 'pointer' }}>
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>

        <button onClick={onGoToHome} style={{ width: '100%', background: 'transparent', border: '1px solid #1a1a1a', padding: '12px', cursor: 'pointer' }}>
          ← Back to Home
        </button>

        {message && <p style={{ textAlign: 'center', marginTop: '15px', color: message.includes('✅') ? '#1a5c1a' : '#e84444' }}>{message}</p>}
      </div>
    </div>
  );
}

export default Login;