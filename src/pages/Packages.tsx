import { Helmet } from 'react-helmet-async';
import { useScrollTop } from '../hooks/useScrollTop';
import Card from '../components/ui/Card';

const Packages: React.FC = () => {
  useScrollTop();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <Helmet>
        <title>TripMaker - Packages</title>
        <meta name="description" content="Discover our exclusive travel packages." />
      </Helmet>
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Travel Packages</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
       <Card
  imageSources={[
    "https://images.unsplash.com/photo-1499856871958-5b962e25677b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
    "https://source.unsplash.com/featured/800x600/?paris,eiffel+tower",
    "https://picsum.photos/id/1005/800/600"
  ]}
  title="Paris Getaway"
  description="$1200 - 5 days, 4 nights."
  action={{ label: 'Book Now', onClick: () => alert('Booking Paris Getaway') }}
/>

       <Card
  imageSources={[
    "https://images.unsplash.com/photo-1528030137958-3b9e0e7d6e4b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
    "https://source.unsplash.com/featured/800x600/?bali,beach",
    "https://picsum.photos/id/1018/800/600"
  ]}
  title="Bali Retreat"
  description="$1500 - 7 days, 6 nights."
  action={{ label: 'Book Now', onClick: () => alert('Booking Bali Retreat') }}
/>
      </div>
    </div>
  );
};

export default Packages;