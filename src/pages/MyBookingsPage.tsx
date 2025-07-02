import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface Booking {
  id: string;
  orderId: string;
  items: OrderItem[];
  totalPrice: number;
  date: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

interface LocationState {
  orderId?: string;
  items?: OrderItem[];
  totalPrice?: number;
}

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  // Load and process bookings
  useEffect(() => {
    const processBookings = () => {
      try {
        const savedBookings = localStorage.getItem('tripBookings');
        const parsedBookings: Booking[] = savedBookings ? JSON.parse(savedBookings) : [];
        
        const state = location.state as LocationState | undefined;
        
        if (state?.orderId && state.items && state.totalPrice !== undefined) {
          const newBooking: Booking = {
            id: Date.now().toString(),
            orderId: state.orderId,
            items: state.items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity || 1
            })),
            totalPrice: state.totalPrice,
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            status: 'confirmed'
          };

          const updatedBookings = [...parsedBookings, newBooking];
          localStorage.setItem('tripBookings', JSON.stringify(updatedBookings));
          setBookings(updatedBookings);
        } else {
          setBookings(parsedBookings);
        }
      } catch (error) {
        console.error('Error processing bookings:', error);
        localStorage.removeItem('tripBookings');
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    processBookings();
  }, [location.state]);

  const cancelBooking = (id: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'cancelled' } : booking
    );
    localStorage.setItem('tripBookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  // New function to handle booking deletion
  const confirmDeleteBooking = (id: string) => {
    setBookingToDelete(id);
    setShowDeleteModal(true);
  };

  const deleteBooking = () => {
    if (!bookingToDelete) return;
    
    const updatedBookings = bookings.filter(booking => booking.id !== bookingToDelete);
    localStorage.setItem('tripBookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    setShowDeleteModal(false);
    setBookingToDelete(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to permanently delete this booking?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={deleteBooking}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-gray-400 text-5xl mb-4">
            <i className="fas fa-calendar-times"></i>
          </div>
          <p className="text-gray-500 mb-4">You don't have any bookings yet.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            <i className="fas fa-search mr-2"></i>Browse Available Trips
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div 
              key={booking.id}
              className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${
                booking.status === 'confirmed' ? 'border-blue-500' : 
                booking.status === 'cancelled' ? 'border-red-500' : 'border-green-500'
              } transition-all hover:shadow-lg`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                <div>
                  <h2 className="text-lg font-semibold">Order #{booking.orderId}</h2>
                  <p className="text-sm text-gray-500">
                    <i className="far fa-calendar-alt mr-1"></i>
                    Booked on {booking.date}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : 
                  booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="space-y-3 mb-4">
                {booking.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 ml-6">
                        Qty: {item.quantity} | {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Paid</p>
                    <p className="text-xl font-bold">
                      <i className="fas fa-rupee-sign mr-1"></i>
                      {booking.totalPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => confirmDeleteBooking(booking.id)}
                      className="px-3 py-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors"
                    >
                      <i className="fas fa-trash-alt mr-1"></i>
                      Delete
                    </button>
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="px-3 py-1 text-sm bg-yellow-50 text-yellow-600 hover:bg-yellow-100 rounded transition-colors"
                      >
                        <i className="fas fa-times-circle mr-1"></i>
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/bookings/${booking.id}`, { state: booking })}
                      className="px-3 py-1 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                    >
                      <i className="fas fa-info-circle mr-1"></i>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded transition-colors"
      >
        <i className="fas fa-arrow-left mr-2"></i> Go Back
      </button>
    </div>
  );
};

export default MyBookingsPage;