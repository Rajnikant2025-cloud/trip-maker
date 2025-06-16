import { useParams } from 'react-router-dom';

const Booking: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();

  // Mock package data (replace with API call in production)
  const packageDetails = {
    id: packageId,
    name: `Package ${packageId}`,
    price: 5000,
    duration: 3,
    starRating: 3,
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Book Your Trip</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">{packageDetails.name}</h3>
        <p className="text-secondary font-bold mt-1">₹{packageDetails.price}</p>
        <p className="text-text-muted">Duration: {packageDetails.duration} days</p>
        <p className="text-text-muted">Rating: {packageDetails.starRating} stars</p>
        <button
          className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-all duration-300"
          onClick={() => alert('Booking confirmed!')}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;