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
import { useState, useEffect } from 'react';

// Hero slider images (use local images or Unsplash URLs)
const sliderImages = [
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', caption: 'Explore Beaches', cta: 'Discover Now' },
  { url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba', caption: 'Mountain Adventures', cta: 'Plan Your Trip' },
  { url: 'https://images.unsplash.com/photo-1495567725314-7650b330a5ec', caption: 'Romantic Getaways', cta: 'Book Now' },
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

// Mock packages data (replace with API in production)
const packages = [
  { id: 1, name: 'Goa Beach Getaway', price: 4500, type: 'Domestic', image: 'https://images.unsplash.com/photo-1542296337-4d77f2e4e545', duration: 3, starRating: 3, preference: 'Beach' },
  { id: 2, name: 'Bali Honeymoon', price: 15000, type: 'Honeymoon', image: 'https://images.unsplash.com/photo-1539367628448-4a2e6f3c7d7e', duration: 7, starRating: 5, preference: 'Beach' },
  { id: 3, name: 'Kerala Backwaters', price: 6000, type: 'Domestic', image: 'https://images.unsplash.com/photo-1558442086-6e5d45676756', duration: 4, starRating: 4, preference: 'Nature' },
  { id: 4, name: 'Thailand Adventure', price: 12000, type: 'Adventure', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a', duration: 5, starRating: 3, preference: 'Adventure' },
  { id: 5, name: 'Himalayan Trek', price: 8000, type: 'Adventure', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba', duration: 6, starRating: 4, preference: 'Mountains' },
];

// Mock deals data
const deals = [
  { id: 1, name: 'Goa Beach Getaway', originalPrice: 6000, discountedPrice: 4500, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', endsIn: '24:00:00' },
  { id: 2, name: 'Kerala Backwaters', originalPrice: 8000, discountedPrice: 6000, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', endsIn: '12:30:00' },
];

// Popular destinations
const popularDestinations = [
  { name: 'Goa', startingPrice: 4500, image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a' },
  { name: 'Bali', startingPrice: 15000, image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a' },
  { name: 'Kerala', startingPrice: 6000, image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a' },
  { name: 'Thailand', startingPrice: 12000, image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a' },
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
      {/* Helmet for SEO */}
      <Helmet>
        <title>TripMaker - Budget-Friendly Travel Plans</title>
        <meta name="description" content="Plan your dream trip with TripMaker. Filter by budget, travelers, and travel type to find the best packages." />
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
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.caption}</h1>
                  <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300">
                    {slide.cta}
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
              <label className="block font-semibold">Travelers</label>
              <input
                type="number"
                {...register('travelers', { valueAsNumber: true })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
              />
              {errors.travelers && <p className="text-red-500 text-sm">{errors.travelers.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">Budget (₹)</label>
              <input
                type="number"
                {...register('budget', { valueAsNumber: true })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                min="1000"
                step="1000"
              />
              {errors.budget && <p className="text-red-500 text-sm">{errors.budget.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">Travel Type</label>
              <select
                {...register('travelType')}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Domestic">Domestic</option>
                <option value="International">International</option>
                <option value="Honeymoon">Honeymoon</option>
                <option value="Adventure">Adventure</option>
              </select>
              {errors.travelType && <p className="text-red-500 text-sm">{errors.travelType.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">Travel Date</label>
              <input
                type="date"
                {...register('travelDate')}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.travelDate && <p className="text-red-500 text-sm">{errors.travelDate.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">Duration (Days)</label>
              <input
                type="number"
                {...register('duration', { valueAsNumber: true })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
              />
              {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">Star Rating</label>
              <select
                {...register('starRating', { valueAsNumber: true })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>{star} Star{star > 1 ? 's' : ''}</option>
                ))}
              </select>
              {errors.starRating && <p className="text-red-500 text-sm">{errors.starRating.message}</p>}
            </div>
            <div>
              <label className="block font-semibold">Preference</label>
              <select
                {...register('preference')}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Any">Any</option>
                <option value="Beach">Beach</option>
                <option value="Mountains">Mountains</option>
                <option value="Nature">Nature</option>
                <option value="Adventure">Adventure</option>
              </select>
              {errors.preference && <p className="text-red-500 text-sm">{errors.preference.message}</p>}
            </div>
            <div className="md:col-span-5">
              <button
                type="submit"
                className="w-full bg-primary text-white p-3 rounded-lg hover:bg-teal-700 transition-all duration-300"
              >
                Find Plans
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Categories Section */}
<section className="max-w-6xl mx-auto px-6 pt-32 animate-slide-up">
  <h2 className="text-3xl font-bold text-center mb-8">Explore Categories</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { 
        category: 'Domestic', 
        image: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' 
      },
      { 
        category: 'International', 
        image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' 
      },
      { 
        category: 'Honeymoon', 
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' 
      },
      { 
        category: 'Adventure', 
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
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h3 className="text-white text-xl font-semibold">{item.category}</h3>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Popular Destinations Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-background rounded-lg animate-slide-up">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {popularDestinations.map((dest, idx) => (
            <div
              key={dest.name}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-stagger-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <img src={dest.image} alt={dest.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{dest.name}</h3>
                <p className="text-text-muted">Starting at ₹{dest.startingPrice}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

     {/* Inside the Home component, update the Deals of the Day section */}
    <section className="max-w-6xl mx-auto px-6 py-12 animate-slide-up">
      <h2 className="text-3xl font-bold text-center mb-8">Deals of the Day</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map((deal, idx) => {
          // Parse the endsIn time (e.g., "24:00:00") into seconds
          const [timeLeft, setTimeLeft] = useState(() => {
            const [hours, minutes, seconds] = deal.endsIn.split(':').map(Number);
            return hours * 3600 + minutes * 60 + seconds;
          });

          useEffect(() => {
            const timer = setInterval(() => {
              setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(timer);
          }, []);

          // Format time left into HH:MM:SS
          const hours = Math.floor(timeLeft / 3600);
          const minutes = Math.floor((timeLeft % 3600) / 60);
          const seconds = timeLeft % 60;
          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

          return (
            <div
              key={deal.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-stagger-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative">
                <img src={deal.image} alt={deal.name} className="w-full h-48 object-cover" />
                <span className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded text-sm">
                  Deal Ends in {formattedTime}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{deal.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-secondary font-bold">₹{deal.discountedPrice}</p>
                  <p className="text-text-muted line-through">₹{deal.originalPrice}</p>
                </div>
                <button
                  className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-all duration-300"
                  onClick={() => alert(`Book ${deal.name} now!`)}
                >
                  Grab Deal
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>

      {/* Recommended Packages Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-background rounded-lg animate-slide-up">
        <h2 className="text-3xl font-bold text-center mb-8">Recommended Packages</h2>
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPackages.map((pkg, idx) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-stagger-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{pkg.name}</h3>
                  <p className="text-secondary font-bold mt-1">₹{pkg.price}</p>
                  <p className="text-text-muted">Duration: {pkg.duration} days</p>
                  <p className="text-text-muted">Rating: {pkg.starRating} stars</p>
                  <button
                    className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-teal-700 transition-all duration-300"
                    onClick={() => alert(`Book ${pkg.name} now!`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-text-muted">No packages match your criteria. Try adjusting your filters!</p>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 animate-slide-up">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Travelers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Priya S.', quote: 'TripMaker made our honeymoon to Bali unforgettable! Everything was within our budget.' },
            { name: 'Rahul M.', quote: 'Loved the adventure package to Thailand. Highly recommend TripMaker!' },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-stagger-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <p className="italic">"{testimonial.quote}"</p>
              <p className="mt-4 font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-r from-primary to-teal-700 text-white rounded-lg animate-slide-up">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-lg mb-6">Sign up now and get exclusive deals on your first booking!</p>
          <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;