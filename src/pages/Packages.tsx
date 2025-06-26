// src/pages/Packages.tsx
import { Helmet } from 'react-helmet-async';
import { useScrollTop } from '../hooks/useScrollTop';
import Card from '../components/ui/Card';

const Packages: React.FC = () => {
  useScrollTop();

  const packages = [
    {
      id: 1,
    imageSources: [
      "https://images.unsplash.com/photo-1499856871958-5b962e25677b?ixlib=rb-4.0.3&w=800&h=600&fit=crop", 
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&w=800&h=600&fit=crop",
      "https://source.unsplash.com/featured/800x600/?paris,eiffel+tower"
    ],
      location: "Paris, France",
      packageName: "Paris Getaway",
      description: "Experience the romantic charm of Paris with iconic landmarks",
      tags: ["Romance", "Culture"],
      duration: "5 Days, 4 Nights",
      groupSize: "2 people",
      reviews: 128,
      price: 1200,
      oldPrice: 1500,
      savings: 300,
      rating: 4.7
    },
    {
      id: 2,
      imageSources: [
        "https://source.unsplash.com/800x600/?bali,beach",
        "https://picsum.photos/id/1018/800/600"
      ],
      location: "Bali, Indonesia",
      packageName: "Bali Retreat",
      description: "Relax on pristine beaches and explore ancient temples",
      tags: ["Beach", "Wellness"],
      duration: "7 Days, 6 Nights",
      groupSize: "2-4 people",
      reviews: 245,
      price: 1500,
      oldPrice: 1800,
      savings: 300,
      rating: 4.8
    }
  ];

  return (
    <div className="mx-auto max-w-6xl p-6">
      <Helmet>
        <title>TripMaker - Packages</title>
        <meta name="description" content="Discover our exclusive travel packages." />
      </Helmet>
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Travel Packages</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            imageSources={pkg.imageSources}
            location={pkg.location}
            title={pkg.packageName}
            description={pkg.description}
            tags={pkg.tags}
            duration={pkg.duration}
            groupSize={pkg.groupSize}
            reviews={pkg.reviews}
            price={pkg.price}
            oldPrice={pkg.oldPrice}
            savings={pkg.savings}
            rating={pkg.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Packages;