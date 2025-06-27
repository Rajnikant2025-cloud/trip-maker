import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useScrollTop } from '../hooks/useScrollTop';
import Card from '../components/ui/Card';
import SidebarFilters, { Filters } from '../components/SidebarFilters';

interface Destination {
  id: number;
  imageSources: string[];
  location: string;
  packageName: string;
  description: string;
  tags: string[];
  duration: string;
  groupSize: string;
  reviews: number;
  price: number;
  oldPrice: number;
  savings: number;
  rating: number;
}

const Destinations: React.FC = () => {
  useScrollTop();

  const [filters, setFilters] = useState<Filters>({
    search: '',
    priceRange: [500, 5000],
    duration: '',
    themes: {
      Beach: false,
      Adventure: false,
      Luxury: false,
      Romance: false
    }
  });

  const destinations: Destination[] = [
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
      rating: 4.7
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
      rating: 4.8
    }
  ];

  const filteredDestinations = useMemo(() => {
    return destinations.filter(destination => {
      // Enhanced search filter
      if (filters.search.trim()) {
        const searchLower = filters.search.toLowerCase().trim();
        const searchTerms = searchLower.split(/\s+/);
        
        // Check if ALL search terms appear in ANY field
        const matchesSearch = searchTerms.every(term => 
          destination.packageName.toLowerCase().includes(term) ||
          destination.location.toLowerCase().includes(term) ||
          destination.description.toLowerCase().includes(term) ||
          destination.tags.some(tag => tag.toLowerCase().includes(term))
        );
        
        if (!matchesSearch) return false;
      }

      // Price filter
      if (destination.price < filters.priceRange[0] || destination.price > filters.priceRange[1]) {
        return false;
      }

      // Duration filter
      if (filters.duration) {
        const daysMatch = destination.duration.match(/\d+/);
        const days = daysMatch ? parseInt(daysMatch[0]) : 0;
        
        if (filters.duration === '1-3' && (days < 1 || days > 3)) return false;
        if (filters.duration === '4-7' && (days < 4 || days > 7)) return false;
        if (filters.duration === '7+' && days <= 7) return false;
      }

      // Theme filter
      const activeThemes = (Object.keys(filters.themes) as Array<keyof typeof filters.themes>)
        .filter(theme => filters.themes[theme])
        .map(theme => theme.toString());
      
      if (activeThemes.length > 0 && 
          !activeThemes.some(theme => destination.tags.includes(theme))) {
        return false;
      }

      return true;
    });
  }, [destinations, filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Helmet>
        <title>TripMaker - Destinations</title>
        <meta name="description" content="Explore our top travel destinations." />
      </Helmet>

      <h2 className="mb-6 text-3xl font-bold text-gray-800">Our Destinations</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <SidebarFilters onFiltersChange={setFilters} />
        </div>

        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map(destination => (
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
                rating={destination.rating}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">
                {filters.search.trim() ? "No matching destinations found" : "No destinations available"}
              </h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;