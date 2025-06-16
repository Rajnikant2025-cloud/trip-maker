import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../types/Auth';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState<User>({ name: '', mobile: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.mobile) {
      alert('Name and Mobile are required!');
      return;
    }
    login(formData);
    alert(isSignup ? `Signed Up: ${formData.name}` : `Logged In: ${formData.name}`);
  };

  return (
    <div className="mt-4 space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Mobile Number"
        className="w-full rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {isSignup && (
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email (Optional)"
          className="w-full rounded p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      )}
      <button
        onClick={handleSubmit}
        className="flex w-full items-center justify-center rounded bg-primary p-2 text-white hover:bg-indigo-700"
      >
        <i className="fas fa-sign-in-alt mr-2"></i> {isSignup ? 'Sign Up' : 'Login'}
      </button>
      <button
        onClick={() => setIsSignup(!isSignup)}
        className="w-full rounded bg-secondary p-2 text-white hover:bg-indigo-600"
      >
        {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default LoginForm;