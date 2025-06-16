import { Helmet } from 'react-helmet-async';
import { useScrollTop } from '../hooks/useScrollTop';

const Contact: React.FC = () => {
  useScrollTop();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <Helmet>
        <title>TripMaker - Contact Us</title>
        <meta name="description" content="Get in touch with TripMaker for support." />
      </Helmet>
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Contact Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <p className="text-gray-600">
          <i className="fas fa-envelope text-primary mr-2"></i>
          <strong>Email:</strong> support@tripmaker.com
        </p>
        <p className="text-gray-600">
          <i className="fas fa-phone text-primary mr-2"></i>
          <strong>Phone:</strong> +1-800-TRIP-MKR
        </p>
        <div className="sm:col-span-2">
          <label className="block text-gray-800 font-semibold">Your Message</label>
          <textarea
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
            placeholder="Type your message here..."
          ></textarea>
          <button className="mt-2 bg-primary text-white p-3 rounded hover:bg-indigo-700">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;