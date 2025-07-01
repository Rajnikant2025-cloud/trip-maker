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

  // Helper to parse price string like '₹24,999' to number 24999
  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10);
  };

  // Calculate total price of all items in cart
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
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {selectedDeals.map((deal) => (
              <li key={deal.id} className="flex items-center gap-4 border p-4 rounded-lg shadow-sm">
                <img
                  src={deal.imageUrls[0]}
                  alt={deal.name}
                  className="w-24 h-16 object-cover rounded"
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
                      className="w-16 border rounded px-2 py-1"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(deal.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right text-xl font-semibold">
            Total: ₹{totalPrice.toLocaleString('en-IN')}
          </div>
        </>
      )}

      <button
  className="mt-6 text-blue-600 hover:underline"
  onClick={() => navigate('/alldeals', {  
    state: {
      cartItems: cart,
      allDeals
    }
  })}
>
  ← Back to Deals
</button>
    </div>
  );
};

export default CartPage;
