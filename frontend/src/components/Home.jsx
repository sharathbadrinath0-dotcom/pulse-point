import React from 'react';

function Home({ onGoToBookings, isLoggedIn, onLogout }) {
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#f7f5f2', color: '#1a1a1a', minHeight: '100vh' }}>
      <nav style={{ background: '#1a1a1a', padding: '14px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '2px' }}>PULSE<span style={{ color: '#e84444' }}>FIT</span></div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '25px', margin: 0 }}>
          <li style={{ color: '#fff', fontSize: '0.9rem' }}>Home</li>
          <li>
            <button onClick={onGoToBookings} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '0.9rem', cursor: 'pointer' }}>
              My Bookings
            </button>
          </li>
        </ul>

        {isLoggedIn ? (
          <button onClick={onLogout} style={{ background: '#e84444', color: '#fff', border: 'none', padding: '8px 18px', fontSize: '0.82rem', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <button onClick={onGoToBookings} style={{ background: '#e84444', color: '#fff', border: 'none', padding: '8px 18px', fontSize: '0.82rem', cursor: 'pointer' }}>
            Book a Class
          </button>
        )}
      </nav>

      <section style={{ background: '#1a1a1a', color: '#fff', textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px', lineHeight: 1.15 }}>
          Train Hard.<br /><span style={{ color: '#e84444' }}>Book Smart.</span>
        </h1>
        <p style={{ color: '#999', fontSize: '1.1rem', marginBottom: '40px' }}>
          Over 40 classes a week. Expert trainers. Real results.<br />
          Reserve your spot in seconds.
        </p>
        <button 
          onClick={onGoToBookings}
          style={{ background: '#e84444', color: '#fff', border: 'none', padding: '16px 40px', fontSize: '1.1rem', cursor: 'pointer' }}>
          Book a Class
        </button>
      </section>

      <section style={{ padding: '60px 40px', background: '#fff' }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '3px', color: '#e84444' }}>Why choose us</p>
        <h2>Everything you need</h2>
        <div style={{ width: '50px', height: '3px', background: '#e84444', margin: '20px 0' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <div style={{ background: '#fff', border: '1px solid #e0dbd4', padding: '24px' }}><h3>40+ Weekly Classes</h3><p>HIIT, Strength, Yoga &amp; more.</p></div>
          <div style={{ background: '#fff', border: '1px solid #e0dbd4', padding: '24px' }}><h3>Expert Trainers</h3><p>Certified professionals.</p></div>
          <div style={{ background: '#fff', border: '1px solid #e0dbd4', padding: '24px' }}><h3>Easy Online Booking</h3><p>Reserve in seconds.</p></div>
        </div>
      </section>

      <footer style={{ background: '#1a1a1a', color: '#777', textAlign: 'center', padding: '32px 20px', fontSize: '0.85rem' }}>
        <p>123 Queen St, Brisbane • hello@pulsefit.com.au • +61 7 3000 1234</p>
        <p style={{ marginTop: '8px' }}>&copy; 2026 <span style={{ color: '#e84444' }}>PulseFit</span>. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;