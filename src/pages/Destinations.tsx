import { Helmet } from 'react-helmet-async';
import { useScrollTop } from '../hooks/useScrollTop';
import Card from '../components/ui/Card';
import SidebarFilters from '../components/SidebarFilters';

const Destinations: React.FC = () => {
  useScrollTop();

  const destinations = [
    {
      id: 1,
      imageSources: [
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
        "https://source.unsplash.com/featured/800x600/?paris,eiffel+tower"
      ],
      location: "Paris, France",
      packageName: "Paris Romantic Getaway",
      description: "The city of love awaits you",
      tags: ["Romance", "Culture"],
      duration: "5 Days, 4 Nights",
      groupSize: "2 people",
      reviews: 312,
      price: 1299,
      oldPrice: 1500,
      savings: 201,
      rating: 4.7  // Added rating
    },
    {
      id: 2,
      imageSources: [
        "https://source.unsplash.com/800x600/?bali,beach",
        "https://picsum.photos/id/1018/800/600"
      ],
      location: "Bali, Indonesia",
      packageName: "Bali Paradise Retreat",
      description: "A tropical paradise for relaxation",
      tags: ["Beach", "Adventure"],
      duration: "7 Days, 6 Nights",
      groupSize: "2-4 people",
      reviews: 245,
      price: 899,
      oldPrice: 1200,
      savings: 301,
      rating: 4.8  // Added rating
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Helmet>
        <title>TripMaker - Destinations</title>
        <meta name="description" content="Explore our top travel destinations." />
      </Helmet>

      <h2 className="mb-6 text-3xl font-bold text-gray-800">Our Destinations</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <SidebarFilters />
        </div>

        {/* Destination Cards */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              imageSources={destination.imageSources}
              location={destination.location}
              title={destination.packageName}
              description={destination.description}
              tags={destination.tags}
              duration={destination.duration}
              groupSize={destination.groupSize}
              reviews={destination.reviews}
              price={destination.price}
              oldPrice={destination.oldPrice}
              savings={destination.savings}
              rating={destination.rating}  // Passing rating to Card
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;