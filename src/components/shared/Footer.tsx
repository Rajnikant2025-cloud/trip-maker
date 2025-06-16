import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
    <footer className="bg-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4">TripMaker</h3>
          <p className="text-gray-400">Plan your dream trip with us. Explore destinations, book packages, and enjoy hassle-free travel.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            <li><a href="/terms" className="text-gray-400 hover:text-white">Terms</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className="w-full p-2 rounded text-gray-900"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-6 text-gray-400">
        &copy; {new Date().getFullYear()} TripMaker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;