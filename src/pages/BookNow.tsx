// src/pages/BookNow.tsx
import BookingForm from '../components/BookingForm';

const BookNow = () => {
  return (
    <div className="book-now-page">
      <h1>Book Your Stay</h1>
      <p>Fill out the form below to reserve your room.</p>
      <BookingForm />
    </div>
  );
};

export default BookNow;