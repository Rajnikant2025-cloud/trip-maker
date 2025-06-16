import { NavLink } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-primary text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold animate-pulse">TripMaker</h1>
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center ${isActive ? 'text-white' : 'text-indigo-100'} hover:text-white`
            }
          >
            <i className="fas fa-home mr-2"></i> Home
          </NavLink>
          <NavLink
            to="/destinations"
            className={({ isActive }) =>
              `flex items-center ${isActive ? 'text-white' : 'text-indigo-100'} hover:text-white`
            }
          >
            <i className="fas fa-map mr-2"></i> Destinations
          </NavLink>
          <NavLink
            to="/packages"
            className={({ isActive }) =>
              `flex items-center ${isActive ? 'text-white' : 'text-indigo-100'} hover:text-white`
            }
          >
            <i className="fas fa-suitcase mr-2"></i> Packages
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center ${isActive ? 'text-white' : 'text-indigo-100'} hover:text-white`
            }
          >
            <i className="fas fa-info-circle mr-2"></i> About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex items-center ${isActive ? 'text-white' : 'text-indigo-100'} hover:text-white`
            }
          >
            <i className="fas fa-envelope mr-2"></i> Contact
          </NavLink>
          <button onClick={toggleSidebar} className="text-indigo-100 hover:text-white">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;