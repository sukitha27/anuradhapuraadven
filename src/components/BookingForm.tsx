import React, { useState } from 'react';
import { send } from '@emailjs/browser';
import './BookingForm.css'; // Import the CSS file

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'standard',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    send(
      'service_i9tvkwk',
      'template_j6hwzvr',
      {
        ...formData,
        to_email: 'info@anuradhapurahomestay.com'
      },
      '-O6hkDshkSmTs6Nfe'
    )
      .then(() => {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          guests: 1,
          roomType: 'standard',
        });
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
        alert('Booking failed. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      {submitSuccess && (
        <div className="success-message">
          Booking request sent successfully! We'll contact you shortly.
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="checkIn">Check-In Date</label>
          <input
            id="checkIn"
            type="date"
            value={formData.checkIn}
            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="checkOut">Check-Out Date</label>
          <input
            id="checkOut"
            type="date"
            value={formData.checkOut}
            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <select
            id="guests"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="roomType">Room Type</label>
          <select
            id="roomType"
            value={formData.roomType}
            onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
          >
            <option value="standard">Standard Room</option>
            <option value="deluxe">Deluxe Room</option>
            <option value="family">Family Suite</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Book Now'}
      </button>
    </form>
  );
};

export default BookingForm;