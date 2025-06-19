import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import wanderonBadge from '../../../src/assets/images/hero1.jpg'; 

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

const Footer: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    alert(`Subscribed with email: ${data.email}`);
    reset();
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Full-width image row */}
      <div className="w-full bg-black py-6">
        <div className="max-w-6xl mx-auto px-6">
          <img 
            src={wanderonBadge} 
            alt="Wanderon Banner" 
            className="w-full h-auto max-h-64 object-contain"
            onError={(e) => {
              console.error('Failed to load image', e);
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">WANDERON</h3>
          <p className="text-gray-400 mb-4">
            3rd Floor, Building No-436, Phase IV, Udyog Vihar, Sector-18, Gurugram, Haryana-122015
          </p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <i className="fas fa-envelope mr-3 text-gray-400"></i>
              <a href="mailto:hello@wanderon.in" className="hover:text-blue-400">hello@wanderon.in</a>
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone-alt mr-3 text-gray-400"></i>
              <a href="tel:+919090403075" className="hover:text-blue-400">+91-9090403075</a>
            </div>
            <div className="flex items-center">
              <i className="fas fa-globe mr-3 text-gray-400"></i>
              <a href="https://www.wanderon.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">www.wanderon.in</a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
            <li><a href="/trips" className="text-gray-400 hover:text-white">Our Trips</a></li>
            <li><a href="/gallery" className="text-gray-400 hover:text-white">Gallery</a></li>
            <li><a href="/blog" className="text-gray-400 hover:text-white">Blog</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              {...register('email')}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} WANDERON EXPERIENCES PVT LTD. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;