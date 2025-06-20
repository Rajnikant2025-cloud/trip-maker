import React, { useState } from 'react';

type CardProps = {
  imageSources: string[];
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

const Card: React.FC<CardProps> = ({ imageSources, title, description, action }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    if (imageIndex < imageSources.length - 1) {
      setImageIndex((prev) => prev + 1);
      setIsLoading(true); // Retry, reset loading
    }
  };

  return (
    <div className="rounded-lg shadow-lg overflow-hidden bg-white relative">
      {/* Image Placeholder (Blur or Spinner) */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      )}

      <img
        src={imageSources[imageIndex]}
        alt={title}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-48 object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
