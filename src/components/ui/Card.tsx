interface CardProps {
  image: string;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

const Card: React.FC<CardProps> = ({ image, title, description, action }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-2">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        {description && <p className="mt-2 text-gray-600">{description}</p>}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-4 flex items-center rounded bg-primary px-4 py-2 text-white hover:bg-indigo-700"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;