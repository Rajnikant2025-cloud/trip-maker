const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-75 z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-800 animate-pulse">Loading TripMaker...</p>
      </div>
    </div>
  );
};

export default Loading;