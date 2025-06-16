import { Helmet } from 'react-helmet-async';
import { useScrollTop } from '../hooks/useScrollTop';

const Terms: React.FC = () => {
  useScrollTop();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <Helmet>
        <title>TripMaker - Terms & Conditions</title>
        <meta name="description" content="Read TripMaker's terms and conditions." />
      </Helmet>
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Terms & Conditions</h2>
      <div className="space-y-6 text-gray-600">
        <div>
          <h3 className="text-xl font-bold text-gray-800">1. Booking Policy</h3>
          <p>All bookings are subject to availability. Payments are non-refundable unless stated.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">2. Cancellation</h3>
          <p>Cancellation fees may apply based on the provider's policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;