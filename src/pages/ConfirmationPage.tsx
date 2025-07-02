    import { useLocation, useNavigate } from 'react-router-dom';

interface OrderItem {
  id: number;
  name: string;
  price: string;
}

interface LocationState {
  orderId: string;
  totalPrice: number;
  items: OrderItem[];
}

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, totalPrice, items } = location.state as LocationState || {};

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-green-500 text-6xl mb-4">
          <i className="fas fa-check-circle"></i>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6">Your order has been successfully placed.</p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
          <div className="flex justify-between border-b pb-2 mb-3">
            <span className="font-medium">Order ID:</span>
            <span className="font-mono">{orderId}</span>
          </div>
          
          <h3 className="font-medium mb-2">Your Trips:</h3>
          <ul className="space-y-2 mb-4">
            {items.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex justify-between font-bold text-lg border-t pt-3">
            <span>Total Paid:</span>
            <span>₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            <i className="fas fa-home mr-2"></i>Back to Home
          </button>
          
          <button
  onClick={() => navigate('/my-bookings', { 
    state: { 
      orderId,
      totalPrice,
      items 
    } 
  })}
  className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-medium"
>
  <i className="fas fa-calendar-alt mr-2"></i>View My Bookings
</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;