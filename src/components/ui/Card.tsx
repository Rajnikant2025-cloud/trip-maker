import React, { useState, useEffect } from 'react';

interface CardProps {
  imageSources: string[];
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imageSources, title, description }) => {
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    debugger;
    setImageLoaded(false); // Reset loaded state when image source changes
  }, [currentImageIndex]);

  const handleImageError = () => {
    debugger;
    if (currentImageIndex < imageSources.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      {/* Image container with loading state */}
      <div className="relative pt-[75%] bg-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 w-full h-full"></div>
          </div>
        )}
        <img 
          src={imageSources[currentImageIndex]}
          alt={title}
          className={`absolute top-0 left-0 w-full h-full object-cover ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onError={handleImageError}
          onLoad={() => setImageLoaded(true)}
        />
        {currentImageIndex === imageSources.length - 1 && !imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Image unavailable</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;