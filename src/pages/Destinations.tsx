import { Helmet } from 'react-helmet-async';
import { useScrollTop } from '../hooks/useScrollTop';
import Card from '../components/ui/Card';

const Destinations: React.FC = () => {
  useScrollTop();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <Helmet>
        <title>TripMaker - Destinations</title>
        <meta name="description" content="Explore our top travel destinations." />
      </Helmet>
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Our Destinations</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          image="https://images.unsplash.com/photo-1499856871958-5b962e25677b?auto=format&fit=crop&w=400&q=80"
          title="Paris"
          description="The city of love awaits you."
        />
        <Card
          image="https://images.unsplash.com/photo-1528030137958-3b9e0e7d6e4b?auto=format&fit=crop&w=400&q=80"
          title="Bali"
          description="A tropical paradise for relaxation."
        />
      </div>
    </div>
  );
};

export default Destinations;