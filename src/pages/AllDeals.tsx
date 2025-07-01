import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useScrollTop } from '../hooks/useScrollTop';
import SidebarFilters, { Filters } from '../components/SidebarFilters';
import { useLocation } from 'react-router-dom';



interface Deal {
  id: number;
  name: string;
  type: 'Domestic' | 'International';
  location: string;
  duration: string;
  price: string;
  originalPrice: string;
  discount: string;
  highlights: string[];
  tags: string[];
  imageUrls: string[];
}

const WORKING_IMAGE_URLS = {
  goa: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  kerala: [
    'https://images.unsplash.com/photo-1580619305218-8426ba0b13f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/11146919/pexels-photo-11146919.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  himalayas: [
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  bali: [
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  europe: [
    'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  dubai: [
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800'
  ]
};

export default function AllDeals() {
  const navigate = useNavigate();
  const location = useLocation();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    priceRange: [0, 200000],
    duration: '',
    themes: {
      Beach: false,
      Adventure: false,
      Luxury: false,
      Romance: false
    }
  });
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  type CartItem = {
  dealId: number;
  quantity: number;
};

const [cartItems, setCartItems] = useState<CartItem[]>([]);

 // Initialize cart from navigation state
  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
    }
  }, [location.state]);


  useScrollTop();

  useEffect(() => {
    const initialDeals: Deal[] = [
      {
        id: 1,
        name: 'Goa Beach Paradise',
        type: 'Domestic',
        location: 'Goa, India',
        duration: '5N/6D',
        price: '₹24,999',
        originalPrice: '₹32,000',
        discount: '22% off',
        highlights: ['Beachfront Resort', 'Water Sports', 'Nightlife'],
        tags: ['Beach', 'Adventure'],
        imageUrls: WORKING_IMAGE_URLS.goa
      },
      {
        id: 2,
        name: 'Kerala Backwaters Cruise',
        type: 'Domestic',
        location: 'Kerala, India',
        duration: '4N/5D',
        price: '₹28,500',
        originalPrice: '₹35,000',
        discount: '18% off',
        highlights: ['Houseboat Stay', 'Ayurvedic Spa', 'Village Tours'],
        tags: ['Luxury', 'Wellness'],
        imageUrls: WORKING_IMAGE_URLS.kerala
      },
      {
        id: 3,
        name: 'Himalayan Adventure',
        type: 'Domestic',
        location: 'Himalayas, India',
        duration: '7N/8D',
        price: '₹35,999',
        originalPrice: '₹42,000',
        discount: '14% off',
        highlights: ['Mountain Trekking', 'Camping', 'Local Culture'],
        tags: ['Adventure', 'Romance'],
        imageUrls: WORKING_IMAGE_URLS.himalayas
      },
      {
        id: 4,
        name: 'Bali Luxury Escape',
        type: 'International',
        location: 'Bali, Indonesia',
        duration: '7N/8D',
        price: '₹89,999',
        originalPrice: '₹1,20,000',
        discount: '25% off',
        highlights: ['Private Villa', 'Spa Package', 'Airport Transfers'],
        tags: ['Luxury', 'Beach'],
        imageUrls: WORKING_IMAGE_URLS.bali
      },
      {
        id: 5,
        name: 'European Wonders Tour',
        type: 'International',
        location: 'Europe',
        duration: '10N/11D',
        price: '₹1,49,999',
        originalPrice: '₹2,00,000',
        discount: '30% off',
        highlights: ['4 Countries', 'Guided Tours', 'Breakfast Included'],
        tags: ['Luxury', 'Romance'],
        imageUrls: WORKING_IMAGE_URLS.europe
      },
      {
        id: 6,
        name: 'Dubai Shopping Festival',
        type: 'International',
        location: 'Dubai, UAE',
        duration: '5N/6D',
        price: '₹64,999',
        originalPrice: '₹85,000',
        discount: '20% off',
        highlights: ['Burj Khalifa Access', 'Desert Safari', 'Dhow Cruise'],
        tags: ['Luxury', 'Adventure'],
        imageUrls: WORKING_IMAGE_URLS.dubai
      }
    ];
    setDeals(initialDeals);
    setFilteredDeals(initialDeals);
  }, []);

  useEffect(() => {
    const filtered = deals.filter(deal => {
      // Search filter
      if (filters.search && !deal.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Price filter
      const priceNumber = parseInt(deal.price.replace(/[^\d]/g, ''), 10);
      if (priceNumber < filters.priceRange[0] || priceNumber > filters.priceRange[1]) {
        return false;
      }

      // Duration filter
      const nights = parseInt(deal.duration, 10);
      if (filters.duration === '1-3' && (nights < 1 || nights > 3)) return false;
      if (filters.duration === '4-7' && (nights < 4 || nights > 7)) return false;
      if (filters.duration === '7+' && nights <= 7) return false;

      // Theme filter
      const activeThemes = Object.entries(filters.themes)
        .filter(([_, value]) => value)
        .map(([key]) => key);
      
      if (activeThemes.length > 0) {
        const dealThemes = [...deal.highlights, ...deal.tags].map(t => t.toLowerCase());
        const hasMatchingTheme = activeThemes.some(theme => 
          dealThemes.some(dealTheme => dealTheme.includes(theme.toLowerCase()))
        );
        if (!hasMatchingTheme) return false;
      }

      return true;
    });
    setFilteredDeals(filtered);
  }, [deals, filters]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, deal: Deal) => {
    const img = e.target as HTMLImageElement;
    const currentSrc = img.src;
    const urls = deal.imageUrls;
    const currentIndex = urls.indexOf(currentSrc);
    
    if (currentIndex < urls.length - 1) {
      img.src = urls[currentIndex + 1];
    } else {
      img.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#6b7280" 
                text-anchor="middle" dominant-baseline="middle">${deal.name}</text>
        </svg>`
      )}`;
      img.className = "w-full h-full object-cover";
    }
  };

 const handleAddToCart = (dealId: number) => {
  setCartItems((prev) => {
    const existing = prev.find(item => item.dealId === dealId);
    if (existing) {
      return prev.map(item =>
        item.dealId === dealId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prev, { dealId, quantity: 1 }];
    }
  });
};

  const handleBookNow = (dealId: number) => {
    navigate(`/booking/${dealId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <SidebarFilters 
            onFiltersChange={setFilters}
            minPrice={0}
            maxPrice={200000}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              <i className="fas fa-list mr-2 text-blue-500"></i>
              All Travel Deals
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
  className="flex items-center text-blue-600 hover:text-blue-800"
  onClick={() => navigate('/cart', { state: { cartItems, allDeals: deals } })}
>
  <i className="fas fa-shopping-cart text-2xl"></i>
  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {cartItems.length}
    </span>
  )}
</button>

              </div>
              <button 
                onClick={() => navigate(-1)} 
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <i className="fas fa-arrow-left mr-2"></i> Back to Home
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden bg-gray-100 relative">
                    <picture>
                      <source srcSet={deal.imageUrls[0]} type="image/webp" />
                      <source srcSet={deal.imageUrls[1]} type="image/jpeg" />
                      <img
                        src={deal.imageUrls[0]}
                        alt={deal.name}
                        className="w-full h-full object-cover"
                        onError={(e) => handleImageError(e, deal)}
                        loading="lazy"
                      />
                    </picture>
                    <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                      {deal.type}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold">{deal.name}</h2>
                      <span className={`${deal.type === 'Domestic' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} px-2 py-1 rounded text-sm`}>
                        {deal.discount}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                      <i className="far fa-clock mr-2"></i>
                      {deal.duration}
                    </p>
                    
                    <div className="flex items-center mb-4">
                      <span className={`text-2xl font-bold ${deal.type === 'Domestic' ? 'text-green-600' : 'text-purple-600'}`}>
                        {deal.price}
                      </span>
                      <span className="ml-2 text-gray-500 line-through">{deal.originalPrice}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3">
                      <h3 className="font-semibold mb-2">
                        <i className="fas fa-star mr-2 text-yellow-400"></i>
                        Package Highlights:
                      </h3>
                      <ul className="space-y-1">
                        {deal.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2 text-sm"></i>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <button 
                        onClick={() => handleAddToCart(deal.id)}
                        className={`flex-1 ${deal.type === 'Domestic' ? 'bg-green-100 hover:bg-green-200 text-green-800' : 'bg-purple-100 hover:bg-purple-200 text-purple-800'} py-2 rounded-md transition-colors duration-300 flex items-center justify-center`}
                      >
                        <i className="fas fa-shopping-cart mr-2"></i>
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => handleBookNow(deal.id)}
                        className={`flex-1 ${deal.type === 'Domestic' ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'} text-white py-2 rounded-md transition-colors duration-300 flex items-center justify-center`}
                      >
                        <i className="fas fa-bolt mr-2"></i>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No deals match your filters</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}