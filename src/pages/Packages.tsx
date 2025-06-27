// src/pages/Packages.tsx
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useScrollTop } from '../hooks/useScrollTop';
import Card from '../components/ui/Card';
import SidebarFilters from '../components/SidebarFilters';

interface Package {
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

const Packages: React.FC = () => {
  useScrollTop();
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);

  const packages: Package[] = [
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
},
    {
  id: 3,
  imageSources: [
    "https://images.unsplash.com/photo-1549887534-679c2923d1d4?ixlib=rb-4.0.3&w=800&h=600&fit=crop", // ✅ Working image of Rome
    "https://source.unsplash.com/800x600/?italy",
    "https://picsum.photos/id/1040/800/600"
  ],
  location: "Rome, Italy",
  packageName: "Roman Holiday",
  description: "Discover ancient history and delicious cuisine",
  tags: ["Culture", "History"],
  duration: "4 Days, 3 Nights",
  groupSize: "2 people",
  reviews: 187,
  price: 1100,
  oldPrice: 1350,
  savings: 250,
  rating: 4.6
}
  ];

  const handleFiltersChange = (filters: any) => {
    const filtered = packages.filter(pkg => {
      // Search filter
      if (filters.search && 
          !pkg.packageName.toLowerCase().includes(filters.search.toLowerCase()) && 
          !pkg.location.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Price range filter
      if (pkg.price < filters.priceRange[0] || pkg.price > filters.priceRange[1]) {
        return false;
      }
      
      // Duration filter
      if (filters.duration) {
        const durationDays = parseInt(pkg.duration);
        if (filters.duration === '1-3' && durationDays > 3) return false;
        if (filters.duration === '4-7' && (durationDays < 4 || durationDays > 7)) return false;
        if (filters.duration === '7+' && durationDays <= 7) return false;
      }
      
      // Theme filters
      const activeThemes = Object.entries(filters.themes)
        .filter(([_, value]) => value)
        .map(([key]) => key);
        
      if (activeThemes.length > 0 && 
          !activeThemes.some(theme => pkg.tags.includes(theme))) {
        return false;
      }
      
      return true;
    });
    
    setFilteredPackages(filtered);
  };

  const displayPackages = filteredPackages.length > 0 ? filteredPackages : packages;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <Helmet>
        <title>TripMaker - Packages</title>
        <meta name="description" content="Discover our exclusive travel packages." />
      </Helmet>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Removed top border */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <SidebarFilters onFiltersChange={handleFiltersChange} />
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Travel Packages</h2>
            <p className="text-gray-600 mt-2">
              {displayPackages.length} {displayPackages.length === 1 ? 'package' : 'packages'} available
            </p>
          </div>
          
          {displayPackages.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500 text-lg">No packages match your filters.</p>
              <button 
                onClick={() => setFilteredPackages([])}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayPackages.map((pkg) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Packages;