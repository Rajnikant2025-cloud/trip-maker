import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface CartItem {
  dealId: number;
  quantity: number;
  dealDetails: {
    id: number;
    name: string;
    price: string;
    duration: string;
    originalPrice: string;
    discount: string;
    tags: string[];
  };
}

interface Deal {
  id: number;
  name: string;
  price: string;
  duration: string;
  originalPrice: string;
  discount: string;
  tags: string[];
}

interface LocationState {
  cartItems: CartItem[];
  allDeals: Deal[];
  totalPrice: number;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [], allDeals = [], totalPrice = 0 } = location.state as LocationState || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'credit-card'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    setOrderSuccess(true);
    
    // Clear cart after 2 seconds and redirect
    setTimeout(() => {
      navigate('/confirmation', {
        state: {
          orderId: `TRIP-${Math.floor(Math.random() * 1000000)}`,
          totalPrice,
          items: cartItems.map(item => {
            const deal = allDeals.find(d => d.id === item.dealId);
            return {
              ...item,
              dealDetails: deal || item.dealDetails
            };
          })
        }
      });
    }, 2000);
  };

  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10);
  };

  if (orderSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="text-green-500 text-5xl mb-4">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p>Your order is being processed. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Secure Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Customer Info Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                <i className="fas fa-user mr-2 text-blue-500"></i>
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                <i className="fas fa-credit-card mr-2 text-blue-500"></i>
                Payment Method
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />
                  <div>
                    <span className="block font-medium">Credit/Debit Card</span>
                    <span className="block text-sm text-gray-500">Pay with Visa, Mastercard, etc.</span>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />
                  <div>
                    <span className="block font-medium">UPI</span>
                    <span className="block text-sm text-gray-500">Pay via Google Pay, PhonePe, etc.</span>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={formData.paymentMethod === 'netbanking'}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />
                  <div>
                    <span className="block font-medium">Net Banking</span>
                    <span className="block text-sm text-gray-500">Direct bank transfer</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Processing Payment...
                </>
              ) : (
                <>
                  <i className="fas fa-lock mr-2"></i>
                  Pay ₹{totalPrice.toLocaleString('en-IN')}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-4">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            <i className="fas fa-receipt mr-2 text-blue-500"></i>
            Order Summary
          </h2>
          
          <div className="space-y-3 mb-4">
            {cartItems.map(item => {
              const deal = allDeals.find(d => d.id === item.dealId) || item.dealDetails;
              const priceNum = parsePrice(deal.price);
              const itemTotal = priceNum * item.quantity;
              
              return (
                <div key={item.dealId} className="flex justify-between">
                  <span className="text-gray-600">
                    {deal.name} × {item.quantity}
                  </span>
                  <span>₹{itemTotal.toLocaleString('en-IN')}</span>
                </div>
              );
            })}
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;