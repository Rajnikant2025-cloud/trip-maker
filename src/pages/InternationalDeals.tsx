// src/pages/InternationalDeals.tsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useScrollTop } from '../hooks/useScrollTop'; // Make sure path is correct

// Pre-verified working image URLs from different sources
const WORKING_IMAGE_URLS = {
  bali: [
    'https://source.unsplash.com/random/800x500/?bali,resort,villa,beach,paradise',
    'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg',
    'https://images.unsplash.com/photo-1518544866330-95a2b4134b71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  europe: [
    'https://source.unsplash.com/random/800x500/?europe,tour,landmark,city,travel',
    'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg',
    'https://images.unsplash.com/photo-1493707553966-283afac8c358?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ],
  dubai: [
    'https://source.unsplash.com/random/800x500/?dubai,desert,shopping,skyscraper',
    'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  ]
};

export default function InternationalDeals() {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<any[]>([]);

  useScrollTop(); 

  useEffect(() => {
    const initialDeals = [
      {
        id: 1,
        name: 'Bali Luxury Escape',
        duration: '7N/8D',
        price: '₹89,999',
        originalPrice: '₹1,20,000',
        discount: '25% off',
        highlights: ['Private Villa', 'Spa Package', 'Airport Transfers'],
        imageUrls: WORKING_IMAGE_URLS.bali
      },
      {
        id: 2,
        name: 'European Wonders Tour',
        duration: '10N/11D',
        price: '₹1,49,999',
        originalPrice: '₹2,00,000',
        discount: '30% off',
        highlights: ['4 Countries', 'Guided Tours', 'Breakfast Included'],
        imageUrls: WORKING_IMAGE_URLS.europe
      },
      {
        id: 3,
        name: 'Dubai Shopping Festival',
        duration: '5N/6D',
        price: '₹64,999',
        originalPrice: '₹85,000',
        discount: '20% off',
        highlights: ['Burj Khalifa Access', 'Desert Safari', 'Dhow Cruise'],
        imageUrls: WORKING_IMAGE_URLS.dubai
      }
    ];

    setDeals(initialDeals);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, deal: any) => {
    const img = e.target as HTMLImageElement;
    const currentSrc = img.src;
    const urls = deal.imageUrls;
    const currentIndex = urls.indexOf(currentSrc);
    
    if (currentIndex < urls.length - 1) {
      // Try next URL in the list
      img.src = urls[currentIndex + 1];
    } else {
      // All URLs failed - show placeholder
      img.src = `https://via.placeholder.com/800x500/cccccc/969696?text=${encodeURIComponent(deal.name)}`;
      img.className = "w-full h-full object-cover opacity-70";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">
        <i className="fas fa-plane mr-2 text-purple-500"></i>
        International Travel Deals
      </h1>
      
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center text-primary hover:text-blue-700"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back to Home
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 overflow-hidden bg-gray-100 relative">
              <img
                src={deal.imageUrls[0]} // Start with first URL
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
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                  {deal.discount}
                </span>
              </div>
              
              <p className="text-gray-600 mb-3">
                <i className="far fa-clock mr-2"></i>
                {deal.duration}
              </p>
              
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-purple-600">{deal.price}</span>
                <span className="ml-2 text-gray-500 line-through">{deal.originalPrice}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <h3 className="font-semibold mb-2">
                  <i className="fas fa-star mr-2 text-yellow-400"></i>
                  Package Highlights:
                </h3>
                <ul className="space-y-1">
                  {deal.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2 text-sm"></i>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-colors duration-300">
                <i className="fas fa-shopping-cart mr-2"></i>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}