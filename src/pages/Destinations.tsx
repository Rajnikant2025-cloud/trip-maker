import { Helmet } from 'react-helmet-async';
import { useScrollTop } from '../hooks/useScrollTop';
import Card from '../components/ui/Card';

const Destinations: React.FC = () => {
  useScrollTop();

  // Using verified working image URLs with multiple fallbacks
  const destinations = [
    {
      id: 1,
      imageSources: [
        // Primary Paris image (updated URL)
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        // Fallback Paris images
        "https://source.unsplash.com/featured/800x600/?paris,eiffel+tower",
        "https://picsum.photos/id/1005/800/600"
      ],
      title: "Paris",
      description: "The city of love awaits you."
    },
    {
      id: 2,
      imageSources: [
        // Keep the working Bali image
        "https://images.unsplash.com/photo-1528030137958-3b9e0e7d6e4b?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        // Fallback Bali images
        "https://source.unsplash.com/featured/800x600/?bali,beach",
        "https://picsum.photos/id/1018/800/600"
      ],
      title: "Bali",
      description: "A tropical paradise for relaxation."
    }
  ];

  return (
    <div className="mx-auto max-w-6xl p-6">
      <Helmet>
        <title>TripMaker - Destinations</title>
        <meta name="description" content="Explore our top travel destinations." />
      </Helmet>
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Our Destinations</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <Card
            key={destination.id}
            imageSources={destination.imageSources}
            title={destination.title}
            description={destination.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Destinations;