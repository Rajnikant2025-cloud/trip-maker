import { Helmet } from 'react-helmet-async';
import { useScrollTop } from '../hooks/useScrollTop';

const About: React.FC = () => {
  useScrollTop();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <Helmet>
        <title>TripMaker - About Us</title>
        <meta name="description" content="Learn about TripMaker's mission and team." />
      </Helmet>
      <h2 className="mb-6 text-3xl font-bold text-gray-800">About Us</h2>
      <p className="text-gray-600">
        TripMaker is your trusted travel partner, dedicated to crafting unforgettable experiences. Our team of experts ensures seamless planning and personalized trips.
      </p>
    </div>
  );
};

export default About;