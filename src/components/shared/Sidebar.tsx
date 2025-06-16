import { useAuth } from '../../hooks/useAuth';
import LoginForm from '../../features/auth/LoginForm';
import SocialLogin from '../../features/auth/SocialLogin';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-indigo-800 text-white p-6 transition-transform duration-300 ease-in-out z-50 ${isOpen ? '' : 'translate-x-full'}`}
    >
      <button onClick={toggleSidebar} className="mb-6 text-white">
        <i className="fas fa-times text-2xl"></i>
      </button>
      {isLoggedIn ? (
        <div className="animate-slideIn">
          <h3 className="text-xl font-bold">Welcome, {user?.name || 'Guest'}</h3>
          <p className="text-indigo-200">Mobile: {user?.mobile || 'N/A'}</p>
          {user?.email && <p className="text-indigo-200">Email: {user.email}</p>}
          <button
            onClick={logout}
            className="mt-4 flex items-center rounded bg-indigo-500 px-4 py-2 hover:bg-indigo-600"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Logout
          </button>
        </div>
      ) : (
        <div className="animate-slideIn">
          <h3 className="text-xl font-bold">Login / Sign Up</h3>
          <LoginForm />
          <SocialLogin />
        </div>
      )}
    </div>
  );
};

export default Sidebar;