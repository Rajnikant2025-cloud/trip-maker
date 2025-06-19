import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from 'zustand';
import { filterStore } from '../store/filterStore';
import { useScrollTop } from '../hooks/useScrollTop';
//

// Hero slider images
const sliderImages = [
  { 
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 
    caption: 'Explore Beaches', 
    cta: 'Discover Now',
    icon: 'umbrella-beach'
  },
  { 
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba', 
    caption: 'Mountain Adventures', 
    cta: 'Plan Your Trip',
    icon: 'mountain'
  },
  { 
    url: 'https://images.unsplash.com/photo-1495567725314-7650b330a5ec', 
    caption: 'Romantic Getaways', 
    cta: 'Book Now',
    icon: 'heart'
  },
];

// Form schema
const schema = z.object({
  travelers: z.number().min(1, 'At least 1 traveler required'),
  budget: z.number().min(1000, 'Budget must be at least ₹1000'),
  travelType: z.string().min(1, 'Select a travel type'),
  travelDate: z.string().min(1, 'Travel date is required'),
  duration: z.number().min(1, 'Duration must be at least 1 day'),
  starRating: z.number().min(1, 'Star rating must be at least 1'),
  preference: z.string().min(1, 'Select a preference'),
});

type FormData = z.infer<typeof schema>;

// Mock packages data
const packages = [
  { 
    id: 1, 
    name: 'Goa Beach Getaway', 
    price: 4500, 
    type: 'Domestic', 
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 
    duration: 3, 
    starRating: 3, 
    preference: 'Beach',
    activities: ['Beach Access', 'Water Sports', 'Nightlife']
  },
  { 
    id: 2, 
    name: 'Bali Honeymoon', 
    price: 15000, 
    type: 'Honeymoon', 
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4', 
    duration: 7, 
    starRating: 5, 
    preference: 'Beach',
    activities: ['Private Pool', 'Spa Package', 'Romantic Dinner']
  },
  { 
    id: 3, 
    name: 'Kerala Backwaters', 
    price: 6000, 
    type: 'Domestic', 
    image: 'https://images.unsplash.com/photo-1558442086-6e5d45676756', 
    duration: 4, 
    starRating: 4, 
    preference: 'Nature',
    activities: ['Houseboat Stay', 'Ayurveda Massage', 'Village Tour']
  }
];

// Popular destinations
const popularDestinations = [
  {
    id: 1,
    name: 'The Ultimate Price Slash Goa',
    duration: '3N/4D',
    hotelRating: '4 Star Hotel',
    meals: 'Selected Meals',
    activities: ['Free Dinner', 'Kayaking', 'Boat Cruise'],
    emi: 'No Cost EMI at ₹2,191/month',
    originalPrice: '₹13,486',
    discountedPrice: '₹6,743 /Person',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    activitiesCount: '3 Activities'
  },
  {
    id: 2,
    name: 'Discover Goa - Book Now Pay Later',
    duration: '3N/4D',
    hotelRating: '4 Star Hotel',
    meals: 'Selected Meals',
    activities: ['Airport Pickup & Drop', 'Monsoon Experience & Jungle Trail'],
    emi: 'No Cost EMI at ₹4,150/month',
    originalPrice: '₹25,850',
    discountedPrice: '₹12,925 /Person',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206',
    activitiesCount: '2 Activities'
  },
  {
    id: 3,
    name: 'Luxury South Goa Escape',
    duration: '4N/5D',
    hotelRating: '5 Star Hotel',
    meals: 'All Meals Included',
    activities: ['Private Beach Access', 'Spa Package', 'Sunset Cruise'],
    emi: 'No Cost EMI at ₹3,500/month',
    originalPrice: '₹18,000',
    discountedPrice: '₹9,000 /Person',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    activitiesCount: '3 Activities'
  },
  {
    id: 4,
    name: 'Goa Monsoon Special',
    duration: '2N/3D',
    hotelRating: '3 Star Hotel',
    meals: 'Breakfast Included',
    activities: ['Waterfall Trek', 'Spice Plantation Tour'],
    emi: 'No Cost EMI at ₹1,800/month',
    originalPrice: '₹9,500',
    discountedPrice: '₹4,750 /Person',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e',
    activitiesCount: '2 Activities'
  }
];

const Home: React.FC = () => {
  useScrollTop();

  // Filter state
  const { travelers, budget, travelType, travelDate, duration, starRating, preference, setTravelers, setBudget, setTravelType, setTravelDate, setDuration, setStarRating, setPreference } = useStore(filterStore);

  // Form setup
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { travelers, budget, travelType, travelDate, duration, starRating, preference },
  });

  const onSubmit = (data: FormData) => {
    setTravelers(data.travelers);
    setBudget(data.budget);
    setTravelType(data.travelType);
    setTravelDate(data.travelDate);
    setDuration(data.duration);
    setStarRating(data.starRating);
    setPreference(data.preference);
  };

  // Filter packages based on user input
  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.price <= budget &&
      pkg.type === travelType &&
      pkg.duration <= duration &&
      pkg.starRating >= starRating &&
      (preference === 'Any' || pkg.preference === preference)
  );

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div className="space-y-16">
      {/* Add Font Awesome CSS */}
      <Helmet>
        <title>TripMaker - Budget-Friendly Travel Plans</title>
        <meta name="description" content="Plan your dream trip with TripMaker. Filter by budget, travelers, and travel type to find the best packages." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>

      {/* Hero Section with Slider */}
      <section className="relative h-[70vh]">
        <Slider {...sliderSettings}>
          {sliderImages.map((slide, idx) => (
            <div key={idx} className="relative h-[70vh]">
              <div
                className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.url})`,
                }}
              >
                <div className="text-center text-white animate-fade-in">
                  <i className={`fas fa-${slide.icon} text-5xl mb-4`}></i>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.caption}</h1>
                  <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300">
                    <i className="fas fa-search mr-2"></i>{slide.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        
        {/* Filter Form Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-lg shadow-lg max-w-5xl mx-auto translate-y-1/2 animate-slide-up">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-5 gap-4 text-gray-900">
            <div>
              <label className="block font-semibold">
                <i className="fas fa-users mr-2 text-blue-500"></i>Travelers
              </label>
              <input
                type="number"
                {...register('travelers', { valueAsNumber: true })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
              />
              {errors.travelers && <p className="text-red-500 text-sm"><i className="fas fa-exclamation-circle mr-1"></i>{errors.travelers.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">
                <i className="fas fa-rupee-sign mr-2 text-green-500"></i>Budget (₹)
              </label>
              <input
                type="number"
                {...register('budget', { valueAsNumber: true })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                min="1000"
                step="1000"
              />
              {errors.budget && <p className="text-red-500 text-sm"><i className="fas fa-exclamation-circle mr-1"></i>{errors.budget.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">
                <i className="fas fa-globe-asia mr-2 text-purple-500"></i>Travel Type
              </label>
              <select
                {...register('travelType')}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Domestic"><i className="fas fa-home"></i> Domestic</option>
                <option value="International"><i className="fas fa-plane"></i> International</option>
                <option value="Honeymoon"><i className="fas fa-heart"></i> Honeymoon</option>
                <option value="Adventure"><i className="fas fa-hiking"></i> Adventure</option>
              </select>
              {errors.travelType && <p className="text-red-500 text-sm"><i className="fas fa-exclamation-circle mr-1"></i>{errors.travelType.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">
                <i className="far fa-calendar-alt mr-2 text-orange-500"></i>Travel Date
              </label>
              <input
                type="date"
                {...register('travelDate')}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.travelDate && <p className="text-red-500 text-sm"><i className="fas fa-exclamation-circle mr-1"></i>{errors.travelDate.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">
                <i className="far fa-clock mr-2 text-blue-400"></i>Duration (Days)
              </label>
              <input
                type="number"
                {...register('duration', { valueAsNumber: true })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
              />
              {errors.duration && <p className="text-red-500 text-sm"><i className="fas fa-exclamation-circle mr-1"></i>{errors.duration.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">
                <i className="fas fa-star mr-2 text-yellow-400"></i>Star Rating
              </label>
              <select
                {...register('starRating', { valueAsNumber: true })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    <i className="fas fa-star"></i> {star} Star{star > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              {errors.starRating && <p className="text-red-500 text-sm"><i className="fas fa-exclamation-circle mr-1"></i>{errors.starRating.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">
                <i className="fas fa-heart mr-2 text-red-400"></i>Preference
              </label>
              <select
                {...register('preference')}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Any"><i className="fas fa-asterisk"></i> Any</option>
                <option value="Beach"><i className="fas fa-umbrella-beach"></i> Beach</option>
                <option value="Mountains"><i className="fas fa-mountain"></i> Mountains</option>
                <option value="Nature"><i className="fas fa-tree"></i> Nature</option>
                <option value="Adventure"><i className="fas fa-hiking"></i> Adventure</option>
              </select>
              {errors.preference && <p className="text-red-500 text-sm"><i className="fas fa-exclamation-circle mr-1"></i>{errors.preference.message}</p>}
            </div>
            <div className="md:col-span-5">
              <button
                type="submit"
                className="w-full bg-primary text-white p-3 rounded-lg hover:bg-teal-700 transition-all duration-300"
              >
                <i className="fas fa-search mr-2"></i>Find Plans
              </button>
            </div>
          </form> 
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-6 pt-32 animate-slide-up">
        <h2 className="text-3xl font-bold text-center mb-8">
          <i className="fas fa-compass text-blue-500 mr-2"></i>Explore Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { 
              category: 'Domestic', 
              icon: 'home',
              image: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' 
            },
            { 
              category: 'International', 
              icon: 'globe',
              image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' 
            },
            { 
              category: 'Honeymoon', 
              icon: 'heart',
              image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' 
            },
            { 
              category: 'Adventure', 
              icon: 'mountain',
              image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' 
            }
          ].map((item, idx) => (
            <div
              key={item.category}
              className="relative bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <img
                src={item.image}
                alt={item.category}
                className="w-full h-40 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x300?text=' + item.category;
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center flex-col">
                <i className={`fas fa-${item.icon} text-white text-3xl mb-2`}></i>
                <h3 className="text-white text-xl font-semibold">{item.category}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 animate-slide-up">
  <h2 className="text-3xl font-bold text-center mb-8">
    <i className="fas fa-bolt text-yellow-500 mr-2"></i>Deal of the day
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {popularDestinations.map((destination) => (
      <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <div className="relative">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Travel+Image';
            }}
          />
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            <i className="fas fa-clock mr-1"></i>Deal of the day
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold">
              <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
              {destination.name}
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              <i className="far fa-calendar-alt mr-1"></i>
              {destination.duration}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="mr-2">
              <i className="fas fa-star text-yellow-400 mr-1"></i>
              {destination.hotelRating}
            </span>
            <span>•</span>
            <span className="ml-2">
              <i className="fas fa-utensils text-orange-400 mr-1"></i>
              {destination.meals}
            </span>
          </div>
          
          <div className="border-t border-b border-gray-100 py-3 my-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-sm">
                <i className="fas fa-tasks text-purple-500 mr-2"></i>
                Activities:
              </h4>
              <span className="text-xs text-gray-500">
                <i className="fas fa-list-ol mr-1"></i>
                {destination.activitiesCount}
              </span>
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              {destination.activities.map((activity, i) => (
                <li key={i} className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                  {activity}
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-sm text-green-600 font-semibold mb-2">
            <i className="fas fa-credit-card mr-2"></i>
            {destination.emi}
          </p>
          
          <div className="flex justify-between items-center mt-auto">
            <div>
              <p className="text-sm text-gray-500 line-through">
                <i className="fas fa-tag mr-1"></i>
                {destination.originalPrice}
              </p>
              <p className="text-lg font-bold text-gray-900">
                <i className="fas fa-rupee-sign mr-1"></i>
                {destination.discountedPrice}
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors h-fit">
              <i className="fas fa-shopping-cart mr-2"></i>
              Book Now
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Recommended Packages Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-background rounded-lg animate-slide-up">
        <h2 className="text-3xl font-bold text-center mb-8">
          <i className="fas fa-star text-yellow-400 mr-2"></i>Recommended Packages
        </h2>
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Travel+Image';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">
                    <i className="fas fa-suitcase text-blue-500 mr-2"></i>
                    {pkg.name}
                  </h3>
                  <p className="text-secondary font-bold mt-1">
                    <i className="fas fa-rupee-sign mr-1"></i>
                    {pkg.price}
                  </p>
                  <p className="text-text-muted">
                    <i className="far fa-clock mr-2"></i>
                    Duration: {pkg.duration} days
                  </p>
                  <p className="text-text-muted">
                    <i className="fas fa-star text-yellow-400 mr-2"></i>
                    Rating: {pkg.starRating} stars
                  </p>
                  <div className="mt-3">
                    <h4 className="font-semibold text-sm mb-1">
                      <i className="fas fa-list-ul mr-2"></i>
                      Activities:
                    </h4>
                    <ul className="text-sm text-gray-600">
                      {pkg.activities.map((activity, i) => (
                        <li key={i} className="flex items-center mb-1">
                          <i className="fas fa-check text-green-500 mr-2 text-xs"></i>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="mt-4 w-full bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-all duration-300"
                    onClick={() => alert(`Book ${pkg.name} now!`)}
                  >
                    <i className="fas fa-bookmark mr-2"></i>Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-text-muted">
            <i className="fas fa-exclamation-circle mr-2"></i>
            No packages match your criteria. Try adjusting your filters!
          </p>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 animate-slide-up">
        <h2 className="text-3xl font-bold text-center mb-8">
          <i className="fas fa-quote-left text-gray-400 mr-2"></i>What Our Travelers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              name: 'Priya S.', 
              quote: 'TripMaker made our honeymoon to Bali unforgettable! Everything was within our budget.',
              icon: 'heart'
            },
            { 
              name: 'Rahul M.', 
              quote: 'Loved the adventure package to Thailand. Highly recommend TripMaker!',
              icon: 'thumbs-up'
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
            >
              <i className={`fas fa-${testimonial.icon} text-4xl text-gray-200 absolute top-4 right-4`}></i>
              <p className="italic relative z-10">"{testimonial.quote}"</p>
              <p className="mt-4 font-semibold">
                <i className="fas fa-user-circle mr-2 text-blue-500"></i>
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-r from-primary to-teal-700 text-white rounded-lg animate-slide-up">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            <i className="fas fa-plane-departure mr-2"></i>Ready for Your Next Adventure?
          </h2>
          <p className="text-lg mb-6">
            <i className="fas fa-gift mr-2"></i>Sign up now and get exclusive deals on your first booking!
          </p>
          <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300">
            <i className="fas fa-user-plus mr-2"></i>Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;