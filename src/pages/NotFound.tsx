import { Helmet } from 'react-helmet-async';
import { useScrollTop } from '../hooks/useScrollTop';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  useScrollTop();

  return (
    <div className="mx-auto max-w-6xl p-6 text-center">
      <Helmet>
        <title>TripMaker - Page Not Found</title>
        <meta name="description" content="Page not found on TripMaker." />
      </Helmet>
      <h2 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h2>
      <p className="mt-4 text-gray-600">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block bg-primary text-white p-3 rounded hover:bg-indigo-700">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;