import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useScrollTop } from '../hooks/useScrollTop';
import SidebarFilters, { Filters } from '../components/SidebarFilters';

interface Deal {
  id: number;
  name: string;
  duration: string;
  price: string;
  originalPrice: string;
  discount: string;
  highlights: string[];
  imageUrls: string[];
  tags?: string[];
}

interface CartItem {
  dealId: number;
  quantity: number;
  dealDetails: Omit<Deal, 'imageUrls' | 'highlights'>;
}

const WORKING_IMAGE_URLS = {
  goa: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://source.unsplash.com/800x500/?goa,beach,palolem'
  ],
  kerala: [
    'https://images.unsplash.com/photo-1580619305218-8426ba0b13f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/11146919/pexels-photo-11146919.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://source.unsplash.com/800x500/?kerala,houseboat,alleppey'
  ],
  himalayas: [
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://source.unsplash.com/800x500/?himalayas,manali,leh'
  ]
};

export default function DomesticDeals() {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    priceRange: [0, 50000],
    duration: '',
    themes: {
      Beach: false,
      Adventure: false,
      Luxury: false,
      Romance: false
    }
  });

  useScrollTop();

  useEffect(() => {
    const initialDeals: Deal[] = [
      {
        id: 1,
        name: 'Goa Beach Paradise',
        duration: '5N/6D',
        price: '₹24,999',
        originalPrice: '₹32,000',
        discount: '22% off',
        highlights: ['Beachfront Resort', 'Water Sports', 'Nightlife Experience'],
        imageUrls: WORKING_IMAGE_URLS.goa,
        tags: ['Beach', 'Luxury']
      },
      {
        id: 2,
        name: 'Kerala Backwaters Cruise',
        duration: '4N/5D',
        price: '₹28,500',
        originalPrice: '₹35,000',
        discount: '18% off',
        highlights: ['Houseboat Stay', 'Ayurvedic Spa', 'Village Tours'],
        imageUrls: WORKING_IMAGE_URLS.kerala,
        tags: ['Luxury', 'Romance']
      },
      {
        id: 3,
        name: 'Himalayan Adventure',
        duration: '7N/8D',
        price: '₹35,999',
        originalPrice: '₹42,000',
        discount: '14% off',
        highlights: ['Mountain Trekking', 'Camping', 'Local Culture'],
        imageUrls: WORKING_IMAGE_URLS.himalayas,
        tags: ['Adventure']
      }
    ];

    setDeals(initialDeals);
    setFilteredDeals(initialDeals);
  }, []);

  useEffect(() => {
    const filtered = deals.filter(deal => {
      if (filters.search && !deal.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      const priceNumber = parseInt(deal.price.replace(/[^\d]/g, ''), 10);
      if (priceNumber < filters.priceRange[0] || priceNumber > filters.priceRange[1]) {
        return false;
      }

      const nights = parseInt(deal.duration, 10);
      if (filters.duration === '1-3' && (nights < 1 || nights > 3)) return false;
      if (filters.duration === '4-7' && (nights < 4 || nights > 7)) return false;
      if (filters.duration === '7+' && nights <= 7) return false;

      const activeThemes = Object.entries(filters.themes)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      if (activeThemes.length > 0) {
        if (!deal.tags || !activeThemes.some(theme => deal.tags?.includes(theme))) {
          return false;
        }
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
      img.src = `https://via.placeholder.com/800x500/cccccc/969696?text=${encodeURIComponent(deal.name)}`;
      img.className = "w-full h-full object-cover opacity-70";
    }
  };

  const calculateTotalPrice = (items: CartItem[]): number => {
    return items.reduce((sum, item) => {
      const deal = deals.find(d => d.id === item.dealId);
      if (!deal) return sum;
      const priceNum = parseInt(deal.price.replace(/[^\d]/g, ''), 10);
      return sum + (priceNum * item.quantity);
    }, 0);
  };

  const handleAddToCart = (deal: Deal) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.dealId === deal.id);
      if (existing) {
        return prev.map(item =>
          item.dealId === deal.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { 
        dealId: deal.id, 
        quantity: 1,
        dealDetails: {
          id: deal.id,
          name: deal.name,
          duration: deal.duration,
          price: deal.price,
          originalPrice: deal.originalPrice,
          discount: deal.discount,
          tags: deal.tags || []
        }
      }];
    });
  };

  const handleBookNow = (deal: Deal) => {
    const cartItems = [{
      dealId: deal.id,
      quantity: 1,
      dealDetails: {
        id: deal.id,
        name: deal.name,
        duration: deal.duration,
        price: deal.price,
        originalPrice: deal.originalPrice,
        discount: deal.discount,
        tags: deal.tags || []
      }
    }];
    
    navigate('/checkout', {
      state: {
        cartItems,
        allDeals: deals,
        totalPrice: calculateTotalPrice(cartItems)
      }
    });
  };

  const goToCart = () => {
    navigate('/cart', {
      state: {
        cartItems,
        allDeals: deals,
        totalPrice: calculateTotalPrice(cartItems)
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-4">
            <SidebarFilters onFiltersChange={setFilters} minPrice={0} maxPrice={50000} />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              <i className="fas fa-home mr-2 text-green-500"></i>
              Domestic Travel Deals
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  className="flex items-center text-green-600 hover:text-green-800"
                  onClick={goToCart}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden bg-gray-100 relative">
                    <img
                      src={deal.imageUrls[0]}
                      alt={deal.name}
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e, deal)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-bold">{deal.name}</h2>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {deal.discount}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">
                      <i className="far fa-clock mr-2"></i>
                      {deal.duration}
                    </p>

                    <div className="flex items-center mb-4">
                      <span className="text-2xl font-bold text-green-600">{deal.price}</span>
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
                        onClick={() => handleAddToCart(deal)}
                        className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 py-2 rounded-md transition-colors duration-300 flex items-center justify-center"
                      >
                        <i className="fas fa-shopping-cart mr-2"></i>
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => handleBookNow(deal)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors duration-300 flex items-center justify-center"
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