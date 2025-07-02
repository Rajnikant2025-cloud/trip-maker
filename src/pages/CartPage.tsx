import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Deal {
  id: number;
  name: string;
  price: string;
  imageUrls: string[];
}

type CartItem = {
  dealId: number;
  quantity: number;
};

interface LocationState {
  cartItems: CartItem[];
  allDeals: Deal[];
}

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [], allDeals = [] }: LocationState = location.state || {};

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedDeals, setSelectedDeals] = useState<Deal[]>([]);

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const ids = cart.map(item => item.dealId);
    const items = allDeals.filter(deal => ids.includes(deal.id));
    setSelectedDeals(items);
  }, [cart, allDeals]);

  const handleRemove = (dealId: number) => {
    setCart(prev => prev.filter(item => item.dealId !== dealId));
  };

  const updateQuantity = (dealId: number, newQty: number) => {
    if (newQty < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.dealId === dealId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const getQuantity = (dealId: number) => {
    return cart.find(item => item.dealId === dealId)?.quantity || 1;
  };

  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10);
  };

  const totalPrice = cart.reduce((total, cartItem) => {
    const deal = selectedDeals.find(d => d.id === cartItem.dealId);
    if (!deal) return total;

    const priceNumber = parsePrice(deal.price);
    return total + priceNumber * cartItem.quantity;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>
      {selectedDeals.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-5xl mb-4">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
          <button
            onClick={() => navigate('/alldeals')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Browse Deals
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-4 mb-8">
            {selectedDeals.map((deal) => (
              <li key={deal.id} className="flex items-center gap-4 border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={deal.imageUrls[0]}
                  alt={deal.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{deal.name}</h2>
                  <p className="text-blue-600 font-bold">{deal.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-sm font-medium">Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={getQuantity(deal.id)}
                      onChange={(e) => updateQuantity(deal.id, parseInt(e.target.value))}
                      className="w-16 border rounded px-2 py-1 text-center"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(deal.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  aria-label="Remove item"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              <span className="text-sm text-gray-500">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={() => navigate('/alldeals', {  
                state: { cartItems: cart, allDeals }
              })}
              className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg transition-colors"
            >
              ← Continue Shopping
            </button>
            <button
              onClick={() => navigate('/checkout', {
                state: {
                  cartItems: cart,
                  allDeals,
                  totalPrice
                }
              })}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
              disabled={selectedDeals.length === 0}
            >
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;