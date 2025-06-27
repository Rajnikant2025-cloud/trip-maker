import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface CardProps {
  imageSources: string[];
  title: string;
  description: string;
  location?: string;
  tags?: string[];
  duration?: string;
  groupSize?: string;
  reviews?: number;
  price?: number;
  oldPrice?: number;
  savings?: number;
  rating?: number;
}

const Card: React.FC<CardProps> = ({
  imageSources,
  title,
  description,
  location = '',
  tags = [],
  duration = '',
  groupSize = '',
  reviews = 0,
  price = 0,
  oldPrice = 0,
  savings = 0,
  rating = 0,
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (imageIndex < imageSources.length - 1) {
      setImageIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border relative flex flex-col h-full">
      {/* Discount Badge */}
      {savings > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
          Save ${savings}
        </div>
      )}

      {/* Rating */}
      <div className="absolute top-2 right-2 bg-gray-800 text-white text-sm px-2 py-1 rounded z-10 flex items-center space-x-1">
        <Star size={14} fill="yellow" className="text-yellow-400" />
        <span>{rating.toFixed(1)}</span>
      </div>

      {/* Image Section */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {imageError ? (
          <img
            src="https://via.placeholder.com/800x600?text=No+Image"
            alt="Unavailable"
            className="object-cover h-full w-full"
          />
        ) : (
          <img
            src={imageSources[imageIndex]}
            alt={title}
            className="object-cover h-full w-full"
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-1 p-4">
        {/* Top Content */}
        <div>
          <p className="text-sm text-gray-500 mb-1">{location}</p>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Info Row */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>{duration}</span>
            <span>{groupSize}</span>
            <span>({reviews} reviews)</span>
          </div>

          {/* Price Row */}
          <div className="mb-2">
            <span className="text-lg font-bold text-green-600 mr-2">
              ${price}
            </span>
            {oldPrice > 0 && (
              <span className="line-through text-sm text-gray-400">
                ${oldPrice}
              </span>
            )}
            <span className="block text-sm text-gray-500">per person</span>
          </div>
        </div>

        {/* Book Button (at bottom) */}
        <button className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 mt-4">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Card;
