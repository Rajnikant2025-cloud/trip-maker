 // src/pages/DomesticDeals.tsx
import { useNavigate } from 'react-router-dom';

export default function DomesticDeals() {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">
        <i className="fas fa-home mr-2 text-green-500"></i>
        Domestic Travel Deals
      </h1>
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 flex items-center text-primary hover:text-blue-700"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back to Home
      </button>
      {/* Add your domestic deals listing component here */}
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-lg">Domestic deals content will be displayed here</p>
      </div>
    </div>
  );
}