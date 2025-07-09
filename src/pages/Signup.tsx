import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'email' | 'mobile'>('mobile');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    otp: '',
    agreeToTerms: false
  });
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Redirect after success
  useEffect(() => {
    if (signupSuccess) {
      const timer = setTimeout(() => navigate('/'), 2000);
      return () => clearTimeout(timer);
    }
  }, [signupSuccess, navigate]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    
    setFormData(newFormData);
    
    if (name === 'otp') setOtpError('');
    
    if (name === 'password' || name === 'confirmPassword') {
      if (newFormData.password && newFormData.confirmPassword) {
        setPasswordError(
          newFormData.password !== newFormData.confirmPassword 
            ? 'Passwords do not match' 
            : !validatePassword(newFormData.password)
            ? 'Password must be at least 8 characters with 1 uppercase letter and 1 number'
            : ''
        );
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSendOtp = async () => {
    if (!formData.mobileNumber) {
      setOtpError('Mobile number is required');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setOtpError('Please enter a valid 10-digit mobile number');
      return;
    }

    const otp = generateOTP();
    setGeneratedOTP(otp);
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`OTP sent to +1${formData.mobileNumber}: ${otp}`);
      setOtpSent(true);
      setCountdown(60);
      setOtpError('');
    } catch (error) {
      setOtpError('Error sending OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    await handleSendOtp();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'email' && formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (activeTab === 'email' && !validateEmail(formData.email)) {
      setOtpError('Please enter a valid email address');
      return;
    }

    if (activeTab === 'mobile' && formData.otp !== generatedOTP) {
      setOtpError('Invalid OTP. Please try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSignupSuccess(true);
      
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
        otp: '',
        agreeToTerms: false
      });
      setOtpSent(false);
      setGeneratedOTP('');
    } catch (error) {
      console.error('Signup error:', error);
      setOtpError('Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isMobileValid = /^\d{10}$/.test(formData.mobileNumber);
  const isFormValid = formData.fullName && formData.agreeToTerms && 
    (activeTab === 'email' 
      ? formData.email && formData.password && formData.confirmPassword && !passwordError
      : otpSent && formData.otp);

  if (signupSuccess) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <div className="mb-4 text-green-500">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Signup Successful!</h2>
        <p className="text-gray-600">You're being redirected to the home page...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
      <p className="text-center text-gray-600 mb-6">Join us and start your journey</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email/Mobile Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center ${activeTab === 'email' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => {
              setActiveTab('email');
              setOtpSent(false);
              setOtpError('');
            }}
          >
            Email
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center ${activeTab === 'mobile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => {
              setActiveTab('mobile');
              setOtpSent(false);
              setOtpError('');
            }}
          >
            Mobile
          </button>
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email Form */}
        {activeTab === 'email' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className={`w-full px-3 py-2 border ${
                  formData.email && !validateEmail(formData.email) ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formData.email && !validateEmail(formData.email) && (
                <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`w-full px-3 py-2 border ${
                    passwordError && formData.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="Create a password (min 8 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {formData.password && !validatePassword(formData.password) && (
                <p className="text-xs text-gray-500 mt-1">
                  Password must contain at least 8 characters, 1 uppercase letter, and 1 number
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className={`w-full px-3 py-2 border ${
                    passwordError && formData.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>
          </>
        )}

        {/* Mobile Form */}
        {activeTab === 'mobile' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +1
                </span>
                <input
                  type="tel"
                  name="mobileNumber"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="1234567890"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  maxLength={10}
                  disabled={otpSent}
                />
              </div>
            </div>

            {otpSent ? (
              <>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                  <input
                    type="text"
                    name="otp"
                    className={`w-full px-3 py-2 border ${
                      otpError ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                    maxLength={6}
                    pattern="\d{6}"
                  />
                  {otpError && (
                    <p className="text-red-500 text-xs mt-1">{otpError}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    OTP sent to +1{formData.mobileNumber}
                  </p>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={countdown > 0 || isSubmitting}
                    className={`text-xs ${countdown > 0 || isSubmitting ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                  </button>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSubmitting || !isMobileValid}
                className={`w-full py-2 px-4 text-white font-medium rounded-md ${
                  isSubmitting || !isMobileValid ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </span>
                ) : 'Send OTP'}
              </button>
            )}
          </>
        )}

        {/* Terms Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            name="agreeToTerms"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the <a href="#" className="text-blue-600">Terms of Service</a> and <a href="#" className="text-blue-600">Privacy Policy</a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-2 px-4 text-white font-medium rounded-md ${
            !isFormValid || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : activeTab === 'email' ? (
            'Create Account'
          ) : (
            'Verify and Create Account'
          )}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-500">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Signup;