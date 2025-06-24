// src/pages/DomesticDeals.tsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useScrollTop } from '../hooks/useScrollTop'; // Make sure path is correct


// Pre-verified working image URLs for domestic destinations
const WORKING_IMAGE_URLS = {
  goa: [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://source.unsplash.com/800x500/?goa,beach,palolem'
  ],
  kerala: [
    'https://images.unsplash.com/photo-1580619305218-8426ba0b13f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Verified Kerala backwaters
    'https://images.pexels.com/photos/11146919/pexels-photo-11146919.jpeg?auto=compress&cs=tinysrgb&w=800', // Verified houseboat
    'https://source.unsplash.com/800x500/?kerala,houseboat,alleppey' // More specific terms
  ],
  himalayas: [
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://source.unsplash.com/800x500/?himalayas,manali,leh'
  ]
};

export default function DomesticDeals() {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<any[]>([]);

  useScrollTop(); 

  useEffect(() => {
    const initialDeals = [
      {
        id: 1,
        name: 'Goa Beach Paradise',
        duration: '5N/6D',
        price: '₹24,999',
        originalPrice: '₹32,000',
        discount: '22% off',
        highlights: ['Beachfront Resort', 'Water Sports', 'Nightlife Experience'],
        imageUrls: WORKING_IMAGE_URLS.goa
      },
      {
        id: 2,
        name: 'Kerala Backwaters Cruise',
        duration: '4N/5D',
        price: '₹28,500',
        originalPrice: '₹35,000',
        discount: '18% off',
        highlights: ['Houseboat Stay', 'Ayurvedic Spa', 'Village Tours'],
        imageUrls: WORKING_IMAGE_URLS.kerala
      },
      {
        id: 3,
        name: 'Himalayan Adventure',
        duration: '7N/8D',
        price: '₹35,999',
        originalPrice: '₹42,000',
        discount: '14% off',
        highlights: ['Mountain Trekking', 'Camping', 'Local Culture'],
        imageUrls: WORKING_IMAGE_URLS.himalayas
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
        <i className="fas fa-home mr-2 text-green-500"></i>
        Domestic Travel Deals
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
                  {deal.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2 text-sm"></i>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors duration-300">
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

