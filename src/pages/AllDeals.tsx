    // src/pages/AllDeals.tsx
import { useNavigate } from 'react-router-dom';

export default function AllDeals() {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">
        <i className="fas fa-list mr-2 text-blue-500"></i>
        All Travel Deals
      </h1>
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center text-primary hover:text-blue-700"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back to Home
      </button>
      {/* Add your deals listing component here */}
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-lg">All deals content will be displayed here</p>
      </div>
    </div>
  );
}